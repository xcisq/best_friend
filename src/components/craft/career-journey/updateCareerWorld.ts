import { CAREER_SPEED, CAREER_WORLD_WIDTH } from './careerJourneyConfig';
import type { CareerWorld, ParticleItem } from './careerJourneyTypes';

function smoke(world: CareerWorld, ground: number, runnerX: number) {
  if (world.elapsed - world.lastFootstep < 0.28) return;
  world.lastFootstep = world.elapsed;
  for (let index = 0; index < 2; index += 1) {
    world.particles.push({
      kind: 'smoke',
      x: runnerX - 10,
      y: ground - 3,
      vx: -24 - index * 11,
      vy: -16 - index * 5,
      bornAt: world.elapsed,
      life: 0.55,
    });
  }
}

function burst(world: CareerWorld, x: number, y: number) {
  for (let index = 0; index < 8; index += 1) {
    const angle = index / 8 * Math.PI * 2;
    world.particles.push({
      kind: 'burst',
      x,
      y,
      vx: Math.cos(angle) * 54,
      vy: Math.sin(angle) * 54,
      bornAt: world.elapsed,
      life: 0.72,
    });
  }
}

function updateParticles(world: CareerWorld, delta: number) {
  world.particles.forEach((particle) => {
    particle.x += particle.vx * delta;
    particle.y += particle.vy * delta;
    particle.vx *= 0.96;
    particle.vy += particle.kind === 'smoke' ? 12 * delta : 22 * delta;
  });
  world.particles = world.particles
    .filter((particle) => world.elapsed - particle.bornAt < particle.life)
    .slice(-88);
}

function reset(world: CareerWorld) {
  world.offset = 0;
  world.mode = 'running';
  world.rewindProgress = 0;
  world.activeNode = null;
  world.nodes.forEach((node) => {
    node.triggered = false;
  });
}

export function updateCareerWorld(world: CareerWorld, delta: number, width: number, ground: number) {
  world.elapsed += delta;
  const runnerX = width * 0.22;

  if (world.mode === 'rewind') {
    world.rewindProgress += delta;
    if (world.rewindProgress >= 1) reset(world);
    updateParticles(world, delta);
    return;
  }

  world.offset += CAREER_SPEED * delta;
  smoke(world, ground, runnerX);
  const runnerWorldX = world.offset + runnerX;

  world.nodes.forEach((node) => {
    if (!node.triggered && Math.abs(node.x - runnerWorldX) < 8) {
      node.triggered = true;
      world.activeNode = node;
      world.activeNodeAt = world.elapsed;
      burst(world, runnerX + 12, ground - 24);
    }
  });

  if (world.activeNode && world.elapsed - world.activeNodeAt > 3) world.activeNode = null;
  if (world.offset >= CAREER_WORLD_WIDTH) {
    world.mode = 'rewind';
    world.rewindProgress = 0;
  }
  updateParticles(world, delta);
}

export function plantFlower(world: CareerWorld, worldX: number) {
  const colors = ['#d98565', '#97b6a4', '#e6c984', '#a9bdd9', '#dfb7b0'];
  world.flowers.push({
    x: ((worldX % CAREER_WORLD_WIDTH) + CAREER_WORLD_WIDTH) % CAREER_WORLD_WIDTH,
    bornAt: world.elapsed,
    height: 18 + world.flowers.length % 3 * 4,
    color: colors[world.flowers.length % colors.length],
  });
  world.flowers = world.flowers.slice(-24);
}

export function particleOpacity(world: CareerWorld, particle: ParticleItem) {
  return Math.max(0, 1 - (world.elapsed - particle.bornAt) / particle.life);
}
