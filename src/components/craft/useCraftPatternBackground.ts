import { useMemo } from 'react';

export interface CraftPatternBackgroundOptions {
  pattern?: 'dot' | 'circle' | 'cross';
  backgroundColor?: string;
  colors?: string[];
  tileSize?: number;
  strokeWidth?: number;
}

function tileMarkup(pattern: CraftPatternBackgroundOptions['pattern'], color: string, tileSize: number, strokeWidth: number) {
  const center = tileSize / 2;
  if (pattern === 'circle') return `<circle cx="${center}" cy="${center}" r="${Math.max(2, center * 0.24)}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" opacity=".52"/>`;
  if (pattern === 'cross') return `<path d="M${center - 4} ${center}h8M${center} ${center - 4}v8" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" opacity=".52"/>`;
  return `<circle cx="${center}" cy="${center}" r="${Math.max(1.5, center * 0.14)}" fill="${color}" opacity=".42"/>`;
}

export function createCraftPatternDataUrl({
  pattern = 'dot',
  backgroundColor = 'transparent',
  colors = ['#d98565'],
  tileSize = 22,
  strokeWidth = 1.4,
}: CraftPatternBackgroundOptions = {}) {
  const safeColor = colors[0] ?? '#d98565';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tileSize}" height="${tileSize}" viewBox="0 0 ${tileSize} ${tileSize}"><rect width="100%" height="100%" fill="${backgroundColor}"/>${tileMarkup(pattern, safeColor, tileSize, strokeWidth)}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function useCraftPatternBackground(options: CraftPatternBackgroundOptions = {}) {
  const { backgroundColor, colors, pattern, strokeWidth, tileSize } = options;
  return useMemo(
    () => createCraftPatternDataUrl({ backgroundColor, colors, pattern, strokeWidth, tileSize }),
    [backgroundColor, colors, pattern, strokeWidth, tileSize],
  );
}
