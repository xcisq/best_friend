const LORDICON_ITEMS = [
  { name: 'badge', label: '第一天', color: '#a15f47' },
  { name: 'chat', label: '常聊天', color: '#8aaf9e' },
  { name: 'note', label: '小便签', color: '#76513e' },
  { name: 'folder', label: '存回忆', color: '#c89a4c' },
  { name: 'coffee', label: '午饭后', color: '#d98565' },
  { name: 'pencil', label: '写给你', color: '#9b7ab4' },
  { name: 'calendar', label: '10.10', color: '#8aaf9e' },
  { name: 'desk', label: '工位边', color: '#76513e' },
  { name: 'heart', label: '想念值', color: '#d98565' },
  { name: 'camera', label: '拍下来', color: '#68a9c6' },
] as const;

const POSTMARK_ITEMS = [
  { title: 'FROM 14F', note: 'first desk', tone: 'warm' },
  { title: 'LUNCH CLUB', note: 'daily pass', tone: 'mint' },
  { title: 'AFTER WORK', note: 'keep talking', tone: 'pink' },
  { title: 'NO. 239', note: 'days together', tone: 'gold' },
  { title: 'FOR YOU', note: 'open slowly', tone: 'blue' },
  { title: '06.05 SAVE', note: 'see you soon', tone: 'warm' },
] as const;

function LordiconGlyph({ name, color }: { name: string; color: string }) {
  if (name === 'chat') {
    return <path d="M11 20h18v12H18l-7 6v-6H6V20h5Zm20-8h21v14h-7v6l-7-6h-7V12Z" />;
  }
  if (name === 'note') {
    return <path d="M16 10h30l6 7v37H16V10Zm8 13h20M24 31h20M24 39h14" />;
  }
  if (name === 'folder') {
    return <path d="M7 22h19l5 7h26L49 52H8L7 22Z" />;
  }
  if (name === 'trash') {
    return <path d="M21 20h22l-2 31H23L21 20Zm-3-6h28M27 14l3-5h6l3 5M29 26v18M35 26v18" />;
  }
  if (name === 'pencil') {
    return <path d="M18 45 15 54l9-3 26-26-6-6L18 45Zm23-29 4-4 6 6-4 4" />;
  }
  if (name === 'coffee') {
    return <path d="M18 22h26l-3 26H21L18 22Zm26 6h6c4 0 5 4 3 7-2 3-5 4-10 4M20 16h23M27 10c-3 3-3 5 0 8M36 10c-3 3-3 5 0 8" />;
  }
  if (name === 'calendar') {
    return <path d="M15 16h34v34H15V16Zm0 10h34M23 10v10M41 10v10M23 34h6M35 34h6M23 42h6M35 42h6" />;
  }
  if (name === 'desk') {
    return <path d="M12 22h40v21H12V22Zm6 21v9M46 43v9M20 16h24M24 29h16M24 36h10" />;
  }
  if (name === 'heart') {
    return <path d="M32 51C20 41 14 35 14 26c0-6 4-10 10-10 4 0 7 2 8 5 1-3 4-5 8-5 6 0 10 4 10 10 0 9-6 15-18 25Z" />;
  }
  if (name === 'camera') {
    return <path d="M14 23h36v26H14V23Zm10 0 4-7h10l4 7M32 31a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM20 30h5" />;
  }
  return <path d="M21 14h22v34H21V14Zm7 0 2-6h6l2 6M27 29h11M27 37h8" stroke={color} />;
}

export function LordiconMotionStrip() {
  return (
    <div className="lordicon-motion-strip" aria-label="实习纪念动图标组件">
      <p>239 天里反复出现的小图标</p>
      <div>
        {LORDICON_ITEMS.map((item, index) => (
          <span key={item.name} className={`lordicon-motion lordicon-motion-${index + 1}`} title={item.label}>
            <svg viewBox="0 0 64 64" role="img" aria-label={item.label}>
              <g fill="none" stroke={item.color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <LordiconGlyph name={item.name} color={item.color} />
              </g>
            </svg>
            <em>{item.label}</em>
          </span>
        ))}
      </div>
    </div>
  );
}

export function ThoughtBubbleCluster() {
  return (
    <div className="thought-bubble-cluster" aria-hidden="true">
      <span className="thought-bubble thought-bubble-small" />
      <span className="thought-bubble thought-bubble-mid" />
      <div className="thought-bubble thought-bubble-main">
        <span>想到你们，就会冒出好多小气泡</span>
      </div>
      <b className="bubble-badge bubble-badge-green">午饭</b>
      <b className="bubble-badge bubble-badge-pink">工位</b>
      <b className="bubble-badge bubble-badge-orange">下班</b>
      <b className="bubble-badge bubble-badge-blue">六封信</b>
    </div>
  );
}

export function StarScatterLayer() {
  return (
    <div className="star-scatter-layer" aria-hidden="true">
      {Array.from({ length: 26 }, (_, index) => (
        <span key={index} className={`star-scatter star-scatter-${index % 7}`} />
      ))}
    </div>
  );
}

export function MemoryMotionLayer() {
  return (
    <div className="memory-motion-layer" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span key={`scrap-${index}`} className={`motion-scrap motion-scrap-${index % 6}`} />
      ))}
      {Array.from({ length: 8 }, (_, index) => (
        <i key={`trail-${index}`} className={`motion-trail motion-trail-${index % 4}`} />
      ))}
    </div>
  );
}

export function PostmarkDriftLayer() {
  return (
    <div className="postmark-drift-layer" aria-hidden="true">
      {POSTMARK_ITEMS.map((item, index) => (
        <span
          key={item.title}
          className={`postmark-stamp postmark-stamp-${index + 1} postmark-stamp-${item.tone}`}
        >
          <i className="postmark-ring" />
          <b>{item.title}</b>
          <small>{item.note}</small>
        </span>
      ))}
    </div>
  );
}
