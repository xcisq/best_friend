import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { PaperShape } from './components/paper-shape';
import { PosterTitle } from './components/paper-shape/PosterTitle';
import {
  createDecoration,
  type DecorationItem,
  type DecorationType,
} from './components/paper-shape/decorations';
import { journey, type FriendLetter, type MediaAsset } from './content/journey';

const INK = '#76513e';
const ACCENT_INK = '#9c6143';

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

const LETTER_DECORATIONS: Record<string, DecorationItem[]> = {
  dichao: [decoration('dichao-tape', 'washi-tape', 'stripe-pink', 46, -10, -5, 1.08)],
  wenjin: [decoration('wenjin-staple', 'staple', 'rose-gold', 40, -8, -7, 1)],
  dongxu: [decoration('dongxu-tape', 'washi-tape', 'dots-mint', 72, -10, 5, 1.06)],
  xiaopeng: [decoration('xiaopeng-staple', 'staple', 'silver', 64, -8, -7, 1)],
  zhaobin: [decoration('zhaobin-tape', 'washi-tape', 'stars-yellow', 90, -10, 4, 1.03)],
  tianyue: [decoration('tianyue-staple', 'staple', 'gold', 58, -8, 6, 1)],
};

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

function PhotoSlot({ photo, index }: { photo: MediaAsset; index: number }) {
  return (
    <figure className={`photo-slot photo-slot-${(index % 3) + 1}`}>
      <div className="photo-tape" aria-hidden="true" />
      {photo.src ? (
        <img src={photo.src} alt={photo.alt} loading="lazy" width="720" height="520" />
      ) : (
        <div className="photo-placeholder" role="img" aria-label={photo.alt}>
          <span aria-hidden="true">＋</span>
          <small>{photo.caption ?? '这里放一张照片'}</small>
        </div>
      )}
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}

function VideoCard({ video }: { video: MediaAsset }) {
  return (
    <div className="video-card">
      <p className="video-label">一段会动的回忆 <span aria-hidden="true">▶</span></p>
      {video.src ? (
        <video controls preload="metadata" poster={video.poster} aria-label={video.alt}>
          <source src={video.src} />
          你的浏览器暂时无法播放这个视频。
        </video>
      ) : (
        <div className="video-placeholder">
          <span aria-hidden="true">▷</span>
          <small>{video.caption ?? '这里可以放一段短视频'}</small>
        </div>
      )}
    </div>
  );
}

function FriendTicket({
  friend,
  active,
  onOpen,
}: {
  friend: FriendLetter;
  active: boolean;
  onOpen: () => void;
}) {
  return (
    <div className={`ticket-wrap ${active ? 'is-active' : ''}`}>
      <PaperShape
        preset="ticket"
        width={274}
        height={124}
        roughness={0.46}
        paperColor="cloud"
        strokeColor={INK}
        strokeWidth={1.55}
        shapeParams={{ shadowOpacity: active ? 0.28 : 0.16, edgeWobble: 0.8 }}
        contentPadding={{ all: 13, right: 24 }}
        contentAlign="start"
      >
        <button
          type="button"
          className="ticket-button"
          onClick={onOpen}
          aria-expanded={active}
          aria-controls={`letter-${friend.id}`}
        >
          <span className="ticket-kicker">TO · {friend.name}</span>
          <strong>{friend.nickname ?? '一封信'}</strong>
          <span className="ticket-action">{active ? '先收好这封信' : '拆开看看'} <i aria-hidden="true">→</i></span>
        </button>
      </PaperShape>
      <span className="ticket-dot" style={{ backgroundColor: friend.accent }} aria-hidden="true" />
    </div>
  );
}

function LetterPanel({ friend }: { friend: FriendLetter }) {
  return (
    <div className="opened-letter" id={`letter-${friend.id}`}>
      <PaperShape
        preset={friend.paperPreset}
        layoutMode="fill"
        width={720}
        minHeight={420}
        maxWidth={760}
        paperColor="cloud"
        strokeColor={INK}
        strokeWidth={1.6}
        roughness={0.54}
        showPattern
        patternType="lines"
        patternParams={{ patternColor: friend.accent, patternOpacity: 0.1, lineGap: 28 }}
        shapeParams={{ shadowOpacity: 0.2, edgeWobble: 1.1 }}
        decorations={LETTER_DECORATIONS[friend.id]}
        contentPadding={{ all: 24, top: 32, bottom: 30 }}
        contentAlign="start"
      >
        <article className="letter-content" style={{ '--friend-accent': friend.accent } as CSSProperties}>
          <header>
            <span className="letter-number">LETTER / {friend.name}</span>
            <h3>{friend.greeting}</h3>
          </header>
          <p className="letter-message">{friend.message}</p>
          <div className="photo-collage">
            {friend.photos.map((photo, index) => (
              <PhotoSlot key={`${friend.id}-photo-${index}`} photo={photo} index={index} />
            ))}
          </div>
          {friend.video && <VideoCard video={friend.video} />}
        </article>
      </PaperShape>
    </div>
  );
}

function App() {
  const [openFriendId, setOpenFriendId] = useState<string | null>(null);
  const openFriend = journey.friends.find((friend) => friend.id === openFriendId);

  const toggleFriend = (friendId: string) => {
    setOpenFriendId((current) => (current === friendId ? null : friendId));
  };

  return (
    <main className="journal-page">
      <div className="paper-grain" aria-hidden="true" />
      <div className="margin-rule" aria-hidden="true" />
      <span className="floating-doodle doodle-one" aria-hidden="true">✿</span>
      <span className="floating-doodle doodle-two" aria-hidden="true">✦</span>
      <span className="floating-doodle doodle-three" aria-hidden="true">♡</span>

      <section className="hero-section journal-column">
        <Reveal>
          <div className="hero-tape" aria-hidden="true" />
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
              <p className="hero-eyebrow">FIRST INTERNSHIP · MEMORY BOOK</p>
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
              <p className="hero-intro">{journey.hero.intro}</p>
              <p className="hero-sign">写在离开前的这一周</p>
            </div>
          </PaperShape>
        </Reveal>
        <p className="scroll-note">往下翻，是一些想留住的小事 <span aria-hidden="true">↓</span></p>
      </section>

      <section className="journey-section journal-column" aria-labelledby="journey-title">
        <Reveal>
          <p className="section-kicker">PART 01 · BEFORE THE LETTERS</p>
          <h2 id="journey-title">先把一起走过的路，<br />轻轻折在这里。</h2>
          <p className="section-note">这些节点都可以换成真正属于你们的故事和照片。</p>
        </Reveal>

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
                </article>
              </PaperShape>
            </Reveal>
          ))}
        </div>
      </section>

      <DoodleDivider symbol="♡" />

      <section className="letters-section journal-column" aria-labelledby="letters-title">
        <Reveal>
          <p className="section-kicker">PART 02 · SIX LETTERS</p>
          <h2 id="letters-title">有些话，还是想<br />一封一封写给你们。</h2>
          <p className="section-note">点开名字。六封信都在这里，也都可以被大家看到。</p>
        </Reveal>

        <div className="tickets-grid">
          {journey.friends.map((friend) => (
            <FriendTicket
              key={friend.id}
              friend={friend}
              active={friend.id === openFriendId}
              onOpen={() => toggleFriend(friend.id)}
            />
          ))}
        </div>

        {openFriend ? <LetterPanel key={openFriend.id} friend={openFriend} /> : (
          <p className="letters-hint"><span aria-hidden="true">↑</span> 先挑一封信拆开看看</p>
        )}
      </section>

      <DoodleDivider symbol="✦" />

      <section className="closing-section journal-column">
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
              <p className="section-kicker">LAST PAGE · FOR NOW</p>
              <h2>这一页先写到这里。</h2>
              <p>{journey.closing}</p>
              <span>谢谢你们。以后也要常见面。</span>
            </div>
          </PaperShape>
        </Reveal>
      </section>

      <footer>
        <span>2025.10.10</span>
        <b aria-hidden="true">♡</b>
        <span>2026.06.05</span>
      </footer>
    </main>
  );
}

export default App;
