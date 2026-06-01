import type { CareerNode } from './careerJourneyTypes';

export const CAREER_WORLD_WIDTH = 4800;
export const CAREER_START_DATE = '2025.10.10';
export const CAREER_END_DATE = '2026.06.05';
export const CAREER_SPEED = 74;
export const CAREER_INK = '#2a2836';
export const CAREER_GROUND_RATIO = 0.78;

const nodeDetails = [
  ['2025.10.10', '第一次坐到你们身边', '实习开始', '第 1 天'],
  ['2025.12.01', '普通日子慢慢变熟', '一起吃饭、吐槽、赶进度', '冬天'],
  ['2026.03.15', '把忙碌折进手帐', '那些后来会想念的小事', '春天'],
  ['2026.06.05', '这一页先写到这里', '离开前的一封纪念信', '第 239 天'],
] as const;

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
  return nodeDetails.map(([date, title, detail, meta]) => ({
    date,
    title,
    detail,
    meta,
    x: progressFromDate(date) * CAREER_WORLD_WIDTH,
    triggered: false,
  }));
}

export function dateAtOffset(offset: number) {
  const progress = Math.max(0, Math.min(1, offset / CAREER_WORLD_WIDTH));
  return formatDate(new Date(startTime + progress * (endTime - startTime)));
}
