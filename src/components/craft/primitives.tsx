import { useEffect, useId, useMemo, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { createNoise2D } from 'simplex-noise';
import { useCraftMotion } from './useCraftMotion';
import { createEdgeErosionPaths, createHandDrawnPath, createHandDrawnStrokePath, createScatterLayout, createSeededNoise, type Point } from './utils';

type IdleMotion = 'none' | 'float' | 'swing' | 'spin' | 'twinkle';
type CraftShapeType = 'blob' | 'rect' | 'rounded-rect' | 'circle' | 'ellipse' | 'triangle' | 'polygon' | 'star';
type CraftLineType = 'line' | 'arc' | 'wave' | 'circle' | 'freehand';
const cursorNoise = createNoise2D(createSeededNoise(211));

function createShapePath({
  type,
  width,
  height,
  seed,
  roughness,
  bowing,
  sides,
}: {
  type: CraftShapeType;
  width: number;
  height: number;
  seed: number;
  roughness: number;
  bowing: number;
  sides: number;
}) {
  const random = createSeededNoise(seed);
  const vary = (value: number, amount = roughness) => value + (random() - 0.5) * amount * 2;
  const cx = width / 2;
  const cy = height / 2;
  if (type === 'rect') return `M ${vary(2)} ${vary(2)} Q ${width / 2} ${vary(2, bowing)} ${vary(width - 2)} ${vary(2)} L ${vary(width - 2)} ${vary(height - 2)} Q ${width / 2} ${vary(height - 2, bowing)} ${vary(2)} ${vary(height - 2)} Z`;
  if (type === 'rounded-rect') return `M 16 ${vary(2)} H ${width - 16} Q ${width - 2} ${vary(2)} ${width - 2} 16 V ${height - 16} Q ${width - 2} ${height - 2} ${width - 16} ${height - 2} H 16 Q 2 ${height - 2} 2 ${height - 16} V 16 Q 2 2 16 ${vary(2)} Z`;
  if (type === 'circle' || type === 'ellipse') {
    const rx = type === 'circle' ? Math.min(width, height) / 2 - 3 : width / 2 - 3;
    const ry = type === 'circle' ? rx : height / 2 - 3;
    return `M ${cx - rx} ${cy} C ${cx - rx} ${cy - ry}, ${cx + rx} ${cy - ry}, ${cx + rx} ${cy} C ${cx + rx} ${cy + ry}, ${cx - rx} ${cy + ry}, ${cx - rx} ${cy} Z`;
  }
  if (type === 'blob') {
    const count = Math.max(8, sides * 2);
    const points = Array.from({ length: count }, (_, index) => {
      const angle = -Math.PI / 2 + index / count * Math.PI * 2;
      const pulse = 0.86 + Math.sin(angle * sides) * 0.09 + random() * 0.1;
      return `${vary(cx + Math.cos(angle) * (width / 2 - 4) * pulse).toFixed(2)} ${vary(cy + Math.sin(angle) * (height / 2 - 4) * pulse).toFixed(2)}`;
    });
    return `M ${points.join(' L ')} Z`;
  }
  const pointCount = type === 'triangle' ? 3 : type === 'star' ? Math.max(5, sides) * 2 : Math.max(3, sides);
  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = -Math.PI / 2 + index / pointCount * Math.PI * 2;
    const starScale = type === 'star' && index % 2 ? 0.48 : 1;
    const radiusX = (width / 2 - 4) * starScale * vary(1, roughness * 0.025);
    const radiusY = (height / 2 - 4) * starScale * vary(1, roughness * 0.025);
    return `${vary(cx + Math.cos(angle) * radiusX).toFixed(2)} ${vary(cy + Math.sin(angle) * radiusY).toFixed(2)}`;
  });
  return `M ${points.join(' L ')} Z`;
}

export function CraftShape({
  type = 'blob',
  width = 120,
  height = 90,
  seed = 1,
  roughness = 2,
  bowing = 1.2,
  sides = 6,
  fillStyle = 'solid',
  fillColor = '#f4d7b2',
  strokeColor = '#76513e',
  strokeWidth = 1.6,
  idleMotion = 'none',
  erosion = 0,
  morphTo,
  morphDuration = 3.6,
  className = '',
}: {
  type?: CraftShapeType;
  width?: number;
  height?: number;
  seed?: number;
  roughness?: number;
  bowing?: number;
  sides?: number;
  fillStyle?: 'solid' | 'crayon' | 'chalk';
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  idleMotion?: IdleMotion;
  erosion?: number;
  morphTo?: CraftShapeType;
  morphDuration?: number;
  className?: string;
}) {
  const { reducedMotion } = useCraftMotion();
  const maskId = useId().replace(/:/g, '');
  const path = useMemo(
    () => createShapePath({ type, width, height, seed, roughness, bowing, sides }),
    [bowing, height, roughness, seed, sides, type, width],
  );
  const morphPath = useMemo(
    () => morphTo ? createShapePath({ type: morphTo, width, height, seed: seed + 19, roughness, bowing, sides }) : '',
    [bowing, height, morphTo, roughness, seed, sides, width],
  );
  const erosionPaths = useMemo(
    () => createEdgeErosionPaths({ width, height, seed: seed + 101, count: erosion, maxSize: 9 }),
    [erosion, height, seed, width],
  );
  const filter = fillStyle === 'crayon' || fillStyle === 'chalk' ? 'url(#craft-crayon-grain)' : undefined;
  return (
    <svg className={`craft-shape craft-motion-${idleMotion} ${className}`} viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">
      {erosionPaths.length > 0 && (
        <defs>
          <mask id={maskId}>
            <rect width={width} height={height} fill="white" />
            {erosionPaths.map((erosionPath) => <path key={erosionPath} d={erosionPath} fill="black" />)}
          </mask>
        </defs>
      )}
      <path d={path} fill={fillColor} filter={filter} mask={erosionPaths.length ? `url(#${maskId})` : undefined} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {morphPath && !reducedMotion && <animate attributeName="d" values={`${path};${morphPath};${path}`} dur={`${morphDuration}s`} repeatCount="indefinite" />}
      </path>
    </svg>
  );
}

export function CraftLine({
  type = 'line',
  length = 180,
  height = 44,
  curvature = 0.45,
  frequency = 4,
  start = 0,
  end = 1,
  points = [],
  seed = 1,
  roughness = 1,
  strokeColor = '#76513e',
  strokeWidth = 1.8,
  animate = false,
  className = '',
}: {
  type?: CraftLineType;
  length?: number;
  height?: number;
  curvature?: number;
  frequency?: number;
  start?: number;
  end?: number;
  points?: Point[];
  seed?: number;
  roughness?: number;
  strokeColor?: string;
  strokeWidth?: number;
  animate?: boolean;
  className?: string;
}) {
  const path = useMemo(() => {
    if (type === 'arc') return `M 2 ${height / 2} Q ${length / 2} ${height / 2 - height * curvature} ${length - 2} ${height / 2}`;
    if (type === 'wave') {
      const wavePoints = Array.from({ length: frequency * 4 + 1 }, (_, index) => ({
        x: index / (frequency * 4) * length,
        y: height / 2 + Math.sin(index / 4 * Math.PI * 2) * height * 0.26,
      }));
      return createHandDrawnPath(wavePoints, { seed, roughness });
    }
    if (type === 'circle') {
      const rx = length / 2 - 3;
      const ry = height / 2 - 3;
      const from = start * Math.PI * 2 - Math.PI / 2;
      const to = end * Math.PI * 2 - Math.PI / 2;
      const x1 = length / 2 + Math.cos(from) * rx;
      const y1 = height / 2 + Math.sin(from) * ry;
      const x2 = length / 2 + Math.cos(to) * rx;
      const y2 = height / 2 + Math.sin(to) * ry;
      return `M ${x1} ${y1} A ${rx} ${ry} 0 ${end - start > 0.5 ? 1 : 0} 1 ${x2} ${y2}`;
    }
    if (type === 'freehand') return createHandDrawnStrokePath(points, { size: strokeWidth * 2.2 });
    return createHandDrawnPath([{ x: 2, y: height / 2 }, { x: length - 2, y: height / 2 }], { seed, roughness });
  }, [curvature, end, frequency, height, length, points, roughness, seed, start, strokeWidth, type]);
  return (
    <svg className={`craft-line ${animate ? 'is-animated' : ''} ${className}`} viewBox={`0 0 ${length} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={path} fill={type === 'freehand' ? strokeColor : 'none'} stroke={type === 'freehand' ? 'none' : strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CraftPattern({
  id,
  pattern = 'dot',
  width = 240,
  height = 120,
  tileSize = 22,
  tileGap = 6,
  tileOffset = 0,
  angle = 0,
  colors = ['#d98565'],
  backgroundColor = 'transparent',
  strokeWidth = 1.4,
  symbol = '✦',
  renderTile,
  seed = 1,
  randomness = 0.6,
  scatter = 0,
}: {
  id: string;
  pattern?: 'dot' | 'circle' | 'cross' | 'memphis' | 'symbol';
  width?: number;
  height?: number;
  tileSize?: number;
  tileGap?: number;
  tileOffset?: number;
  angle?: number;
  colors?: string[];
  backgroundColor?: string;
  strokeWidth?: number;
  symbol?: string;
  renderTile?: (color: string) => ReactNode;
  seed?: number;
  randomness?: number;
  scatter?: number | boolean;
}) {
  const tiles = useMemo(() => {
    const spacing = tileSize + tileGap;
    const columns = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;
    const random = createSeededNoise(seed);
    const scatterAmount = typeof scatter === 'number' ? scatter : scatter ? randomness : 0;
    if (scatterAmount) {
      return createScatterLayout({ count: columns * rows, width, height, seed, scatter: scatterAmount, colorCount: colors.length });
    }
    return Array.from({ length: columns * rows }, (_, index) => ({
      x: index % columns * spacing + (Math.floor(index / columns) % 2 ? tileOffset : 0) + (random() - 0.5) * randomness * 4,
      y: Math.floor(index / columns) * spacing + (random() - 0.5) * randomness * 4,
      rotation: angle + (random() - 0.5) * randomness * 16,
      scale: 1 + (random() - 0.5) * randomness * 0.12,
      colorIndex: Math.floor(random() * Math.max(1, colors.length)),
    }));
  }, [angle, colors.length, height, randomness, scatter, seed, tileGap, tileOffset, tileSize, width]);
  return (
    <svg className="craft-pattern" viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" aria-hidden="true">
      <rect width={width} height={height} fill={backgroundColor} />
      <g id={id}>
        {tiles.map((tile, index) => {
          const color = colors[tile.colorIndex] ?? colors[0];
          const transform = `translate(${tile.x.toFixed(2)} ${tile.y.toFixed(2)}) rotate(${tile.rotation.toFixed(2)}) scale(${tile.scale.toFixed(2)})`;
          if (renderTile) return <g key={index} transform={transform}>{renderTile(color)}</g>;
          if (pattern === 'cross') return <path key={index} d="M-4 0H4M0-4V4" stroke={color} strokeWidth={strokeWidth} opacity=".5" transform={transform} />;
          if (pattern === 'circle') return <circle key={index} r="3.6" fill="none" stroke={color} strokeWidth={strokeWidth} opacity=".5" transform={transform} />;
          if (pattern === 'memphis') return <path key={index} d="M-5 2Q0-5 5 2" fill="none" stroke={color} strokeWidth={strokeWidth} opacity=".5" transform={transform} />;
          if (pattern === 'symbol') return <text key={index} fill={color} opacity=".5" transform={transform}>{symbol}</text>;
          return <circle key={index} r="2.2" fill={color} opacity=".42" transform={transform} />;
        })}
      </g>
    </svg>
  );
}

export function CraftCursor({
  children,
  items = ['✦', '♡', '·'],
}: {
  children: ReactNode;
  items?: string[];
}) {
  const { reducedMotion } = useCraftMotion();
  const [trail, setTrail] = useState<{ id: number; x: number; y: number; item: string }[]>([]);
  const counterRef = useRef(0);
  const lastTrailAtRef = useRef(0);
  const timeoutRefs = useRef<number[]>([]);
  const resolvedItems = items.length ? items : ['✦'];
  useEffect(() => () => timeoutRefs.current.forEach((timeout) => window.clearTimeout(timeout)), []);
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const now = Date.now();
    if (now - lastTrailAtRef.current < 45) return;
    lastTrailAtRef.current = now;
    const rect = event.currentTarget.getBoundingClientRect();
    const id = counterRef.current++;
    const noise = cursorNoise(id * 0.16, now * 0.0007);
    setTrail((current) => [...current.slice(-10), { id, x: event.clientX - rect.left + noise * 9, y: event.clientY - rect.top - Math.abs(noise) * 7, item: resolvedItems[id % resolvedItems.length] }]);
    const timeout = window.setTimeout(() => {
      setTrail((current) => current.filter((point) => point.id !== id));
      timeoutRefs.current = timeoutRefs.current.filter((item) => item !== timeout);
    }, 520);
    timeoutRefs.current.push(timeout);
  };
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const burst = Array.from({ length: 8 }, (_, index) => {
      const id = counterRef.current++;
      const angle = index / 8 * Math.PI * 2;
      const radius = 18 + cursorNoise(id * 0.14, index) * 7;
      return { id, x: x + Math.cos(angle) * radius, y: y + Math.sin(angle) * radius, item: resolvedItems[id % resolvedItems.length] };
    });
    setTrail((current) => [...current.slice(-10), ...burst]);
    const timeout = window.setTimeout(() => {
      setTrail((current) => current.filter((point) => !burst.some(({ id }) => id === point.id)));
      timeoutRefs.current = timeoutRefs.current.filter((item) => item !== timeout);
    }, 520);
    timeoutRefs.current.push(timeout);
  };
  return (
    <div className="craft-cursor-area" onPointerMove={handlePointerMove} onPointerDown={handlePointerDown}>
      {children}
      {trail.map((point) => <span key={point.id} className="craft-cursor-particle" style={{ left: point.x, top: point.y }}>{point.item}</span>)}
    </div>
  );
}

const themes = {
  'journal-warm': ['#f6eee2', '#76513e', '#d98565'],
  'ocean-blue': ['#edf4f3', '#4e6670', '#8cb7c7'],
  'forest-green': ['#eef1e4', '#586348', '#98ad74'],
  'snow-white': ['#f8f8f4', '#69727e', '#b8c8d7'],
} as const;

export function CraftThemePanel({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<keyof typeof themes>('journal-warm');
  const [intensity, setIntensity] = useState(1);
  const [grain, setGrain] = useState(0.26);
  const [lineWidth, setLineWidth] = useState(1.6);
  const [radius, setRadius] = useState(10);
  const applyTheme = (nextTheme: keyof typeof themes) => {
    const [background, ink, accent] = themes[nextTheme];
    document.documentElement.style.setProperty('--paper-bg', background);
    document.documentElement.style.setProperty('--ink', ink);
    document.documentElement.style.setProperty('--accent-warm', accent);
    setTheme(nextTheme);
  };
  return (
    <fieldset className={`craft-theme-panel ${className}`}>
      <legend>Craft Theme</legend>
      <label>
        主题
        <select value={theme} onChange={(event) => applyTheme(event.target.value as keyof typeof themes)}>
          {Object.keys(themes).map((name) => <option key={name}>{name}</option>)}
        </select>
      </label>
      <label>
        动画强度
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={intensity}
          onChange={(event) => {
            const value = Number(event.target.value);
            document.documentElement.style.setProperty('--craft-motion-intensity', String(value));
            window.dispatchEvent(new CustomEvent('craft-motion-change', { detail: value }));
            setIntensity(value);
          }}
        />
      </label>
      <label>
        纸张颗粒
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.02"
          value={grain}
          onChange={(event) => {
            const value = Number(event.target.value);
            document.documentElement.style.setProperty('--craft-material-opacity', String(value));
            setGrain(value);
          }}
        />
      </label>
      <label>
        线条粗细
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={lineWidth}
          onChange={(event) => {
            const value = Number(event.target.value);
            document.documentElement.style.setProperty('--craft-line-width', `${value}px`);
            setLineWidth(value);
          }}
        />
      </label>
      <label>
        圆角
        <input
          type="range"
          min="2"
          max="24"
          step="1"
          value={radius}
          onChange={(event) => {
            const value = Number(event.target.value);
            document.documentElement.style.setProperty('--craft-radius-soft', `${value}px`);
            setRadius(value);
          }}
        />
      </label>
    </fieldset>
  );
}

export type { CraftLineType, CraftShapeType, IdleMotion };
