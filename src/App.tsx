import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { PaperShape } from './components/paper-shape';
import {
  LordiconMotionStrip,
  MemoryMotionLayer,
  PostmarkDriftLayer,
  StarScatterLayer,
  ThoughtBubbleCluster,
} from './components/PageAnimatedEffects';
import { FriendLettersSection } from './components/FriendLettersSection';
import { SectionWidgetSprinkles } from './components/SectionWidgetSprinkles';
import {
  ClosingPatternFooter,
  HeroActionBoard,
  LettersStatsPanel,
  MemoryPocketCluster,
  PatternSampler,
  TimelineCardTools,
} from './components/PageCraftComponents';
import { PageKeepsakes } from './components/PageKeepsakes';
import { CraftPill, CraftRibbon, FloatingSticker, SectionHeader } from './components/journal-ui';
import {
  CareerJourneyScene,
  CraftFilterDefs,
  CraftMotionProvider,
  ScrollProgressTrack,
  StickyHand,
  type ProgressSection,
} from './components/craft';
import { PosterTitle } from './components/paper-shape/PosterTitle';
import {
  createDecoration,
  type DecorationItem,
  type DecorationType,
} from './components/paper-shape/decorations';
import { journey } from './content/journey';

const INK = '#76513e';
const ACCENT_INK = '#9c6143';
const PROGRESS_SECTIONS: ProgressSection[] = [
  { id: 'memory-hero', label: '开场', icon: 'heart' },
  { id: 'shared-journey', label: '一起走过', icon: 'leaf' },
  { id: 'friend-letters', label: '六封信', icon: 'envelope' },
  { id: 'closing-note', label: '结尾', icon: 'star' },
];

function decoration(
  id: string,
  type: DecorationType,
  variant: string,
  x: number,
  y: number,
  rotation = 0,
  scale = 1,
): DecorationItem {
  return {
    ...createDecoration(type, variant, x, y, { rotation, scale }),
    id,
  };
}

const TIMELINE_DECORATIONS: DecorationItem[][] = [
  [decoration('timeline-tape-1', 'washi-tape', 'stars-yellow', 34, -10, -5, 0.88)],
  [decoration('timeline-staple-2', 'staple', 'rose-gold', 36, -8, -9, 0.95)],
  [decoration('timeline-tape-3', 'washi-tape', 'dots-mint', 66, -10, 6, 0.92)],
  [decoration('timeline-staple-4', 'staple', 'silver', 44, -8, 8, 0.95)],
  [decoration('timeline-tape-5', 'washi-tape', 'check-sky', 44, -10, -4, 0.9)],
];

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function DoodleDivider({ symbol = '✦' }: { symbol?: string }) {
  return (
    <div className="doodle-divider" aria-hidden="true">
      <span />
      <b>{symbol}</b>
      <span />
    </div>
  );
}

function HeroMemoryChips() {
  return (
    <div className="hero-memory-chips" aria-label="纪念页摘要">
      <span><b>239</b><small>days together</small></span>
      <span><b>6</b><small>letters saved</small></span>
      <span><b>∞</b><small>after work chats</small></span>
    </div>
  );
}

function ScrapbookSupplyRow() {
  return (
    <div className="scrapbook-supply-row" aria-hidden="true">
      <span className="supply-chip supply-chip-note">便签</span>
      <span className="supply-chip supply-chip-clip">回形针</span>
      <span className="supply-chip supply-chip-tape">胶带</span>
      <span className="supply-chip supply-chip-stamp">日期章</span>
    </div>
  );
}

function LetterToolRow() {
  return (
    <div className="letter-tool-row" aria-hidden="true">
      <span>✉ 拆信刀</span>
      <span>♡ 贴纸</span>
      <span>NO. 01-06</span>
    </div>
  );
}

function ClosingChecklist() {
  return (
    <ul className="closing-checklist" aria-label="收尾清单">
      <li>照片留白已经放好</li>
      <li>六封信都可以慢慢拆</li>
      <li>下一次见面继续写</li>
    </ul>
  );
}

function App() {
  return (
    <CraftMotionProvider>
      <main className="journal-page">
      <CraftFilterDefs />
      <ScrollProgressTrack sections={PROGRESS_SECTIONS} />
      <div className="paper-grain" aria-hidden="true" />
      <div className="margin-rule" aria-hidden="true" />
      <span className="floating-doodle doodle-one" aria-hidden="true">✿</span>
      <span className="floating-doodle doodle-two" aria-hidden="true">✦</span>
      <span className="floating-doodle doodle-three" aria-hidden="true">♡</span>
      <PageKeepsakes />
      <StarScatterLayer />
      <MemoryMotionLayer />
      <PostmarkDriftLayer />

      <section id="memory-hero" className="hero-section journal-column">
        <StickyHand />
        <Reveal>
          <div className="hero-tape" aria-hidden="true" />
          <FloatingSticker className="hero-sticker hero-sticker-left">✦</FloatingSticker>
          <FloatingSticker className="hero-sticker hero-sticker-right">♡</FloatingSticker>
          <PaperShape
            preset="folded"
            layoutMode="fill"
            width={720}
            minHeight={430}
            maxWidth={780}
            paperColor="cloud"
            strokeColor={INK}
            strokeWidth={1.65}
            roughness={0.44}
            showPattern
            patternType="dots"
            patternParams={{ patternColor: '#bc8a67', patternOpacity: 0.12, dotGap: 18, dotSize: 1 }}
            shapeParams={{ shadowOpacity: 0.2, edgeWobble: 0.7 }}
            presetParams={{ foldSize: 30 }}
            contentPadding={{ all: 26, top: 38, bottom: 28 }}
            contentAlign="start"
          >
            <div className="hero-inner">
              <div className="hero-eyebrow-row">
                <p className="hero-eyebrow">FIRST INTERNSHIP · MEMORY BOOK</p>
                <CraftRibbon tone="butter">纪念页</CraftRibbon>
              </div>
              <div className="hero-title">
                <PosterTitle
                  align="left"
                  quote={false}
                  adaptive={false}
                  lines={[
                    {
                      size: 'lg',
                      trackingEm: -0.035,
                      tokens: [{ text: '这 239 天，', textColor: INK }],
                    },
                    {
                      size: 'xl',
                      trackingEm: -0.04,
                      tokens: [
                        {
                          text: '幸好',
                          highlight: true,
                          highlightStyle: 'lower',
                          highlightColor: 'rgba(244, 184, 97, 0.72)',
                          textColor: ACCENT_INK,
                          rotate: -1.5,
                        },
                        { text: '和你们一起', textColor: INK },
                      ],
                    },
                  ]}
                  symbols={[
                    { kind: 'heart', x: 87, y: 12, size: 22, color: '#d98565', rotate: -8 },
                    { kind: 'curve', x: 91, y: 86, size: 56, color: '#8aaf9e', rotate: -4 },
                  ]}
                />
              </div>
              <p className="hero-dates">
                <span>{journey.hero.startDate}</span>
                <i aria-hidden="true" />
                <span>{journey.hero.endDate}</span>
              </p>
              <div className="hero-pill-row" aria-label="页面风格标签">
                <CraftPill tone="apricot" icon="✦" tilt={-2}>239 天</CraftPill>
                <CraftPill tone="mint" icon="﹏" tilt={1.5} subtle>慢慢翻</CraftPill>
              </div>
              <HeroMemoryChips />
              <HeroActionBoard />
              <p className="hero-intro">{journey.hero.intro}</p>
              <p className="hero-sign">写在离开前的这一周</p>
            </div>
          </PaperShape>
        </Reveal>
        <p className="scroll-note">往下翻，是一些想留住的小事 <span aria-hidden="true">↓</span></p>
        <div className="hero-memory-components" aria-label="实习纪念组件带">
          <LordiconMotionStrip />
          <ThoughtBubbleCluster />
          <PatternSampler />
        </div>
      </section>

      <section id="shared-journey" className="journey-section journal-column" aria-labelledby="journey-title">
        <Reveal>
          <SectionHeader
            kicker="PART 01 · BEFORE THE LETTERS"
            badge="一起走过"
            title={<><span id="journey-title">先把一起走过的路，</span><br />轻轻折在这里。</>}
            note="这些节点都可以换成真正属于你们的故事和照片。"
          />
        </Reveal>
        <ScrapbookSupplyRow />
        <SectionWidgetSprinkles variant="journey" />
        <MemoryPocketCluster variant="journey" />

        <div className="timeline">
          {journey.timeline.map((entry, index) => (
            <Reveal key={entry.id} className={`timeline-entry timeline-entry-${(index % 2) + 1}`}>
              <span className="timeline-pin" style={{ backgroundColor: index % 2 ? '#8aaf9e' : '#d98565' }} aria-hidden="true" />
              <PaperShape
                preset={entry.paperPreset}
                layoutMode="fill"
                width={520}
                minHeight={148}
                maxWidth={560}
                paperColor={entry.color}
                strokeColor={INK}
                strokeWidth={1.45}
                roughness={0.5}
                shapeParams={{ shadowOpacity: 0.14, edgeWobble: 0.85 }}
                decorations={TIMELINE_DECORATIONS[index]}
                contentPadding={{ all: 18, top: 22, bottom: 20 }}
                contentAlign="start"
              >
                <article className="timeline-note">
                  <p>{entry.date}</p>
                  <h3>{entry.title}</h3>
                  <span>{entry.note}</span>
                  <TimelineCardTools index={index} />
                </article>
              </PaperShape>
            </Reveal>
          ))}
        </div>
      </section>

      <DoodleDivider symbol="♡" />

      <section id="friend-letters" className="letters-section journal-column" aria-labelledby="letters-title">
        <Reveal>
          <SectionHeader
            kicker="PART 02 · SIX LETTERS"
            badge="慢慢拆开"
            title={<><span id="letters-title">有些话，还是想</span><br />一封一封写给你们。</>}
            note="点开名字。六封信都在这里，也都可以被大家看到。"
          />
        </Reveal>
        <LetterToolRow />
        <SectionWidgetSprinkles variant="letters" />
        <LettersStatsPanel />
        <MemoryPocketCluster variant="letters" />

        <FriendLettersSection friends={journey.friends} />
      </section>

      <DoodleDivider symbol="✦" />

      <section id="closing-note" className="closing-section journal-column">
        <Reveal>
          <PaperShape
            preset="stitched"
            layoutMode="fill"
            width={700}
            minHeight={255}
            maxWidth={740}
            paperColor="cream"
            strokeColor={INK}
            strokeWidth={1.55}
            roughness={0.42}
            showPattern
            patternType="dots"
            patternParams={{ patternColor: '#d98565', patternOpacity: 0.1, dotGap: 20, dotSize: 1.1 }}
            shapeParams={{ shadowOpacity: 0.16 }}
            contentPadding={{ all: 30, top: 34 }}
            contentAlign="start"
          >
            <div className="closing-note">
              <div className="section-title-row">
                <p className="section-kicker">LAST PAGE · FOR NOW</p>
                <CraftRibbon tone="pink">收好这一页</CraftRibbon>
              </div>
              <h2>这一页先写到这里。</h2>
              <p>{journey.closing}</p>
              <ClosingChecklist />
              <MemoryPocketCluster variant="closing" />
              <ClosingPatternFooter />
              <span>谢谢你们。以后也要常见面。</span>
            </div>
          </PaperShape>
        </Reveal>
        <SectionWidgetSprinkles variant="closing" />
      </section>

      <section className="memory-rail-section journal-column" aria-label="实习纪念时间轴">
        <CareerJourneyScene />
      </section>

      <footer>
        <span>2025.10.10</span>
        <b aria-hidden="true">♡</b>
        <span>2026.06.05</span>
      </footer>
      </main>
    </CraftMotionProvider>
  );
}

export default App;
