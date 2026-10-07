import {reveal} from '../motion/interpolate';
export function AnimatedFormula({terms,time,at=0}:{terms:string[];time:number;at?:number}){return <div className="formula">{terms.map((term,i)=><span key={i} className={i%2?'operator':''} style={{opacity:reveal(time,at+i*.35),transform:'translateY('+((1-reveal(time,at+i*.35))*15)+'px)'}}>{term}</span>)}</div>}
