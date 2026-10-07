import {colors} from '../design-system/tokens';
import {clamp} from '../motion/interpolate';
export const futureValue=(annual:number,rate:number,years:number)=>rate===0?annual*years:annual*((Math.pow(1+rate,years)-1)/rate);
export function CompoundGrowthChart({progress=1,years=40,annual=9000,rate=.07,showPrincipal=true}:{progress?:number;years?:number;annual?:number;rate?:number;showPrincipal?:boolean}){
 const p=clamp(progress),max=futureValue(annual,rate,years)*1.12;
 const x=(year:number)=>110+year/years*1060;
 const y=(value:number)=>440-value/max*360;
 const label=(value:number)=>value===0?'$0':max<1000000?'$'+Math.round(value/1000)+'k':'$'+(value/1000000).toFixed(1)+'m';
 const n=years*p;
 const points=Array.from({length:Math.floor(n*8)+1},(_,i)=>{const year=i/8;return [x(year),y(futureValue(annual,rate,year))]});
 points.push([x(n),y(futureValue(annual,rate,n))]);
 const path=points.map(([a,b],i)=>(i?'L':'M')+a+' '+b).join(' ');
 return <svg viewBox="0 0 1280 590" className="growth-chart" role="img" aria-label={'Illustrative growth of annual contributions over '+years+' years'}>
 <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor={colors.accent} stopOpacity=".16"/><stop offset="1" stopColor={colors.accent} stopOpacity="0"/></linearGradient></defs>
 {[0,.25,.5,.75,1].map(v=><g key={v}><path d={'M110 '+y(v*max)+' H1170'} stroke={colors.border}/><text x="90" y={y(v*max)+7} textAnchor="end" fontSize="19" fill={colors.secondary}>{label(v*max)}</text></g>)}
 <path d={path+' L'+x(n)+' 440 L110 440 Z'} fill="url(#chartFill)"/>
 {showPrincipal&&<path d={'M110 440 L'+x(n)+' '+y(annual*n)} fill="none" stroke={colors.principal} strokeWidth="5" strokeDasharray="9 9"/>}
 <path d={path} fill="none" stroke={colors.accent} strokeWidth="7" strokeLinecap="round"/>
 <circle cx={x(n)} cy={y(futureValue(annual,rate,n))} r="9" fill={colors.accent} stroke="white" strokeWidth="4"/>
 {[0,.25,.5,.75,1].map(v=><text key={v} x={x(v*years)} y="475" textAnchor="middle" fontSize="22" fill={colors.secondary}>{Math.round(v*years)} years</text>)}
 <g transform="translate(340 30)"><circle r="5" fill={colors.accent}/><text x="16" y="7" fontSize="22" fill={colors.text}>Projected balance</text><path d="M295 0 h32" stroke={colors.principal} strokeWidth="5" strokeDasharray="6 5"/><text x="340" y="7" fontSize="22" fill={colors.text}>Contributions</text></g>
 </svg>
}
