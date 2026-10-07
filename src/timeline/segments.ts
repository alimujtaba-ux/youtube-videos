import chapterData from './chapters.json';
import beatData from './beats.json';
import transcript from './transcript.json';
export const chapters=chapterData;
export const beats=beatData;
export const duration=transcript.duration;
export const narration=transcript.segments.map(s=>({...s,text:s.text.replace(/Calc Matrix|CALC matrix/g,'CalcMatrix').replace(/calchmatrix.net/g,'calcmatrix.net')}));
