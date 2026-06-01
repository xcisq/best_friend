import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { useCraftMotion } from '../useCraftMotion';
import { usePageVisible } from '../usePageVisible';
import { CAREER_GROUND_RATIO } from './careerJourneyConfig';
import { createCareerWorld } from './createCareerWorld';
import { renderCareerWorld } from './renderCareerWorld';
import { plantFlower, updateCareerWorld } from './updateCareerWorld';
import { StaticCareerJourney } from './StaticCareerJourney';

export function CareerJourneyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef(createCareerWorld());
  const { reducedMotion } = useCraftMotion();
  const pageVisible = usePageVisible();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion || !visible || !pageVisible) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let animation = 0;
    let previousTime = performance.now();

    const frame = (time: number) => {
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const delta = Math.min(0.05, (time - previousTime) / 1000);
      previousTime = time;
      updateCareerWorld(worldRef.current, delta, width, height * CAREER_GROUND_RATIO);
      renderCareerWorld(context, worldRef.current, width, height);
      animation = requestAnimationFrame(frame);
    };

    animation = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animation);
  }, [pageVisible, reducedMotion, visible]);

  const plant = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    plantFlower(worldRef.current, worldRef.current.offset + event.clientX - rect.left);
  };

  return (
    <div ref={rootRef} className="career-journey" aria-label="2025.10.10 到 2026.06.05 的实习纪念时间轴">
      <canvas ref={canvasRef} onPointerDown={plant} aria-label="点击实习纪念时间轴种下一朵花" />
      <StaticCareerJourney />
      <p>从 2025.10.10 到 2026.06.05，点一下沿途空地，留下一朵会跟着 239 天前进的小花。</p>
    </div>
  );
}
