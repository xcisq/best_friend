const PAGE_KEEPSAKES = [
  { className: 'page-keepsake-stamp', label: '239 DAYS', text: '2025.10.10' },
  { className: 'page-keepsake-clip', label: 'CLIP', text: '一起' },
  { className: 'page-keepsake-tab', label: 'TAB', text: 'part 01' },
  { className: 'page-keepsake-photo', label: 'PHOTO', text: 'lunch' },
  { className: 'page-keepsake-ticket', label: 'TICKET', text: 'after work' },
  { className: 'page-keepsake-tab page-keepsake-tab-right', label: 'TAB', text: 'letters' },
  { className: 'page-keepsake-pin', label: 'PIN', text: '♡' },
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
