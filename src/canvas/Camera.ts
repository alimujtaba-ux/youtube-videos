import {lerp,easeInOut,progress} from '../motion/interpolate';
export function cameraAt(t:number,start:number,end:number,from={x:0,y:0,scale:1},to={x:0,y:0,scale:1}){const p=easeInOut(progress(t,start,end-start));return {x:lerp(from.x,to.x,p),y:lerp(from.y,to.y,p),scale:lerp(from.scale,to.scale,p)}}
