import { createSeededNoise } from '../utils';
import { CAREER_WORLD_WIDTH, createCareerNodes } from './careerJourneyConfig';
import type { AnimalItem, CareerWorld, KeepsakeItem, SceneryItem } from './careerJourneyTypes';

function scenery(count: number, seed: number, yMin: number, yMax: number, sizeMin: number, sizeMax: number): SceneryItem[] {
  const random = createSeededNoise(seed);
  return Array.from({ length: count }, (_, index) => ({
    x: index / count * CAREER_WORLD_WIDTH + random() * 180,
    y: yMin + random() * (yMax - yMin),
    size: sizeMin + random() * (sizeMax - sizeMin),
    variant: Math.floor(random() * 4),
  }));
}

function animals(): AnimalItem[] {
  const random = createSeededNoise(93);
  return Array.from({ length: 10 }, (_, index) => ({
    kind: index % 2 ? 'frog' : 'rabbit',
    x: 320 + index * 440 + random() * 90,
    y: 0,
    size: 0.86 + random() * 0.22,
    variant: index % 4,
    phase: random() * Math.PI * 2,
  }));
}

function keepsakes(): KeepsakeItem[] {
  const random = createSeededNoise(141);
  const kinds: KeepsakeItem['kind'][] = [
    'note',
    'photo',
    'ticket',
    'tape',
    'spark',
    'envelope',
    'paper-plane',
    'badge',
    'camera',
    'coffee',
    'meal',
  ];
  return Array.from({ length: 34 }, (_, index) => ({
    kind: kinds[index % kinds.length],
    x: 120 + index * 142 + random() * 76,
    y: 20 + random() * 58,
    size: 0.68 + random() * 0.28,
    variant: Math.floor(random() * 5),
    phase: random() * Math.PI * 2,
  }));
}

export function createCareerWorld(): CareerWorld {
  return {
    offset: 0,
    elapsed: 0,
    lastFootstep: 0,
    mode: 'running',
    rewindProgress: 0,
    activeNode: null,
    activeNodeAt: 0,
    nodes: createCareerNodes(),
    clouds: scenery(9, 17, 28, 88, 0.72, 1.28),
    trees: scenery(12, 31, 0, 0, 0.76, 1.3),
    birds: scenery(5, 49, 52, 118, 0.74, 1.12),
    animals: animals(),
    keepsakes: keepsakes(),
    flowers: [],
    particles: [],
  };
}
