import type { CareerNode } from './careerJourneyTypes';
import { journey } from '../../../content/journey';

export const CAREER_WORLD_WIDTH = 4800;
export const CAREER_START_DATE = '2025.10.10';
export const CAREER_END_DATE = '2026.06.05';
export const CAREER_SPEED = 74;
export const CAREER_INK = '#2a2836';
export const CAREER_GROUND_RATIO = 0.78;

const startTime = Date.UTC(2025, 9, 10);
const endTime = Date.UTC(2026, 5, 5);

function dateToTime(date: string) {
  const [year, month, day] = date.split('.').map(Number);
  return Date.UTC(year, month - 1, day);
}

function formatDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function progressFromDate(date: string) {
  return (dateToTime(date) - startTime) / (endTime - startTime);
}

export const CAREER_TIME_TICKS = [
  CAREER_START_DATE,
  '2025.11.01',
  '2025.12.01',
  '2026.01.01',
  '2026.02.01',
  '2026.03.01',
  '2026.04.01',
  '2026.05.01',
  CAREER_END_DATE,
].map((label) => ({
  label,
  x: progressFromDate(label) * CAREER_WORLD_WIDTH,
}));

export function createCareerNodes(): CareerNode[] {
  return journey.detailedTimeline.map((entry, index) => ({
    date: entry.date,
    title: entry.title,
    detail: entry.railDetail,
    meta: `${index + 1} / ${journey.detailedTimeline.length}`,
    x: progressFromDate(entry.date) * CAREER_WORLD_WIDTH,
    triggered: false,
  }));
}

export function dateAtOffset(offset: number) {
  const progress = Math.max(0, Math.min(1, offset / CAREER_WORLD_WIDTH));
  return formatDate(new Date(startTime + progress * (endTime - startTime)));
}
