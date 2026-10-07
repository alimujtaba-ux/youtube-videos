import {chapters,beats,narration,duration} from './segments';
export const chapterAt=(t:number)=>chapters.find(c=>t>=c.start&&t<c.end)??(t<0?chapters[0]:chapters[chapters.length-1]);
export const beatAt=(t:number)=>beats.find(b=>t>=b.start&&t<b.end)??(t<0?beats[0]:beats[beats.length-1]);
export const narrationAt=(t:number)=>narration.find(s=>t>=s.start&&t<s.end);
export function frameAt(time:number){const t=Math.max(0,Math.min(duration,time));return {time:t,chapter:chapterAt(t),beat:beatAt(t),narration:narrationAt(t)}}
