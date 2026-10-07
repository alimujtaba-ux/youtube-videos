import type {ReactNode} from 'react';
import type {SceneProps} from '../timeline/timeline.types';
import {KineticText} from '../components/KineticText';
export function SceneFrame({title,kicker,children,time,at=0,footnote='',reduced=false}:{title:string;kicker:string;children:ReactNode;time:number;at?:number;footnote?:string;reduced?:boolean}){return <><div className="scene-heading"><div className="eyebrow">{kicker}</div><h1 style={{letterSpacing:'-.02em'}}><KineticText text={title} time={time} at={at} reduced={reduced}/></h1></div>{children}{footnote&&<div className="scene-footnote">{footnote}</div>}</>}
export type Props=SceneProps;
