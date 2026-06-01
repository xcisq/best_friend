const SECTION_WIDGETS = {
  journey: [
    { tone: 'warm', text: '路线', meta: '10.10' },
    { tone: 'mint', text: '午饭', meta: 'daily' },
    { tone: 'blue', text: '工位', meta: 'side by side' },
  ],
  letters: [
    { tone: 'pink', text: '信封', meta: 'open slowly' },
    { tone: 'warm', text: '贴纸', meta: 'for you' },
    { tone: 'mint', text: '回信', meta: 'keep' },
  ],
  closing: [
    { tone: 'blue', text: '收好', meta: '06.05' },
    { tone: 'pink', text: '常见', meta: 'afterwards' },
    { tone: 'warm', text: '再写', meta: 'next page' },
  ],
} as const;

export function SectionWidgetSprinkles({ variant }: { variant: keyof typeof SECTION_WIDGETS }) {
  return (
    <div className={`section-widget-sprinkles section-widget-sprinkles-${variant}`} aria-hidden="true">
      {SECTION_WIDGETS[variant].map((item, index) => (
        <span key={item.text} className={`section-widget-chip section-widget-chip-${item.tone} section-widget-chip-${index + 1}`}>
          <b>{item.text}</b>
          <small>{item.meta}</small>
        </span>
      ))}
      <i className="section-widget-line section-widget-line-one" />
      <i className="section-widget-line section-widget-line-two" />
    </div>
  );
}
