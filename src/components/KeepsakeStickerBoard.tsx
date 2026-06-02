const KEEPSAKE_STICKERS = [
  { icon: '❄', title: '北京初雪', note: '12.12', tone: 'sky' },
  { icon: '♫', title: '嗨唱起来', note: 'KTV', tone: 'pink' },
  { icon: '♨', title: '水裹汤泉', note: '02.06', tone: 'mint' },
  { icon: '♡', title: '团团叔', note: '03.17', tone: 'butter' },
  { icon: '⚡', title: '魔法酒吧', note: '01.30', tone: 'lavender' },
  { icon: '☼', title: '自驾露营', note: '05.30', tone: 'apricot' },
] as const;

export function KeepsakeStickerBoard() {
  return (
    <section className="keepsake-sticker-board" aria-label="沿途收藏的纪念贴纸">
      <div className="keepsake-sticker-heading">
        <p>POCKET OF KEEPSAKES</p>
        <h3>沿途捡到的小小纪念</h3>
        <span>有些瞬间适合写成长长的段落，也有些只要看到一枚贴纸，就会立刻想起来。</span>
      </div>
      <div className="keepsake-sticker-grid">
        {KEEPSAKE_STICKERS.map((item, index) => (
          <span
            key={item.title}
            className={`keepsake-sticker keepsake-sticker-${item.tone} keepsake-sticker-${index + 1}`}
          >
            <i aria-hidden="true">{item.icon}</i>
            <b>{item.title}</b>
            <small>{item.note}</small>
          </span>
        ))}
      </div>
    </section>
  );
}
