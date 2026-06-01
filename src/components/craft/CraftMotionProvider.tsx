import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { CraftMotionContext } from './motionContext';

export function CraftMotionProvider({
  children,
  intensity = 1,
}: {
  children: ReactNode;
  intensity?: number;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [runtimeIntensity, setRuntimeIntensity] = useState(intensity);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const update = (event: Event) => {
      const nextIntensity = (event as CustomEvent<number>).detail;
      if (typeof nextIntensity === 'number') setRuntimeIntensity(nextIntensity);
    };
    window.addEventListener('craft-motion-change', update);
    return () => window.removeEventListener('craft-motion-change', update);
  }, []);

  const value = useMemo(
    () => ({ reducedMotion, intensity: reducedMotion ? 0 : Math.max(0, Math.min(1, runtimeIntensity)) }),
    [reducedMotion, runtimeIntensity],
  );

  return <CraftMotionContext.Provider value={value}>{children}</CraftMotionContext.Provider>;
}
