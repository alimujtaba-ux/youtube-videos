import {useSyncExternalStore} from 'react';
import {AudioEngine} from './AudioEngine';
export const useAudioClock=(engine:AudioEngine)=>useSyncExternalStore(engine.subscribe,engine.getSnapshot);
