const SECTION_WIDGETS = {
  journey: [
    { tone: 'warm', text: '初识', meta: '10.10' },
    { tone: 'mint', text: '换工位', meta: 'side by side' },
    { tone: 'blue', text: '团建', meta: 'together' },
  ],
  letters: [
    { tone: 'pink', text: '男妈妈', meta: 'reliable' },
    { tone: 'warm', text: '姑姑', meta: 'sing coco' },
    { tone: 'mint', text: '师傅', meta: 'star chart' },
  ],
  closing: [
    { tone: 'blue', text: '常联系', meta: 'afterwards' },
    { tone: 'pink', text: '一辈子', meta: 'best friends' },
    { tone: 'warm', text: '再见面', meta: 'next page' },
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
