export function StaticCareerJourney() {
  const nodes = [
    { x: 42, label: '2025.10.10' },
    { x: 248, label: '2025.12' },
    { x: 458, label: '2026.03' },
    { x: 670, label: '2026.06.05' },
  ];

  return (
    <svg className="career-journey-static" viewBox="0 0 720 220" aria-hidden="true">
      <g opacity="0.42">
        <path d="M76 82 h42 v28 h-42z M84 92 h25 M84 101 h18" />
        <path d="M178 54 h34 v42 h-34z M184 83 l8 -10 7 7 6 -8" />
        <path d="M298 96 h48 v22 h-48z M298 107 a5 5 0 0 0 0 -10 M346 97 a5 5 0 0 0 0 10 M312 103 h20" />
        <path d="M410 62 l52 -6 -2 17 -48 4z" />
        <path d="M552 88 l8 -17 8 17 18 2 -13 11 4 18 -17 -9 -16 9 4 -18 -13 -11z" />
        <path d="M630 54 h38 v26 h-38z M637 64 h23 M637 72 h15" />
        <path d="M58 126 h38 v22 h-38z M58 126 l19 15 19 -15 M58 148 l15 -12 M96 148 l-15 -12" />
        <path d="M250 112 l42 -18 -14 26 -8 -11 -10 10z M270 109 l22 -15" />
        <path d="M374 112 h28 v32 h-28z M383 112 l2 -8 h7 l2 8 M381 126 h15 M381 135 h11" />
        <path d="M486 112 h38 v26 h-38z M496 112 l5 -7 h13 l5 7 M506 125 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0" />
        <path d="M604 126 l3 20 h20 l3 -20z M601 120 h32 M614 114 q5 -7 10 0" />
        <path d="M668 116 a18 12 0 1 0 1 0 M661 116 a8 5 0 1 0 1 0 M641 104 v26 M637 104 h8 M692 103 v27 M688 108 l8 -5" />
      </g>
      <path d="M10 170 C150 168 260 173 392 170 S590 172 710 170" />
      {nodes.map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy="148" r="13" />
          <path d={`M${node.x - 7} 143 l4 3 M${node.x + 7} 143 l-4 3 M${node.x - 5} 161 v8 M${node.x + 5} 161 v8`} />
          <text x={node.x} y="198">{node.label}</text>
        </g>
      ))}
      <g transform="translate(120 124)">
        <circle cx="0" cy="0" r="15" />
        <circle cx="-9" cy="-12" r="4" />
        <circle cx="9" cy="-12" r="4" />
        <path d="M0 15 v24 M0 22 l-14 8 M0 22 l14 -8 M0 39 l-11 14 M0 39 l12 13" />
      </g>
      <text x="360" y="214">从 2025.10.10 到 2026.06.05，把 239 天慢慢画进时间轴里。</text>
    </svg>
  );
}
