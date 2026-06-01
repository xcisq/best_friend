export function CraftFilterDefs() {
  return (
    <svg className="craft-filter-defs" aria-hidden="true">
      <defs>
        <filter id="craft-soft-wobble" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="craft-crayon-grain" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.9" />
        </filter>
      </defs>
    </svg>
  );
}

