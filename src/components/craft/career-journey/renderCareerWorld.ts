import {
  CAREER_GROUND_RATIO,
  CAREER_INK,
  CAREER_TIME_TICKS,
  CAREER_WORLD_WIDTH,
  dateAtOffset,
} from './careerJourneyConfig';
import { particleOpacity } from './updateCareerWorld';
import type { AnimalItem, CareerWorld, FlowerItem, KeepsakeItem, SceneryItem } from './careerJourneyTypes';

const TAU = Math.PI * 2;

function screenX(x: number, offset: number, parallax = 1) {
  const shifted = x - offset * parallax;
  return ((shifted % CAREER_WORLD_WIDTH) + CAREER_WORLD_WIDTH) % CAREER_WORLD_WIDTH;
}

function visibleX(x: number, offset: number, width: number, parallax = 1) {
  const primary = screenX(x, offset, parallax);
  const candidates = [primary, primary - CAREER_WORLD_WIDTH];
  return candidates.find((candidate) => candidate > -140 && candidate < width + 140);
}

function lineStyle(context: CanvasRenderingContext2D, alpha = 0.62, width = 1.45) {
  context.strokeStyle = `rgba(42, 40, 54, ${alpha})`;
  context.fillStyle = `rgba(42, 40, 54, ${alpha})`;
  context.lineWidth = width;
  context.lineCap = 'round';
  context.lineJoin = 'round';
}

function cloud(context: CanvasRenderingContext2D, item: SceneryItem, x: number) {
  const y = item.y;
  const scale = item.size;
  lineStyle(context, 0.18, 1.1);
  context.beginPath();
  context.moveTo(x - 25 * scale, y + 4);
  context.bezierCurveTo(x - 22 * scale, y - 7, x - 14 * scale, y - 9, x - 8 * scale, y - 5);
  context.bezierCurveTo(x - 2 * scale, y - 18, x + 12 * scale, y - 14, x + 13 * scale, y - 5);
  context.bezierCurveTo(x + 28 * scale, y - 7, x + 31 * scale, y + 10, x + 18 * scale, y + 10);
  context.lineTo(x - 18 * scale, y + 10);
  context.stroke();
}

function tree(context: CanvasRenderingContext2D, item: SceneryItem, x: number, ground: number) {
  const height = 44 + 34 * item.size;
  lineStyle(context, 0.32, 1.1);
  context.beginPath();
  context.moveTo(x, ground);
  context.lineTo(x + item.variant - 1, ground - height);
  for (let index = 1; index <= 5; index += 1) {
    const y = ground - height * index / 6;
    const side = index % 2 ? -1 : 1;
    const reach = 10 + index * 2.6;
    context.moveTo(x, y);
    context.lineTo(x + side * reach, y - 9);
    context.lineTo(x + side * (reach + 5), y - 15);
    context.moveTo(x + side * reach, y - 9);
    context.lineTo(x + side * (reach + 8), y - 5);
  }
  context.stroke();
}

function bird(context: CanvasRenderingContext2D, item: SceneryItem, x: number, elapsed: number) {
  const wing = Math.sin(elapsed * 5 + item.variant) * 5;
  const y = item.y + Math.sin(elapsed + item.variant) * 3;
  lineStyle(context, 0.26, 1.1);
  context.beginPath();
  context.ellipse(x, y, 13 * item.size, 6 * item.size, -0.08, 0, TAU);
  context.moveTo(x + 11, y - 2);
  context.arc(x + 16, y - 3, 5, 0, TAU);
  context.moveTo(x + 21, y - 3);
  context.lineTo(x + 28, y);
  context.lineTo(x + 21, y + 2);
  context.moveTo(x - 10, y);
  context.lineTo(x - 20, y - 6);
  context.moveTo(x - 10, y + 2);
  context.lineTo(x - 20, y + 6);
  context.moveTo(x - 2, y - 3);
  context.quadraticCurveTo(x + 3, y - 17 - wing, x + 10, y - 5);
  context.stroke();
}

function animal(context: CanvasRenderingContext2D, item: AnimalItem, x: number, ground: number, elapsed: number) {
  const isRabbit = item.kind === 'rabbit';
  const cycle = isRabbit ? Math.abs(Math.sin(elapsed * 2.1 + item.phase)) : Math.max(0, Math.sin(elapsed * 0.9 + item.phase) - 0.82) * 5.5;
  const y = ground - cycle * (isRabbit ? 9 : 10);
  const stretch = isRabbit ? 1 : 1 + cycle * 0.08;
  lineStyle(context, 0.42, 1.2);
  context.save();
  context.translate(x, y);
  context.scale(1 / stretch, stretch);
  context.beginPath();
  context.ellipse(0, -6, isRabbit ? 8 : 10, isRabbit ? 7 : 5, 0, 0, TAU);
  if (isRabbit) {
    context.ellipse(-3, -18, 2.5, 9, -0.18, 0, TAU);
    context.ellipse(3, -18, 2.5, 9, 0.18, 0, TAU);
    context.arc(8, -5, 3, 0, TAU);
  } else {
    context.arc(-5, -12, 3, 0, TAU);
    context.arc(5, -12, 3, 0, TAU);
    context.moveTo(-9, -3);
    context.lineTo(-16, 1);
    context.moveTo(9, -3);
    context.lineTo(16, 1);
  }
  context.stroke();
  context.restore();
}

function keepsake(context: CanvasRenderingContext2D, item: KeepsakeItem, x: number, ground: number, elapsed: number) {
  const drift = Math.sin(elapsed * 0.8 + item.phase) * 2.2;
  const y = item.kind === 'spark' ? item.y + drift : ground - 62 - item.y * 0.38 + drift;
  const scale = item.size;
  lineStyle(context, 0.36, 1.15);
  context.save();
  context.translate(x, y);
  context.rotate((item.variant - 2) * 0.055);
  context.scale(scale, scale);

  if (item.kind === 'photo') {
    context.fillStyle = 'rgba(255, 250, 242, 0.72)';
    context.fillRect(-14, -18, 28, 34);
    context.strokeRect(-14, -18, 28, 34);
    context.beginPath();
    context.moveTo(-9, 1);
    context.lineTo(-2, -7);
    context.lineTo(5, 1);
    context.lineTo(11, -5);
    context.stroke();
  } else if (item.kind === 'note') {
    context.fillStyle = 'rgba(244, 226, 133, 0.2)';
    context.fillRect(-18, -12, 36, 24);
    context.strokeRect(-18, -12, 36, 24);
    context.beginPath();
    context.moveTo(-11, -3);
    context.lineTo(10, -4);
    context.moveTo(-9, 5);
    context.lineTo(7, 4);
    context.stroke();
  } else if (item.kind === 'ticket') {
    context.strokeRect(-19, -9, 38, 18);
    context.beginPath();
    context.arc(-19, 0, 4, -Math.PI / 2, Math.PI / 2);
    context.arc(19, 0, 4, Math.PI / 2, Math.PI * 1.5);
    context.moveTo(-8, -3);
    context.lineTo(11, -3);
    context.moveTo(-8, 4);
    context.lineTo(6, 4);
    context.stroke();
  } else if (item.kind === 'tape') {
    context.fillStyle = 'rgba(217, 133, 101, 0.18)';
    context.beginPath();
    context.moveTo(-22, -5);
    context.lineTo(22, -8);
    context.lineTo(19, 7);
    context.lineTo(-20, 6);
    context.closePath();
    context.fill();
    context.stroke();
  } else if (item.kind === 'envelope') {
    context.strokeRect(-18, -11, 36, 22);
    context.beginPath();
    context.moveTo(-18, -11);
    context.lineTo(0, 3);
    context.lineTo(18, -11);
    context.moveTo(-18, 11);
    context.lineTo(-3, -1);
    context.moveTo(18, 11);
    context.lineTo(3, -1);
    context.stroke();
  } else if (item.kind === 'paper-plane') {
    context.beginPath();
    context.moveTo(-20, 5);
    context.lineTo(22, -13);
    context.lineTo(8, 12);
    context.lineTo(1, 2);
    context.lineTo(-8, 11);
    context.closePath();
    context.moveTo(1, 2);
    context.lineTo(22, -13);
    context.stroke();
  } else if (item.kind === 'badge') {
    context.strokeRect(-13, -18, 26, 30);
    context.beginPath();
    context.moveTo(-6, -18);
    context.lineTo(-4, -25);
    context.lineTo(4, -25);
    context.lineTo(6, -18);
    context.moveTo(-7, -6);
    context.lineTo(8, -6);
    context.moveTo(-7, 2);
    context.lineTo(5, 2);
    context.stroke();
  } else if (item.kind === 'camera') {
    context.strokeRect(-18, -10, 36, 24);
    context.beginPath();
    context.moveTo(-9, -10);
    context.lineTo(-5, -17);
    context.lineTo(7, -17);
    context.lineTo(11, -10);
    context.moveTo(-12, -3);
    context.lineTo(-6, -3);
    context.arc(3, 2, 7, 0, TAU);
    context.stroke();
  } else if (item.kind === 'coffee') {
    context.beginPath();
    context.moveTo(-13, -9);
    context.lineTo(-10, 12);
    context.lineTo(10, 12);
    context.lineTo(13, -9);
    context.closePath();
    context.moveTo(-15, -15);
    context.lineTo(15, -15);
    context.moveTo(-8, -20);
    context.quadraticCurveTo(-4, -25, 0, -20);
    context.moveTo(3, -20);
    context.quadraticCurveTo(7, -25, 11, -20);
    context.stroke();
  } else if (item.kind === 'meal') {
    context.beginPath();
    context.ellipse(0, 2, 18, 12, 0, 0, TAU);
    context.ellipse(0, 2, 9, 5, 0, 0, TAU);
    context.moveTo(-25, -11);
    context.lineTo(-25, 15);
    context.moveTo(-29, -11);
    context.lineTo(-21, -11);
    context.moveTo(24, -13);
    context.lineTo(24, 15);
    context.moveTo(20, -8);
    context.lineTo(28, -13);
    context.stroke();
  } else {
    context.beginPath();
    for (let index = 0; index < 5; index += 1) {
      const angle = -Math.PI / 2 + index * TAU / 5;
      context.lineTo(Math.cos(angle) * 10, Math.sin(angle) * 10);
      context.lineTo(Math.cos(angle + TAU / 10) * 4, Math.sin(angle + TAU / 10) * 4);
    }
    context.closePath();
    context.stroke();
  }
  context.restore();
}

function runner(context: CanvasRenderingContext2D, x: number, ground: number, elapsed: number) {
  const bounce = Math.abs(Math.sin(elapsed * 7)) * 3;
  const swing = Math.sin(elapsed * 7) * 11;
  const y = ground - 22 - bounce;
  lineStyle(context, 0.78, 1.8);
  context.beginPath();
  context.arc(x, y - 22, 13, 0, TAU);
  context.arc(x - 8, y - 34, 4, 0, TAU);
  context.arc(x + 8, y - 34, 4, 0, TAU);
  context.moveTo(x - 4, y - 23);
  context.arc(x - 4, y - 23, 0.9, 0, TAU);
  context.moveTo(x + 4, y - 23);
  context.arc(x + 4, y - 23, 0.9, 0, TAU);
  context.moveTo(x, y - 19);
  context.lineTo(x, y);
  context.moveTo(x, y - 12);
  context.lineTo(x - 13, y - 11 + swing * 0.42);
  context.moveTo(x, y - 12);
  context.lineTo(x + 13, y - 11 - swing * 0.42);
  context.moveTo(x, y);
  context.lineTo(x - 10, ground + swing * 0.36);
  context.moveTo(x, y);
  context.lineTo(x + 10, ground - swing * 0.36);
  context.stroke();
}

function boss(context: CanvasRenderingContext2D, x: number, ground: number, elapsed: number, approached: boolean) {
  const shake = approached ? Math.sin(elapsed * 24) * 2 : 0;
  lineStyle(context, 0.7, 1.7);
  context.save();
  context.translate(x + shake, ground - 19);
  context.beginPath();
  context.arc(0, 0, 15, 0, TAU);
  for (let index = 0; index < 5; index += 1) {
    const angle = -Math.PI * 0.85 + index * Math.PI * 0.42;
    context.moveTo(Math.cos(angle) * 13, Math.sin(angle) * 13);
    context.lineTo(Math.cos(angle) * 23, Math.sin(angle) * 23);
  }
  context.moveTo(-8, -6);
  context.lineTo(-3, -3);
  context.moveTo(8, -6);
  context.lineTo(3, -3);
  context.moveTo(-5, 3);
  context.lineTo(5, 3);
  context.moveTo(-7, 14);
  context.lineTo(-7, 19);
  context.moveTo(7, 14);
  context.lineTo(7, 19);
  context.stroke();
  context.restore();
}

function flower(context: CanvasRenderingContext2D, item: FlowerItem, x: number, ground: number, elapsed: number) {
  const age = elapsed - item.bornAt;
  const stem = Math.max(0, Math.min(1, (age - 0.15) / 0.55));
  const bloom = Math.max(0, Math.min(1, (age - 0.7) / 0.37));
  lineStyle(context, 0.62, 1.2);
  context.strokeStyle = item.color;
  context.beginPath();
  context.moveTo(x, ground);
  context.lineTo(x, ground - item.height * stem);
  context.moveTo(x, ground - item.height * 0.5);
  context.lineTo(x + 6 * stem, ground - item.height * 0.68);
  context.stroke();
  if (!bloom) return;
  context.fillStyle = item.color;
  for (let index = 0; index < 6; index += 1) {
    const angle = index / 6 * TAU;
    context.beginPath();
    context.arc(x + Math.cos(angle) * 5 * bloom, ground - item.height + Math.sin(angle) * 5 * bloom, 2.4 * bloom, 0, TAU);
    context.fill();
  }
}

function fitText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  if (context.measureText(text).width <= maxWidth) return text;
  let fitted = text;
  while (fitted.length > 1 && context.measureText(`${fitted}…`).width > maxWidth) {
    fitted = fitted.slice(0, -1);
  }
  return `${fitted}…`;
}

function drawCard(context: CanvasRenderingContext2D, world: CareerWorld, width: number) {
  if (!world.activeNode) return;
  const node = world.activeNode;
  const age = world.elapsed - world.activeNodeAt;
  const y = 10 + Math.min(1, age / 0.35) * 12;
  const x = Math.min(width - 184, width * 0.55);
  context.fillStyle = 'rgba(255, 250, 242, 0.94)';
  context.strokeStyle = 'rgba(42, 40, 54, 0.55)';
  context.lineWidth = 1.2;
  context.fillRect(x, y, 172, 72);
  context.strokeRect(x, y, 172, 72);
  context.fillStyle = CAREER_INK;
  context.font = '12px "Patrick Hand", cursive';
  context.fillText(node.date, x + 11, y + 17);
  context.font = 'bold 15px "Patrick Hand", cursive';
  context.fillText(fitText(context, node.title, 150), x + 11, y + 38);
  context.font = '12px "Patrick Hand", cursive';
  context.fillText(fitText(context, node.detail, 112), x + 11, y + 56);
  context.textAlign = 'right';
  context.fillText(node.meta, x + 160, y + 56);
  context.textAlign = 'left';
}

export function renderCareerWorld(context: CanvasRenderingContext2D, world: CareerWorld, width: number, height: number) {
  const ground = height * CAREER_GROUND_RATIO;
  context.clearRect(0, 0, width, height);
  context.save();
  lineStyle(context);

  world.clouds.forEach((item) => {
    const x = visibleX(item.x, world.offset, width, 0.26);
    if (x !== undefined) cloud(context, item, x);
  });
  world.birds.forEach((item) => {
    const x = visibleX(item.x, world.offset, width, 0.35);
    if (x !== undefined) bird(context, item, x, world.elapsed);
  });
  world.trees.forEach((item) => {
    const x = visibleX(item.x, world.offset, width, 0.7);
    if (x !== undefined) tree(context, item, x, ground);
  });
  world.keepsakes.forEach((item) => {
    const x = visibleX(item.x, world.offset, width, item.kind === 'spark' ? 0.48 : 0.9);
    if (x !== undefined) keepsake(context, item, x, ground, world.elapsed);
  });

  lineStyle(context, 0.65, 1.35);
  context.beginPath();
  context.moveTo(0, ground);
  context.lineTo(width, ground);
  context.stroke();

  CAREER_TIME_TICKS.forEach((tick, index) => {
    const x = visibleX(tick.x, world.offset, width);
    if (x === undefined) return;
    const primary = index === 0 || index === CAREER_TIME_TICKS.length - 1;
    context.beginPath();
    context.moveTo(x, ground);
    context.lineTo(x, ground + (primary ? 13 : 8));
    context.stroke();
    context.fillStyle = 'rgba(42, 40, 54, 0.58)';
    context.font = `${primary ? 12 : 10}px "Patrick Hand", cursive`;
    context.textAlign = 'center';
    context.fillText(tick.label, x, ground + (primary ? 29 : 23));
  });
  context.textAlign = 'left';

  world.animals.forEach((item) => {
    const x = visibleX(item.x, world.offset, width);
    if (x !== undefined) animal(context, item, x, ground, world.elapsed);
  });
  world.flowers.forEach((item) => {
    const x = visibleX(item.x, world.offset, width);
    if (x !== undefined) flower(context, item, x, ground, world.elapsed);
  });

  const runnerX = width * 0.22;
  world.nodes.forEach((node) => {
    const x = visibleX(node.x, world.offset, width);
    if (x !== undefined && !node.triggered) boss(context, x, ground, world.elapsed, Math.abs(x - runnerX) < 130);
  });
  runner(context, runnerX, ground, world.elapsed);

  world.particles.forEach((particle) => {
    const opacity = particleOpacity(world, particle);
    lineStyle(context, opacity * 0.65, 1.2);
    context.beginPath();
    if (particle.kind === 'smoke') context.arc(particle.x, particle.y, 3 + (1 - opacity) * 6, 0, TAU);
    else {
      context.moveTo(particle.x - particle.vx * 0.05, particle.y - particle.vy * 0.05);
      context.lineTo(particle.x, particle.y);
    }
    context.stroke();
  });

  const futureProgress = Math.max(0, (world.offset - CAREER_WORLD_WIDTH * 0.9) / (CAREER_WORLD_WIDTH * 0.1));
  context.fillStyle = `rgba(42, 40, 54, ${futureProgress * 0.32})`;
  context.font = '12px monospace';
  for (let index = 0; index < Math.floor(futureProgress * 36); index += 1) {
    context.fillText(index % 3 ? '01|' : '1:0', width - index * 19 % width, 30 + index * 17 % Math.max(34, ground - 40));
  }

  if (world.mode === 'rewind') {
    context.fillStyle = `rgba(42, 40, 54, ${Math.sin(world.rewindProgress * Math.PI) * 0.12})`;
    for (let y = height; y > 0; y -= 18) context.fillRect(0, y - world.rewindProgress * 160 % 18, width, 3);
  }

  context.fillStyle = 'rgba(42, 40, 54, 0.54)';
  context.font = '12px "Patrick Hand", cursive';
  context.fillText(dateAtOffset(world.offset), 12, 18);
  drawCard(context, world, width);
  context.restore();
}
