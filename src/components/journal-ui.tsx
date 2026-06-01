import type { CSSProperties, ReactNode } from 'react';

type Tone = 'apricot' | 'mint' | 'sky' | 'pink' | 'butter' | 'sand';

const toneClassMap: Record<Tone, string> = {
  apricot: 'craft-pill-apricot',
  mint: 'craft-pill-mint',
  sky: 'craft-pill-sky',
  pink: 'craft-pill-pink',
  butter: 'craft-pill-butter',
  sand: 'craft-pill-sand',
};

export function SectionHeader({
  kicker,
  title,
  note,
  badge,
}: {
  kicker: string;
  title: ReactNode;
  note?: string;
  badge?: string;
}) {
  return (
    <div className="section-header">
      <div className="section-title-row">
        <p className="section-kicker">{kicker}</p>
        {badge ? <span className="craft-mini-badge">{badge}</span> : null}
      </div>
      <div className="section-wave" aria-hidden="true">
        <span />
      </div>
      <h2>{title}</h2>
      {note ? <p className="section-note">{note}</p> : null}
    </div>
  );
}

export function CraftPill({
  children,
  tone = 'sand',
  icon,
  tilt = 0,
  subtle = false,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  tilt?: number;
  subtle?: boolean;
}) {
  const className = toneClassMap[tone];
  return (
    <span
      className={`craft-pill ${className} ${subtle ? 'craft-pill-subtle' : ''}`}
      style={{ '--craft-pill-tilt': `${tilt}deg` } as CSSProperties}
    >
      {icon ? <span className="craft-pill-icon" aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}

export function CraftRibbon({
  children,
  tone = 'apricot',
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return <span className={`craft-ribbon ${toneClassMap[tone]}`}>{children}</span>;
}

export function FloatingSticker({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`floating-sticker ${className}`}>{children}</span>;
}
