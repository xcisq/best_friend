import { createContext } from 'react';

export interface CraftMotionContextValue {
  reducedMotion: boolean;
  intensity: number;
}

export const CraftMotionContext = createContext<CraftMotionContextValue>({
  reducedMotion: false,
  intensity: 1,
});

