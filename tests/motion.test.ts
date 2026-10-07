import {test} from 'node:test';
import assert from 'node:assert/strict';
import {reveal,progress,lerp,spring} from '../src/motion/interpolate';
import {cameraAt} from '../src/canvas/Camera';
test('seek order cannot affect motion or camera state',()=>{const frame=(t:number)=>({reveal:reveal(t,137,.8),spring:spring(t,137),camera:cameraAt(t,136,140,{x:0,y:0,scale:1},{x:30,y:20,scale:1.06})});const expected=frame(137.4);for(const t of [400,0,137.4,98,2,137.4])frame(t);assert.deepEqual(frame(137.4),expected)});
test('reveal clamps before and after event and reduced motion is immediate',()=>{assert.equal(reveal(-1,0),0);assert.equal(reveal(100,0),1);assert.equal(reveal(1,1,.7,true),1);assert.equal(progress(3,2,0),1);assert.equal(lerp(10,20,2),20)});
