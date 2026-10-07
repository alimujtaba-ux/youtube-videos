export type AudioState={time:number;duration:number;playing:boolean;ready:boolean;ended:boolean;error:string};
export class AudioEngine {
 readonly audio:HTMLAudioElement;
 private frame=0;
 private listeners=new Set<()=>void>();
 private state:AudioState={time:0,duration:0,playing:false,ready:false,ended:false,error:''};
 constructor(source:string){
  this.audio=new Audio(source);this.audio.preload='auto';
  for(const name of ['loadedmetadata','durationchange','canplay','play','pause','seeked','timeupdate','ended','error'])this.audio.addEventListener(name,this.sync);
 }
 private sync=()=>{
  const a=this.audio;
  this.state={time:a.currentTime,duration:Number.isFinite(a.duration)?a.duration:0,playing:!a.paused&&!a.ended,ready:a.readyState>=1,ended:a.ended,error:a.error?'The supplied voiceover could not be loaded. Check public/audio/voiceover.mp3.':''};
  this.listeners.forEach(fn=>fn());
  if(!a.paused&&!a.ended&&!this.frame)this.frame=requestAnimationFrame(this.tick);
 };
 private tick=()=>{this.frame=0;this.sync()};
 subscribe=(fn:()=>void)=>{this.listeners.add(fn);return()=>{this.listeners.delete(fn)}};
 getSnapshot=()=>this.state;
 async play(){try{if(this.audio.ended)this.seek(0);await this.audio.play()}catch(e){this.state={...this.state,error:e instanceof Error?e.message:'Playback failed'};this.listeners.forEach(fn=>fn())}}
 pause(){this.audio.pause();cancelAnimationFrame(this.frame);this.frame=0;this.sync()}
 seek(time:number){if(!this.state.ready)return;this.audio.currentTime=Math.max(0,Math.min(this.state.duration,time));this.sync()}
 restart(){this.seek(0)}
 dispose(){this.pause();for(const name of ['loadedmetadata','durationchange','canplay','play','pause','seeked','timeupdate','ended','error'])this.audio.removeEventListener(name,this.sync);this.audio.src='';this.listeners.clear()}
}
