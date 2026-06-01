export interface Point {
  x: number;
  y: number;
}

export interface ScatterPoint extends Point {
  rotation: number;
  scale: number;
  colorIndex: number;
}

export function createSeededNoise(seed = 1) {
  let value = Math.max(1, Math.floor(seed) % 2147483647);
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function createHandDrawnPath(
  points: Point[],
  { seed = 1, roughness = 0 }: { seed?: number; roughness?: number } = {},
): string {
  if (!points.length) return '';
  const random = createSeededNoise(seed);
  const varied = points.map(({ x, y }, index) => ({
    x: index === 0 ? x : x + (random() - 0.5) * roughness * 2,
    y: index === 0 ? y : y + (random() - 0.5) * roughness * 2,
  }));
  return varied.map(({ x, y }, index) => `${index ? 'L' : 'M'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
}

export function createHandDrawnStrokePath(
  points: Point[],
  {
    size = 4,
    thinning = 0.5,
    smoothing = 0.55,
    streamline = 0.45,
  }: {
    size?: number;
    thinning?: number;
    smoothing?: number;
    streamline?: number;
  } = {},
) {
  const outline = getStroke(points, { size, thinning, smoothing, streamline, simulatePressure: true });
  if (!outline.length) return '';
  const average = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const path = outline.reduce<(string | number)[]>((commands, point, index, source) => {
    const next = source[(index + 1) % source.length];
    const [x, y] = average(point, next);
    commands.push(x, y);
    return commands;
  }, ['M', ...outline[0], 'Q']);
  path.push('Z');
  return path.join(' ');
}

export function createScatterLayout({
  count,
  width,
  height,
  seed = 1,
  scatter = 1,
  colorCount = 1,
}: {
  count: number;
  width: number;
  height: number;
  seed?: number;
  scatter?: number;
  colorCount?: number;
}): ScatterPoint[] {
  const random = createSeededNoise(seed);
  return Array.from({ length: count }, () => ({
    x: random() * width,
    y: random() * height,
    rotation: (random() - 0.5) * 36 * scatter,
    scale: 1 + (random() - 0.5) * 0.34 * scatter,
    colorIndex: Math.floor(random() * Math.max(1, colorCount)),
  }));
}

export function createEdgeErosionPaths({
  width,
  height,
  seed = 1,
  count = 3,
  maxSize = 10,
}: {
  width: number;
  height: number;
  seed?: number;
  count?: number;
  maxSize?: number;
}) {
  const random = createSeededNoise(seed);
  return Array.from({ length: Math.max(0, count) }, () => {
    const edge = Math.floor(random() * 4);
    const size = 3 + random() * maxSize;
    const position = random() * (edge % 2 ? height : width);
    if (edge === 0) return `M ${position - size} 0 L ${position} ${size} L ${position + size} 0 Z`;
    if (edge === 1) return `M ${width} ${position - size} L ${width - size} ${position} L ${width} ${position + size} Z`;
    if (edge === 2) return `M ${position - size} ${height} L ${position} ${height - size} L ${position + size} ${height} Z`;
    return `M 0 ${position - size} L ${size} ${position} L 0 ${position + size} Z`;
  });
}
import { getStroke } from 'perfect-freehand';
