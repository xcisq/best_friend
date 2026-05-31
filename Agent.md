# 239 Days Together - Project Guide

## Purpose

Build a warm, hand-crafted memorial webpage for a first internship and the friends met there.
The page records the 239 inclusive days from 2025-10-10 to 2026-06-05 and is intended
to be shared as a personal gift after local completion.

The finished page is a single-page static site. It must remain easy to push to GitHub and
deploy on Vercel without a server, database, login flow, or online editor.

## References

- Reference journey page: https://work-journey.sunebear.com/
- Reference Craft UI page: https://work-journey.sunebear.com/ui
- Paper component source: https://github.com/SuneBear/craft-paper
- Inspected `craft-paper` source revision: `c970831770551e0736461b3fb7b0b2e29ca486a9`
- `craft-paper` license: MIT

Use the references for visual language, not for page structure or copy. This page is a
personal internship scrapbook rather than a portfolio or component showcase.

## Technical Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Static content stored in source files
- Native HTML `<video>` for optional media playback

Use Tailwind as the primary CSS strategy. Keep global CSS limited to theme tokens, font
declarations, paper texture, reusable motion primitives, and accessibility fallbacks.
Do not introduce CSS Modules, CSS-in-JS, Supabase, a CMS, or a backend.

## Craft Paper Integration

Copy the reusable `src/components/paper-shape` source directory from `craft-paper` into
this project. Do not copy its demo routes, Supabase integration, shadcn components, share
editor, export editor, or decoration editing UI.

Use these components and helpers:

- `PaperShape`: paper containers for letters, timeline notes, photos, and closing note.
- `PosterTitle`: hand-crafted first-screen title treatment.
- `createDecoration`: static decorative washi tape, staples, and stickers.

Use these paper presets where appropriate:

- `basic-paper`: introduction and calm content.
- `torn`: personal letters and scrapbook fragments.
- `stitched`: warm framed notes.
- `ticket`: friend entry tickets and date fragments.
- `receipt`: compact timeline notes or closing details.

Decorations are visual accents only. Keep density restrained:

- Washi tape: one strip on selected paper cards.
- Staples: occasional corners.
- Stickers: small accents, never a wall of emoji.

Do not enable interactive decoration editing or depend on `react-moveable`.

## Visual Direction

### Visual thesis

A warm internship scrapbook: creamy paper, brown ink, faded color accents, lightly
misaligned photos, and the feeling that every piece was placed by hand over several evenings.

### Palette

- Canvas: warm oatmeal paper.
- Ink: deep warm brown, never pure black.
- Muted ink: lighter walnut brown.
- Accent colors: apricot, muted mint, dusty sky blue, soft pink, and restrained yellow.
- Surfaces: cream and cloud paper from `craft-paper`.

### Typography

- Use a readable Chinese system serif stack for letters and body copy.
- Use a handwriting-style font only for short display labels and the title.
- Keep long messages calm and highly readable. Do not force handwriting fonts onto paragraphs.

### Depth and layout

- Use paper texture and layered shadows rather than generic rounded cards.
- Favor one narrow reading column with occasional asymmetric overlap.
- Photos may rotate by a few degrees and overlap slightly on desktop.
- Preserve clear reading order and avoid overlap on mobile.

### Avoid

- Purple-to-blue gradients.
- Gradient text.
- Glassmorphism.
- Generic identical card grids.
- Excessive rounded rectangles.
- Decorative motion that competes with the letters.
- A portfolio-style navigation bar.

## Page Structure

1. Hero
   - Title: `这 239 天，幸好和你们一起`
   - Date line: `2025.10.10 - 2026.06.05`
   - A short opening note.
2. Shared journey
   - Five replaceable highlight notes:
     - `第一次坐到你们身边`
     - `慢慢熟悉`
     - `忙碌里的小事`
     - `开始数剩下的日子`
     - `把想说的话写下来`
3. Six letters
   - `邸超 · 男妈妈`
   - `温进 · 小姑姑`
   - `东旭 · 大姑姑`
   - `晓朋`
   - `沼斌 · 师傅`
   - `天岳`
4. Closing note
   - A brief goodbye and thank-you.

All letters are visible to every visitor. Each friend starts as a ticket-like entry.
Clicking a ticket opens that person's letter inline. Only one letter is expanded at a time.

## Content Model

Store all editable content in `src/content/journey.ts`.

```ts
interface JourneyConfig {
  hero: { title: string; startDate: string; endDate: string; intro: string };
  timeline: TimelineEntry[];
  friends: FriendLetter[];
  closing: string;
}

interface FriendLetter {
  id: string;
  name: string;
  nickname?: string;
  accent: string;
  paperPreset: PaperPreset;
  message: string;
  photos: MediaAsset[];
  video?: MediaAsset;
}

interface MediaAsset {
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
}
```

The first implementation uses clear placeholder copy and placeholder media cards. Real
letters, captions, photos, and videos must be replaceable without editing page components.

## Media Rules

- Put local media under `public/media`.
- Support external URLs for large videos when the page is deployed.
- Use explicit image width and height when real image dimensions are known.
- Lazy-load below-the-fold images.
- Video playback is manual only.
- Use `preload="metadata"` and preserve video sound.
- Do not add background music in the first version.

## Interaction Rules

- Signature interaction: unfold letters one at a time from the six ticket entries.
- Use opacity and transform animations only.
- Keep animations subtle and interruptible.
- Honor `prefers-reduced-motion`.
- Letter buttons must be native `<button>` elements with `aria-expanded`.
- Interactive targets must be at least 40 by 40 pixels.
- Add visible focus states.

## Responsive Rules

- Desktop: narrow journal column, light asymmetry, and modest photo overlap.
- Mobile: preserve document order, reduce decorative overlap, and keep the page readable at
  375px viewport width.
- Never hide meaningful text or required controls on mobile.

## Acceptance Checks

- `npm run lint`
- `npm run build`
- Browser check at desktop width.
- Browser check at 375px width.
- Open and close each of the six letters.
- Confirm only one letter is expanded at a time.
- Confirm keyboard operation and visible focus treatment.
- Confirm placeholder media and optional-video layouts both render correctly.
- Confirm reduced-motion mode remains fully readable.

