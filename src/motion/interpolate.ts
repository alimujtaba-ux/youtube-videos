export const clamp=(v:number,min=0,max=1)=>Math.min(max,Math.max(min,v));
export const lerp=(a:number,b:number,p:number)=>a+(b-a)*clamp(p);
export const progress=(t:number,start:number,duration=.7)=>clamp((t-start)/Math.max(duration,.001));
export const easeOut=(p:number)=>1-Math.pow(1-clamp(p),3);
export const easeInOut=(p:number)=>{const x=clamp(p);return x*x*(3-2*x)};
export const reveal=(t:number,start:number,duration=.65,reduced=false)=>reduced?Number(t>=start):easeOut(progress(t,start,duration));
// Analytic, critically damped spring: no integrator and no accumulated frame state.
export const spring=(t:number,start:number)=>{const x=Math.max(0,t-start)*9;return 1-(1+x)*Math.exp(-x)};
export const drawStyle=(p:number)=>({strokeDasharray:1,strokeDashoffset:1-clamp(p)});
