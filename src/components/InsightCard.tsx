import type {ReactNode} from 'react';
export function InsightCard({label,children,className=''}:{label:string;children:ReactNode;className?:string}){return <div className={'insight '+className}><span className="eyebrow">{label}</span>{children}</div>}
