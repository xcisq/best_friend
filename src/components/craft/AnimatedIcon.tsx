import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { EnvelopeSimple, Heart, Leaf, Sparkle, Star, type Icon } from '@phosphor-icons/react';
import { useCraftMotion } from './useCraftMotion';

export type CraftIconName = 'envelope' | 'heart' | 'sparkle' | 'leaf' | 'star';
export type CraftIconTrigger = 'hover' | 'click' | 'in-view' | 'loop' | 'none';

const icons: Record<CraftIconName, Icon> = {
  envelope: EnvelopeSimple,
  heart: Heart,
  sparkle: Sparkle,
  leaf: Leaf,
  star: Star,
};

export function AnimatedIcon({
  name,
  trigger = 'hover',
  size = 20,
  className = '',
  lordiconSrc,
  style,
}: {
  name: CraftIconName;
  trigger?: CraftIconTrigger;
  size?: number;
  className?: string;
  lordiconSrc?: string;
  style?: CSSProperties;
}) {
  const { reducedMotion } = useCraftMotion();
  const IconComponent = icons[name];
  const rootRef = useRef<HTMLSpanElement>(null);
  const clickTimeoutRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);
  const toggleForClick = () => {
    if (trigger !== 'click') return;
    setActive(true);
    if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = window.setTimeout(() => setActive(false), 420);
  };

  useEffect(() => () => {
    if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || trigger !== 'in-view') return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(root);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <span
      ref={rootRef}
      className={`animated-icon animated-icon-${trigger} ${active ? 'is-active' : ''} ${className}`}
      style={{ width: size, height: size, ...style }}
      onMouseEnter={() => trigger === 'hover' && setActive(true)}
      onMouseLeave={() => trigger === 'hover' && setActive(false)}
      onClick={toggleForClick}
      aria-hidden="true"
      data-lordicon-src={lordiconSrc}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
    >
      <IconComponent size={size} weight="duotone" />
    </span>
  );
}
