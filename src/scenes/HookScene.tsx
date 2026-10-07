import {Wallet,Building2,ArrowRight} from 'lucide-react';
import {reveal} from '../motion/interpolate';
import {KineticNumber} from '../components/KineticNumber';
import {DrawUnderline} from '../components/Drawing';
import {MoneyFlow} from '../components/MoneyFlow';
import type {Props} from './SceneFrame';
export function HookScene({time:t,reduced}:Props){const compact=reveal(t,8.9,.7,reduced);return <>
 <div className="hook-intro" style={{opacity:1-compact}}><div className="eyebrow">YOUR PAYCHECK. YOUR FUTURE.</div><h1>Imagine you earn</h1><p className="salary-unit">a year.</p><svg className="full-svg"><DrawUnderline x={0} y={430} width={900} p={reveal(t,1.2)}/></svg></div>
 <div className="hook-offer" style={{opacity:(1-compact)*reveal(t,4.26)}}><span className="eyebrow">EMPLOYER OFFER</span><strong>50<span>%</span></strong><p>match rate</p><div style={{opacity:reveal(t,6.86)}}><span className="rule-line"/><b>up to 6%</b><p>of your salary</p></div></div>
 <div className="scene-heading" style={{opacity:compact}}><div className="eyebrow">THE MATCH YOU MIGHT BE MISSING</div><h1>{t<22.76?'Are you capturing the full match?':'A gap worth understanding.'}</h1></div>
 <div className="hook-account" style={{opacity:compact}}><div className="source-value"><Wallet size={38}/><span className="eyebrow">YOU CONTRIBUTE · 3%</span><strong><KineticNumber value={2400} time={t} at={10.76} reduced={reduced}/></strong><small>per year</small></div><ArrowRight className="flow-arrow" size={48}/><div className="source-value employer" style={{opacity:reveal(t,13.18)}}><Building2 size={38}/><span className="eyebrow">EMPLOYER ADDS</span><strong><KineticNumber value={1200} time={t} at={14.04} reduced={reduced}/></strong><small>per year</small></div><div className="match-gap" style={{opacity:reveal(t,20.9)}}><span className="eyebrow">AVAILABLE EMPLOYER MATCH</span><strong>$2,400</strong><div className="gap-meter"><i/><i className="uncaptured"/></div><div className="gap-labels"><span>$1,200 captured</span><span>$1,200 uncaptured</span></div></div></div>
 <svg className="full-svg" style={{opacity:compact}}><MoneyFlow time={t} at={9.26}/><MoneyFlow time={t} at={13.52} match/></svg>
 <div className="bottom-insight" style={{opacity:reveal(t,23.9)}}><span className="eyebrow">POTENTIALLY LEFT ON THE TABLE</span><strong><KineticNumber value={1200} time={t} at={23.9} reduced={reduced}/><small> every year</small></strong></div>
 <div className="scene-footnote">Example plan: $80,000 salary · 50% match on contributions up to 6% of salary.</div></>}
