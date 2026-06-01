import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { useCraftMotion } from './useCraftMotion';
import { usePageVisible } from './usePageVisible';

interface RopePoint {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  pinned: boolean;
  anchor?: boolean;
  hand?: boolean;
}

interface DragState {
  index: number;
  pointerId: number;
  startX: number;
  startY: number;
  moved: boolean;
  wasPinned: boolean;
}

interface StickyHandProps {
  ropeSegments?: number;
  ropeLengthRatio?: number;
  initialXRatio?: number;
  edgePadding?: number;
  tensionThreshold?: number;
  minDragDistance?: number;
}

const DEFAULT_SIZE = { width: 900, height: 720 };
const HAND_PATH = 'M31 8.5c0 0-2.53 5.333-3.215 8.062-0.896 3.57 0.13 6.268-1.172 9.73-2.25 4.06-2.402 4.717-10.613 4.708-3.009-0.003-11.626-2.297-11.626-2.297-1.188-0.305-3.373-0.125-3.373-1.453s1.554-2.296 2.936-2.3l5.439 0.478c1.322-0.083 2.705-0.856 2.747-2.585-0.022-2.558-0.275-4.522-1.573-6.6l-5.042-7.867c-0.301-0.626-0.373-1.694 0.499-2.171s1.862 0.232 2.2 0.849l5.631 7.66c0.602 0.559 1.671 0.667 1.58-0.524l-2.487-11.401c-0.155-0.81 0.256-1.791 1.194-1.791 1.231 0 1.987 0.47 1.963 1.213l2.734 11.249c0.214 0.547 0.972 0.475 1.176-0.031l0.779-10.939c0.04-0.349 0.495-0.957 1.369-0.831s1.377 1.063 1.285 1.424l-0.253 10.809c0.177 0.958 0.93 1.098 1.517 0.563l3.827-6.843c0.232-0.574 1.143-0.693 1.67-0.466 0.491 0.32 0.81 0.748 0.81 1.351v0z';

function pointsToCurve(points: RopePoint[]) {
  if (!points.length) return '';
  return points.reduce((path, point, index) => {
    if (!index) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    const previous = points[index - 1];
    const middleY = (previous.y + point.y) / 2;
    return `${path} C ${previous.x.toFixed(2)} ${middleY.toFixed(2)}, ${point.x.toFixed(2)} ${middleY.toFixed(2)}, ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }, '');
}

function createPoints(width: number, height: number, count: number, ropeLengthRatio: number, initialXRatio: number) {
  const x = width * initialXRatio;
  const segmentLength = height * ropeLengthRatio / count;
  return {
    segmentLength,
    points: Array.from({ length: count + 1 }, (_, index): RopePoint => ({
      x,
      y: index * segmentLength,
      previousX: x,
      previousY: index * segmentLength,
      pinned: index === 0,
      anchor: index === 0,
      hand: index === count,
    })),
  };
}

export function StickyHand({
  ropeSegments = 20,
  ropeLengthRatio = 0.42,
  initialXRatio = 0.24,
  edgePadding = 35,
  tensionThreshold = 2,
  minDragDistance = 120,
}: StickyHandProps) {
  const { reducedMotion, intensity } = useCraftMotion();
  const pageVisible = usePageVisible();
  const rootRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const ropeOutlineRef = useRef<SVGPathElement>(null);
  const ropeHitRef = useRef<SVGPathElement>(null);
  const handRef = useRef<SVGPathElement>(null);
  const handOutlineRef = useRef<SVGPathElement>(null);
  const handHitRef = useRef<SVGPathElement>(null);
  const anchorRef = useRef<SVGCircleElement>(null);
  const pointsRef = useRef<RopePoint[]>([]);
  const segmentLengthRef = useRef(0);
  const dragRef = useRef<DragState | null>(null);
  const angleRef = useRef(0);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [inView, setInView] = useState(true);

  const updateArtwork = useCallback(() => {
    const points = pointsRef.current;
    const hand = points[points.length - 1];
    const beforeHand = points[points.length - 2];
    if (!hand || !beforeHand) return;

    const rope = pointsToCurve(points);
    ropeRef.current?.setAttribute('d', rope);
    ropeOutlineRef.current?.setAttribute('d', rope);
    ropeHitRef.current?.setAttribute('d', rope);

    const targetAngle = 90 + Math.atan2(hand.y - beforeHand.y, hand.x - beforeHand.x) * 180 / Math.PI;
    angleRef.current += (targetAngle - angleRef.current) * 0.15;
    const transform = `translate(${hand.x.toFixed(2)} ${hand.y.toFixed(2)}) rotate(${angleRef.current.toFixed(2)}) translate(-24 -24) scale(1.3)`;
    handRef.current?.setAttribute('transform', transform);
    handOutlineRef.current?.setAttribute('transform', transform);
    handHitRef.current?.setAttribute('transform', transform);

    const anchor = points[0];
    anchorRef.current?.setAttribute('cx', anchor.x.toFixed(2));
    anchorRef.current?.setAttribute('cy', anchor.y.toFixed(2));
  }, []);

  const resetRope = useCallback((width: number, height: number) => {
    const next = createPoints(width, height, ropeSegments, ropeLengthRatio, initialXRatio);
    pointsRef.current = next.points;
    segmentLengthRef.current = next.segmentLength;
    angleRef.current = 0;
    updateArtwork();
  }, [initialXRatio, ropeLengthRatio, ropeSegments, updateArtwork]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const resize = () => {
      const next = { width: Math.max(320, root.clientWidth), height: Math.max(360, root.clientHeight) };
      setSize(next);
      resetRope(next.width, next.height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    return () => observer.disconnect();
  }, [resetRope]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      updateArtwork();
      return;
    }
    if (!inView || !pageVisible) return;

    let animation = 0;
    let phase = 0;
    const animate = () => {
      const points = pointsRef.current;
      const segmentLength = segmentLengthRef.current;
      phase += 0.012 * Math.max(0.35, intensity);

      points.forEach((point) => {
        if (point.pinned) return;
        const velocityX = (point.x - point.previousX) * 0.99;
        const velocityY = (point.y - point.previousY) * 0.99;
        point.previousX = point.x;
        point.previousY = point.y;
        point.x += velocityX;
        point.y += velocityY + 0.5;
      });

      const anchor = points[0];
      if (!dragRef.current && anchor) {
        const restingX = size.width * initialXRatio;
        anchor.x += (restingX + Math.sin(phase) * 20 * intensity - anchor.x) * 0.035;
      }

      for (let iteration = 0; iteration < 8; iteration += 1) {
        for (let index = 0; index < points.length - 1; index += 1) {
          const first = points[index];
          const second = points[index + 1];
          const dx = second.x - first.x;
          const dy = second.y - first.y;
          const distance = Math.max(0.01, Math.hypot(dx, dy));
          const correction = (distance - segmentLength) / distance;
          const firstShare = first.pinned ? 0 : second.pinned ? 1 : 0.5;
          const secondShare = second.pinned ? 0 : first.pinned ? 1 : 0.5;
          first.x += dx * correction * firstShare;
          first.y += dy * correction * firstShare;
          second.x -= dx * correction * secondShare;
          second.y -= dy * correction * secondShare;
        }
      }

      const hand = points[points.length - 1];
      if (hand && !dragRef.current) {
        hand.x = Math.max(edgePadding, Math.min(size.width - edgePadding, hand.x));
        hand.y = Math.max(80, Math.min(size.height - edgePadding, hand.y));
        const touchingSide = hand.x <= edgePadding + 1 || hand.x >= size.width - edgePadding - 1;
        const touchingBottom = hand.y >= size.height - edgePadding - 1;
        if ((touchingSide || touchingBottom) && !hand.pinned) {
          hand.pinned = true;
          hand.previousX = hand.x;
          hand.previousY = hand.y;
        }
      }

      updateArtwork();
      animation = requestAnimationFrame(animate);
    };

    animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, [edgePadding, inView, initialXRatio, intensity, pageVisible, reducedMotion, size, updateArtwork]);

  const getPointer = (event: PointerEvent | ReactPointerEvent) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const startDrag = (event: ReactPointerEvent, index: number) => {
    const point = pointsRef.current[index];
    if (!point) return;
    const pointer = getPointer(event);
    dragRef.current = {
      index,
      pointerId: event.pointerId,
      startX: pointer.x,
      startY: pointer.y,
      moved: false,
      wasPinned: point.pinned,
    };
    point.pinned = true;
    point.x = pointer.x;
    point.y = pointer.y;
    point.previousX = pointer.x;
    point.previousY = pointer.y;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateArtwork();
  };

  const moveDrag = (event: ReactPointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const point = pointsRef.current[drag.index];
    if (!point) return;
    const pointer = getPointer(event);
    const distance = Math.hypot(pointer.x - drag.startX, pointer.y - drag.startY);
    drag.moved ||= distance > 6;
    point.x = pointer.x;
    point.y = pointer.y;
    point.previousX = pointer.x;
    point.previousY = pointer.y;

    const hand = pointsRef.current[pointsRef.current.length - 1];
    if (!point.hand && hand?.pinned && distance > minDragDistance) {
      const previous = pointsRef.current[pointsRef.current.length - 2];
      if (previous && Math.hypot(hand.x - previous.x, hand.y - previous.y) > segmentLengthRef.current * tensionThreshold) {
        hand.pinned = false;
      }
    }
    updateArtwork();
  };

  const endDrag = (event: ReactPointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const point = pointsRef.current[drag.index];
    if (point) {
      if (point.anchor) point.pinned = true;
      else if (point.hand) point.pinned = drag.moved ? false : !drag.wasPinned;
      else point.pinned = drag.wasPinned;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    updateArtwork();
  };

  const startClosestRopeDrag = (event: ReactPointerEvent<SVGPathElement>) => {
    const pointer = getPointer(event);
    const points = pointsRef.current;
    let closest = 1;
    let closestDistance = Number.POSITIVE_INFINITY;
    for (let index = 1; index < points.length - 1; index += 1) {
      const distance = Math.hypot(points[index].x - pointer.x, points[index].y - pointer.y);
      if (distance < closestDistance) {
        closest = index;
        closestDistance = distance;
      }
    }
    startDrag(event, closest);
  };

  const toggleClosestRopePin = (event: ReactPointerEvent<SVGPathElement>) => {
    const pointer = getPointer(event);
    const points = pointsRef.current;
    let closest = 1;
    for (let index = 2; index < points.length - 1; index += 1) {
      if (Math.hypot(points[index].x - pointer.x, points[index].y - pointer.y) < Math.hypot(points[closest].x - pointer.x, points[closest].y - pointer.y)) {
        closest = index;
      }
    }
    points[closest].pinned = !points[closest].pinned;
  };

  return (
    <div ref={rootRef} className="sticky-hand" aria-label="可以拖动的小手装饰">
      <svg viewBox={`0 0 ${size.width} ${size.height}`} role="img" aria-label="悬挂在绳索上的可拖动小手">
        <g className="sticky-hand-art">
          <path ref={ropeOutlineRef} className="sticky-hand-rope-outline" />
          <path ref={ropeRef} className="sticky-hand-rope" />
          <path ref={handRef} d={HAND_PATH} className="sticky-hand-fill" />
          <path ref={handOutlineRef} d={HAND_PATH} className="sticky-hand-outline" />
        </g>
        <circle
          ref={anchorRef}
          r="13"
          className="sticky-hand-hit sticky-hand-anchor-hit"
          onPointerDown={(event) => startDrag(event, 0)}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        />
        <path
          ref={ropeHitRef}
          className="sticky-hand-hit sticky-hand-rope-hit"
          onPointerDown={startClosestRopeDrag}
          onDoubleClick={toggleClosestRopePin}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        />
        <path
          ref={handHitRef}
          d={HAND_PATH}
          className="sticky-hand-hit sticky-hand-shape-hit"
          onPointerDown={(event) => startDrag(event, Math.max(0, pointsRef.current.length - 1))}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        />
      </svg>
    </div>
  );
}
