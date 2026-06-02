const PAGE_KEEPSAKES = [
  { className: 'page-keepsake-stamp', label: 'FIRST MEET', text: '初识' },
  { className: 'page-keepsake-clip', label: 'DESK', text: '换工位' },
  { className: 'page-keepsake-tab', label: 'SING', text: 'Coco' },
  { className: 'page-keepsake-photo', label: 'TRIP', text: '百里画廊' },
  { className: 'page-keepsake-ticket', label: 'TEAM', text: '团建' },
  { className: 'page-keepsake-pin', label: 'KEEP', text: '常见' },
] as const;

export function PageKeepsakes() {
  return (
    <div className="page-keepsakes" aria-hidden="true">
      {PAGE_KEEPSAKES.map((item) => (
        <span key={item.className} className={`page-keepsake ${item.className}`}>
          <small>{item.label}</small>
          <b>{item.text}</b>
        </span>
      ))}
    </div>
  );
}
