import type {CSSProperties} from 'react';
import {reveal} from '../motion/interpolate';
export function KineticText({text,time,at=0,className='',style={},reduced=false}:{text:string;time:number;at?:number;className?:string;style?:CSSProperties;reduced?:boolean}){return <span className={'kinetic-text '+className} style={style}>{text.split(' ').map((word,i)=>{const p=reveal(time,at+i*.065,.55,reduced);return <span key={i} style={{display:'inline-block',opacity:p,transform:'translateY('+((1-p)*24)+'px)'}}>{word}{' '}</span>})}</span>}
