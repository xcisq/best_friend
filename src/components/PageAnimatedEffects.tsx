import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useCraftMotion } from './craft/useCraftMotion';

const LORDICON_ITEMS = [
  { name: 'badge', label: '初识', color: '#a15f47' },
  { name: 'halo', label: 'god', color: '#8aaf9e' },
  { name: 'bean', label: '豆姐', color: '#76513e' },
  { name: 'paw', label: '团团', color: '#c89a4c' },
  { name: 'mountain', label: '百里画廊', color: '#d98565' },
  { name: 'mic', label: 'KTV', color: '#9b7ab4' },
  { name: 'tv', label: '怪奇物语', color: '#8aaf9e' },
  { name: 'tent', label: '露营', color: '#76513e' },
  { name: 'dumbbell', label: '健身', color: '#d98565' },
  { name: 'situp', label: '卷腹！', color: '#c89a4c' },
] as const;

const POSTMARK_ITEMS = [
  { title: 'FIRST MEET', note: '初识', tone: 'warm' },
  { title: 'NEW DESK', note: '换工位', tone: 'mint' },
  { title: 'SING COCO', note: '和姑姑合唱', tone: 'pink' },
  { title: 'TEAM DAY', note: '团建', tone: 'gold' },
  { title: 'FOOD MEMO', note: '九色云 / 肥姨妈', tone: 'gold' },
  { title: 'KEEP IN TOUCH', note: '常联系', tone: 'warm' },
] as const;

const PAPER_PLANES = [
  { label: 'to letters', trail: 'plane-trail-one' },
  { label: 'to next page', trail: 'plane-trail-two' },
  { label: 'to memory', trail: 'plane-trail-three' },
] as const;

const CLICK_STAR_COLORS = ['#d98565', '#c89a4c', '#8aaf9e', '#d9859e', '#9b7ab4'] as const;
const CLICK_STARS_PER_BURST = 11;
const MAX_STAR_BURSTS = 4;
const PLANE_COOLDOWN_MS = 1100;
const PLANE_SCROLL_DISTANCE = 86;

interface FlyingPlane {
  id: number;
  direction: 'left' | 'right';
  top: number;
}

interface ClickStar {
  id: number;
  color: string;
  delay: number;
  distance: number;
  rotation: number;
  size: number;
  x: number;
  y: number;
}

interface StarBurst {
  id: number;
  stars: ClickStar[];
}

function LordiconGlyph({ name, color }: { name: string; color: string }) {
  if (name === 'halo') {
    return <path d="M18 26c0-8 6-13 14-13s14 5 14 13c0 7-5 12-14 12s-14-5-14-12Zm4-15c3-4 7-6 10-6s7 2 10 6M32 38v14M22 50h20" />;
  }
  if (name === 'bean') {
    return <path d="M24 12c-9 3-14 12-12 21 2 10 11 17 21 15 10-2 17-11 15-21-2-9-11-17-24-15Zm9 9c-2 2-4 5-3 9" />;
  }
  if (name === 'paw') {
    return <path d="M20 36c4-2 8-2 12 0 4 2 4 8 0 10-4 3-8 3-12 0-4-2-4-8 0-10Zm-2-14c0 3-2 6-5 6s-5-3-5-6 2-6 5-6 5 3 5 6Zm14-4c0 3-2 6-5 6s-5-3-5-6 2-6 5-6 5 3 5 6Zm11 4c0 3-2 6-5 6s-5-3-5-6 2-6 5-6 5 3 5 6Zm10 6c0 3-2 6-5 6s-5-3-5-6 2-6 5-6 5 3 5 6Z" />;
  }
  if (name === 'chat') {
    return <path d="M11 20h18v12H18l-7 6v-6H6V20h5Zm20-8h21v14h-7v6l-7-6h-7V12Z" />;
  }
  if (name === 'note') {
    return <path d="M16 10h30l6 7v37H16V10Zm8 13h20M24 31h20M24 39h14" />;
  }
  if (name === 'folder') {
    return <path d="M7 22h19l5 7h26L49 52H8L7 22Z" />;
  }
  if (name === 'trash') {
    return <path d="M21 20h22l-2 31H23L21 20Zm-3-6h28M27 14l3-5h6l3 5M29 26v18M35 26v18" />;
  }
  if (name === 'pencil') {
    return <path d="M18 45 15 54l9-3 26-26-6-6L18 45Zm23-29 4-4 6 6-4 4" />;
  }
  if (name === 'mountain') {
    return <path d="M8 46 22 24l10 14 8-10 16 18M12 46h40M18 20c4-4 7-6 11-6 5 0 8 2 12 6" />;
  }
  if (name === 'mic') {
    return <path d="M28 14c0-4 3-7 7-7s7 3 7 7v11c0 4-3 7-7 7s-7-3-7-7V14Zm7 18v12M24 53h22M44 21l7 7M19 25c0 9 7 16 16 16s16-7 16-16" />;
  }
  if (name === 'coffee') {
    return <path d="M18 22h26l-3 26H21L18 22Zm26 6h6c4 0 5 4 3 7-2 3-5 4-10 4M20 16h23M27 10c-3 3-3 5 0 8M36 10c-3 3-3 5 0 8" />;
  }
  if (name === 'calendar') {
    return <path d="M15 16h34v34H15V16Zm0 10h34M23 10v10M41 10v10M23 34h6M35 34h6M23 42h6M35 42h6" />;
  }
  if (name === 'tv') {
    return <path d="M14 19h36v24H14V19Zm8 30h20M27 13l5 6 5-6M20 25l8 6-8 6M44 25l-8 6 8 6" />;
  }
  if (name === 'desk') {
    return <path d="M12 22h40v21H12V22Zm6 21v9M46 43v9M20 16h24M24 29h16M24 36h10" />;
  }
  if (name === 'tent') {
    return <path d="M10 46 25 20l15 26M18 46h28M25 20v26M39 46V29l11 17M25 32h8" />;
  }
  if (name === 'dumbbell') {
    return <path d="M10 25h6v14h-6V25Zm38 0h6v14h-6V25Zm-10 3h10v8H38v-8Zm-22 0h22v8H16v-8Zm-6-5h4v18h-4V23Zm44 0h4v18h-4V23Z" />;
  }
  if (name === 'heart') {
    return <path d="M32 51C20 41 14 35 14 26c0-6 4-10 10-10 4 0 7 2 8 5 1-3 4-5 8-5 6 0 10 4 10 10 0 9-6 15-18 25Z" />;
  }
  if (name === 'situp') {
    return <path d="M14 49h14M28 49l7-12 10-2M19 40c4-2 7-7 8-12l6 2c-1 6-4 11-10 15M18 23a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm17 8 7 5M40 22c5 3 8 8 9 14" />;
  }
  if (name === 'camera') {
    return <path d="M14 23h36v26H14V23Zm10 0 4-7h10l4 7M32 31a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM20 30h5" />;
  }
  return <path d="M21 14h22v34H21V14Zm7 0 2-6h6l2 6M27 29h11M27 37h8" stroke={color} />;
}

export function LordiconMotionStrip() {
  return (
    <div className="lordicon-motion-strip" aria-label="实习纪念动图标组件">
      <p>239 天里反复出现的小暗号</p>
      <div>
        {LORDICON_ITEMS.map((item, index) => (
          <span key={item.name} className={`lordicon-motion lordicon-motion-${index + 1}`} title={item.label}>
            <svg viewBox="0 0 64 64" role="img" aria-label={item.label}>
              <g fill="none" stroke={item.color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <LordiconGlyph name={item.name} color={item.color} />
              </g>
            </svg>
            <em>{item.label}</em>
          </span>
        ))}
      </div>
    </div>
  );
}

export function ThoughtBubbleCluster() {
  return (
    <div className="thought-bubble-cluster" aria-hidden="true">
      <span className="thought-bubble thought-bubble-small" />
      <span className="thought-bubble thought-bubble-mid" />
      <div className="thought-bubble thought-bubble-main">
        <span>原来，我们一起经历了这么多</span>
      </div>
      <b className="bubble-badge bubble-badge-green">唱歌</b>
      <b className="bubble-badge bubble-badge-pink">健身</b>
      <b className="bubble-badge bubble-badge-orange">露营</b>
      <b className="bubble-badge bubble-badge-blue">美食</b>
    </div>
  );
}

export function StarScatterLayer() {
  return (
    <div className="star-scatter-layer" aria-hidden="true">
      {Array.from({ length: 34 }, (_, index) => (
        <span key={index} className={`star-scatter star-scatter-${index % 7}`} />
      ))}
    </div>
  );
}

export function PaperPlaneTrailLayer() {
  return (
    <div className="paper-plane-trail-layer" aria-hidden="true">
      {PAPER_PLANES.map((item, index) => (
        <span key={item.label} className={`paper-plane-path ${item.trail}`}>
          <i className={`paper-plane paper-plane-${index + 1}`}>
            <svg viewBox="0 0 64 64">
              <path d="M7 30 55 10 42 54 31 38 18 47l6-14L7 30Z" />
              <path d="M24 33 55 10 31 38" />
            </svg>
          </i>
          <b />
        </span>
      ))}
    </div>
  );
}

function PaperPlaneGlyph() {
  return (
    <svg viewBox="0 0 64 64">
      <path d="M7 30 55 10 42 54 31 38 18 47l6-14L7 30Z" />
      <path d="M24 33 55 10 31 38" />
    </svg>
  );
}

export function ForegroundSurpriseLayer() {
  const { reducedMotion } = useCraftMotion();
  const [planes, setPlanes] = useState<FlyingPlane[]>([]);
  const [starBursts, setStarBursts] = useState<StarBurst[]>([]);
  const nextIdRef = useRef(0);
  const lastPlaneAtRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const pendingScrollDistanceRef = useRef(0);
  const planeTimeoutsRef = useRef<number[]>([]);
  const starTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!reducedMotion) return;
    setPlanes([]);
    setStarBursts([]);
  }, [reducedMotion]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const removePlane = (id: number) => {
      const timeout = window.setTimeout(() => {
        planeTimeoutsRef.current = planeTimeoutsRef.current.filter((current) => current !== timeout);
        setPlanes((current) => current.filter((plane) => plane.id !== id));
      }, 1650);
      planeTimeoutsRef.current.push(timeout);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (scrollDelta <= 0) {
        pendingScrollDistanceRef.current = 0;
        return;
      }

      pendingScrollDistanceRef.current += scrollDelta;
      if (
        reducedMotion
        || currentScrollY < 120
        || pendingScrollDistanceRef.current < PLANE_SCROLL_DISTANCE
      ) {
        return;
      }

      const now = Date.now();
      if (now - lastPlaneAtRef.current < PLANE_COOLDOWN_MS) return;
      lastPlaneAtRef.current = now;
      pendingScrollDistanceRef.current = 0;

      const id = nextIdRef.current++;
      setPlanes((current) => [
        ...current.slice(-1),
        {
          id,
          direction: id % 2 === 0 ? 'right' : 'left',
          top: 18 + ((id * 19) % 48),
        },
      ]);
      removePlane(id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      planeTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      planeTimeoutsRef.current = [];
    };
  }, [reducedMotion]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        reducedMotion
        || event.button !== 0
        || (event.target instanceof Element && event.target.closest('button, a, input, textarea, select, video'))
      ) {
        return;
      }

      const burstId = nextIdRef.current++;
      const stars = Array.from({ length: CLICK_STARS_PER_BURST }, (_, index) => {
        const angle = (Math.PI * 2 * index) / CLICK_STARS_PER_BURST + (burstId % 3) * 0.16;
        const distance = 34 + ((burstId + index * 17) % 52);

        return {
          id: burstId * CLICK_STARS_PER_BURST + index,
          color: CLICK_STAR_COLORS[(burstId + index) % CLICK_STAR_COLORS.length],
          delay: (index % 4) * 24,
          distance,
          rotation: Math.round((angle * 180) / Math.PI),
          size: 8 + ((burstId + index * 3) % 7),
          x: event.clientX,
          y: event.clientY,
        };
      });

      setStarBursts((current) => [...current.slice(-(MAX_STAR_BURSTS - 1)), { id: burstId, stars }]);
      const timeout = window.setTimeout(() => {
        starTimeoutsRef.current = starTimeoutsRef.current.filter((current) => current !== timeout);
        setStarBursts((current) => current.filter((burst) => burst.id !== burstId));
      }, 920);
      starTimeoutsRef.current.push(timeout);
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      starTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      starTimeoutsRef.current = [];
    };
  }, [reducedMotion]);

  return (
    <div className="foreground-surprise-layer" aria-hidden="true">
      {planes.map((plane) => (
        <span
          key={plane.id}
          className={`foreground-paper-plane foreground-paper-plane-${plane.direction}`}
          style={{ '--plane-top': `${plane.top}vh` } as CSSProperties}
        >
          <i><PaperPlaneGlyph /></i>
          <b />
        </span>
      ))}
      {starBursts.flatMap((burst) => burst.stars).map((star) => (
        <i
          key={star.id}
          className="click-scatter-star"
          style={{
            '--star-color': star.color,
            '--star-delay': `${star.delay}ms`,
            '--star-distance': `${star.distance}px`,
            '--star-rotation': `${star.rotation}deg`,
            '--star-size': `${star.size}px`,
            '--star-x': `${star.x}px`,
            '--star-y': `${star.y}px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function TinyWishStarsLayer() {
  return (
    <div className="tiny-wish-stars-layer" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <span key={index} className={`tiny-wish-star tiny-wish-star-${index % 6}`} />
      ))}
    </div>
  );
}

export function WarmGlowLayer() {
  return (
    <div className="warm-glow-layer" aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => (
        <span key={index} className={`warm-glow-orb warm-glow-orb-${index + 1}`} />
      ))}
    </div>
  );
}

export function MemoryMotionLayer() {
  return (
    <div className="memory-motion-layer" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span key={`scrap-${index}`} className={`motion-scrap motion-scrap-${index % 6}`} />
      ))}
      {Array.from({ length: 8 }, (_, index) => (
        <i key={`trail-${index}`} className={`motion-trail motion-trail-${index % 4}`} />
      ))}
    </div>
  );
}

export function PostmarkDriftLayer() {
  return (
    <div className="postmark-drift-layer" aria-hidden="true">
      {POSTMARK_ITEMS.map((item, index) => (
        <span
          key={item.title}
          className={`postmark-stamp postmark-stamp-${index + 1} postmark-stamp-${item.tone}`}
        >
          <i className="postmark-ring" />
          <b>{item.title}</b>
          <small>{item.note}</small>
        </span>
      ))}
    </div>
  );
}
