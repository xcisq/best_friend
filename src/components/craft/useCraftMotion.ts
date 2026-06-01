import { useContext } from 'react';
import { CraftMotionContext } from './motionContext';

export function useCraftMotion() {
  return useContext(CraftMotionContext);
}

