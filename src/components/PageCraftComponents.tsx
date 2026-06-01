import { CraftLine, CraftPattern, CraftShape } from './craft';

const TIMELINE_LABELS = ['第一天', '变熟了', '小确幸', '快收好', '再见面'];

export function HeroActionBoard() {
  return (
    <div className="hero-action-board" aria-label="手帐组件示例">
      <button type="button" className="craft-demo-button craft-demo-button-primary">程程</button>
      <button type="button" className="craft-demo-button craft-demo-button-ghost">去看六封信</button>
      <label className="craft-demo-input">
        <input value="10.10 到 06.05，幸好同行" readOnly aria-label="纪念页备注" />
      </label>
    </div>
  );
}

export function PatternSampler() {
  return (
    <div className="pattern-sampler" aria-hidden="true">
      <div className="pattern-sampler-card">
        <CraftPattern
          id="memory-memphis-pattern"
          pattern="memphis"
          width={220}
          height={82}
          tileSize={20}
          tileGap={12}
          colors={['#d98565', '#8aaf9e', '#c89a4c']}
          scatter={0.7}
          seed={503}
        />
        <span>工位旁边的小碎片</span>
      </div>
      <div className="pattern-sampler-card">
        <CraftPattern
          id="memory-symbol-pattern"
          pattern="symbol"
          symbol="♡"
          width={220}
          height={82}
          tileSize={18}
          tileGap={14}
          colors={['#a15f47', '#d98565']}
          randomness={0.9}
          seed={611}
        />
        <span>给你们的小爱心</span>
      </div>
    </div>
  );
}

export function TimelineCardTools({ index }: { index: number }) {
  return (
    <div className="timeline-card-tools" aria-hidden="true">
      <span>{TIMELINE_LABELS[index % TIMELINE_LABELS.length]}</span>
      <CraftLine
        type={index % 2 ? 'arc' : 'wave'}
        length={88}
        height={24}
        curvature={0.5}
        frequency={3}
        strokeColor={index % 2 ? '#8aaf9e' : '#d98565'}
        strokeWidth={1.35}
        seed={71 + index}
      />
    </div>
  );
}

export function LettersStatsPanel() {
  return (
    <div className="letters-stats-panel" aria-label="六封信组件摘要">
      <div className="letters-stats-item">
        <CraftShape type="star" width={54} height={54} seed={33} fillColor="rgba(244, 223, 220, 0.7)" idleMotion="twinkle" />
        <b>6</b>
        <span>封信慢慢拆</span>
      </div>
      <div className="letters-stats-item">
        <CraftShape type="blob" width={62} height={50} seed={42} fillColor="rgba(220, 236, 226, 0.78)" idleMotion="float" />
        <b>∞</b>
        <span>次聊天都算数</span>
      </div>
      <div className="letters-stats-item">
        <CraftShape type="ellipse" width={64} height={44} seed={54} fillColor="rgba(247, 232, 184, 0.76)" idleMotion="swing" />
        <b>1</b>
        <span>本纪念手帐</span>
      </div>
    </div>
  );
}

export function ClosingPatternFooter() {
  return (
    <div className="closing-pattern-footer" aria-hidden="true">
      <CraftLine type="wave" length={180} height={28} frequency={5} strokeColor="#a15f47" strokeWidth={1.4} seed={99} />
      <span>10.10 入职 · 06.05 收尾 · 慢慢再见面</span>
      <CraftLine type="wave" length={180} height={28} frequency={5} strokeColor="#8aaf9e" strokeWidth={1.4} seed={107} />
    </div>
  );
}
