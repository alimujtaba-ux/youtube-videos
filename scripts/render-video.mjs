import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from 'playwright';
import ffmpegPath from 'ffmpeg-static';

const fps=24;
const output=resolve('renders/401k-match-explainer.mp4');
const source=process.env.RENDER_URL??'http://127.0.0.1:4173/?clean=1';
if(!ffmpegPath)throw new Error('FFmpeg binary is unavailable for this platform.');
await mkdir('renders',{recursive:true});

const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 await page.emulateMedia({reducedMotion:'no-preference'});
 const pageErrors=[];
 page.on('pageerror',error=>pageErrors.push(error.message));
 await page.goto(source,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.__video?.state().duration>0,{timeout:60000});
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(image=>image.decode()))});
 const duration=await page.evaluate(()=>window.__video.state().duration);
 const frameCount=Math.ceil(duration*fps);
 const encoder=spawn(ffmpegPath,[
  '-y','-hide_banner','-loglevel','error',
  '-f','image2pipe','-vcodec','mjpeg','-framerate',String(fps),'-i','pipe:0',
  '-i',resolve('public/audio/voiceover.mp3'),
  '-map','0:v:0','-map','1:a:0',
  '-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p',
  '-c:a','aac','-b:a','192k','-t',duration.toFixed(3),'-movflags','+faststart',output,
 ],{stdio:['pipe','ignore','pipe']});
 let encoderErrors='';
 encoder.stderr.on('data',chunk=>{encoderErrors=(encoderErrors+chunk.toString()).slice(-8000)});
 const encoderExit=once(encoder,'close');
 for(let frame=0;frame<frameCount;frame++){
  const time=frame/fps;
  await page.evaluate(async currentTime=>{
   window.__video.frame(currentTime);
   await new Promise(requestAnimationFrame);
   await new Promise(requestAnimationFrame);
  },time);
  const image=await page.screenshot({type:'jpeg',quality:94});
  if(!encoder.stdin.write(image))await once(encoder.stdin,'drain');
  if(frame>0&&frame%480===0)console.log(`Rendered ${frame}/${frameCount} frames (${(time/60).toFixed(1)} min)`);
 }
 encoder.stdin.end();
 const [exitCode]=await encoderExit;
 if(exitCode!==0)throw new Error(`FFmpeg exited with code ${exitCode}: ${encoderErrors}`);
 if(pageErrors.length)throw new Error(`Browser errors during render: ${pageErrors.join('; ')}`);
 console.log(`Rendered ${frameCount} frames at ${fps} fps to ${output}`);
}finally{
 await browser.close();
}