import { CraftLine, CraftPattern, CraftShape } from './craft';

const TIMELINE_LABELS = ['初识', '换工位', '团建', '百里山水', '九色云'];
const FOOD_MEMORIES = [
  { title: '九色云', note: '美食局 01' },
  { title: '肥姨妈', note: '美食局 02' },
  { title: '盒马', note: '美食局 03' },
  { title: '陶陶居', note: '美食局 04' },
] as const;
const NICKNAME_MEMORIES = [
  { title: '天岳', note: '大文豪本人' },
  { title: '姑姑', note: '唱 Coco' },
  { title: '师傅', note: '星盘 time' },
  { title: '男妈妈', note: 'super reliable' },
] as const;
const LITTLE_CHARMS = [
  { icon: '✈', title: '纸飞机', note: '把话送到你手里' },
  { icon: '✦', title: '小星星', note: '给每一封信发光' },
  { icon: '♡', title: '贴纸心', note: '先替我抱一下' },
  { icon: '﹏', title: '慢慢翻', note: '别一下子看完' },
] as const;

const MEMORY_POCKETS = {
  journey: [
    { title: '换工位', note: 'from stranger', tone: 'warm' },
    { title: '唱 Coco', note: '和姑姑合唱', tone: 'mint' },
    { title: '美食局', note: '九色云 / 盒马', tone: 'pink' },
  ],
  letters: [
    { title: '男妈妈', note: 'super reliable', tone: 'pink' },
    { title: '姑姑', note: '小棉袄', tone: 'warm' },
    { title: '天岳', note: '大文豪本人', tone: 'mint' },
  ],
  closing: [
    { title: '常联系', note: 'after 06.05', tone: 'blue' },
    { title: '一辈子', note: 'best friends', tone: 'pink' },
    { title: '再见面', note: 'next page', tone: 'warm' },
  ],
} as const;

export function HeroActionBoard() {
  return (
    <div className="hero-action-board" aria-label="手帐组件示例">
      <button type="button" className="craft-demo-button craft-demo-button-primary">程程</button>
      <button type="button" className="craft-demo-button craft-demo-button-ghost">去看六封信</button>
      <label className="craft-demo-input">
        <input value="初识、换工位、唱 Coco、团建，都收进来" readOnly aria-label="纪念页备注" />
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
        <span>换工位后的小碎片</span>
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
        <span>和姑姑一起唱 Coco</span>
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
        <span>个称呼都算数</span>
      </div>
      <div className="letters-stats-item">
        <CraftShape type="ellipse" width={64} height={44} seed={54} fillColor="rgba(247, 232, 184, 0.76)" idleMotion="swing" />
        <b>1</b>
        <span>本纪念手帐</span>
      </div>
    </div>
  );
}

export function LittleCharmRibbon() {
  return (
    <div className="little-charm-ribbon" aria-label="拆信前的小装饰">
      {LITTLE_CHARMS.map((item, index) => (
        <span key={item.title} className={`little-charm little-charm-${index + 1}`}>
          <i aria-hidden="true">{item.icon}</i>
          <b>{item.title}</b>
          <small>{item.note}</small>
        </span>
      ))}
    </div>
  );
}

export function MemoryEventStickerStrip() {
  return (
    <div className="memory-category-board" aria-label="这段实习里的分类回忆">
      <section className="memory-category-card memory-category-food" aria-label="美食回忆">
        <p>FOOD MEMO</p>
        <h3>一起吃过的美食局</h3>
        <div className="memory-food-grid">
          {FOOD_MEMORIES.map((item, index) => (
            <span key={item.title} className={`memory-food-ticket memory-food-ticket-${index + 1}`}>
              <b>{item.title}</b>
              <small>{item.note}</small>
            </span>
          ))}
        </div>
        <i className="memory-category-spark memory-category-spark-one" />
        <i className="memory-category-spark memory-category-spark-two" />
      </section>
      <section className="memory-category-card memory-category-nickname" aria-label="称呼回忆">
        <p>NICKNAME NOTE</p>
        <h3>这些称呼都有主人</h3>
        <div className="memory-nickname-list">
          {NICKNAME_MEMORIES.map((item) => (
            <span key={item.title}>
              <b>{item.title}</b>
              <small>{item.note}</small>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ClosingPatternFooter() {
  return (
    <div className="closing-pattern-footer" aria-hidden="true">
      <CraftLine type="wave" length={180} height={28} frequency={5} strokeColor="#a15f47" strokeWidth={1.4} seed={99} />
      <span>10.10 入职 · 06.05 收好 · 以后常见面</span>
      <CraftLine type="wave" length={180} height={28} frequency={5} strokeColor="#8aaf9e" strokeWidth={1.4} seed={107} />
    </div>
  );
}

export function MemoryPocketCluster({
  variant,
}: {
  variant: keyof typeof MEMORY_POCKETS;
}) {
  return (
    <div className={`memory-pocket-cluster memory-pocket-cluster-${variant}`} aria-hidden="true">
      {MEMORY_POCKETS[variant].map((item, index) => (
        <span
          key={`${variant}-${item.title}`}
          className={`memory-pocket-card memory-pocket-card-${item.tone} memory-pocket-card-${index + 1}`}
        >
          <small>keepsake</small>
          <b>{item.title}</b>
          <em>{item.note}</em>
        </span>
      ))}
    </div>
  );
}
