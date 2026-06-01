import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useCraftMotion } from './useCraftMotion';
import { usePageVisible } from './usePageVisible';

export function GridFrameAnimation({
  src,
  alt,
  cols = 1,
  rows = 1,
  row = 0,
  width = 72,
  height = 72,
  fps = 8,
  className = '',
  style,
}: {
  src: string;
  alt: string;
  cols?: number;
  rows?: number;
  row?: number;
  width?: number;
  height?: number;
  fps?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { reducedMotion } = useCraftMotion();
  const pageVisible = usePageVisible();
  const rootRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const [frame, setFrame] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || cols <= 1 || !visible || !pageVisible) return;
    let animation = 0;
    let previous = 0;
    const draw = (time: number) => {
      if (time - previous >= 1000 / fps) {
        frameRef.current = (frameRef.current + 1) % cols;
        setFrame(frameRef.current);
        previous = time;
      }
      animation = requestAnimationFrame(draw);
    };
    animation = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animation);
  }, [cols, fps, pageVisible, reducedMotion, visible]);

  return (
    <span ref={rootRef} className={className} style={{ position: 'relative', display: 'inline-block', width, height, overflow: 'hidden', ...style }}>
      <img
        src={src}
        alt={alt}
        width={width * cols}
        height={height * rows}
        draggable="false"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width * cols,
          height: height * rows,
          maxWidth: 'none',
          transform: `translate(${-frame * width}px, ${-row * height}px)`,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </span>
  );
}
