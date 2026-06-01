import { useEffect, useState } from 'react';
import { AnimatedIcon, type CraftIconName } from './AnimatedIcon';

export interface ProgressSection {
  id: string;
  label: string;
  icon: CraftIconName;
}

export function ScrollProgressTrack({ sections }: { sections: ProgressSection[] }) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      let active = sections[0]?.id ?? '';
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.38) active = id;
      });
      setActiveId(active);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sections]);

  return (
    <nav className="scroll-progress" aria-label="页面阅读进度">
      <span className="scroll-progress-mobile" style={{ transform: `scaleX(${progress})` }} />
      <div className="scroll-progress-desktop">
        <span className="scroll-progress-line" />
        <span className="scroll-progress-fill" style={{ transform: `scaleY(${progress})` }} />
        {sections.map((section, index) => {
          const active = section.id === activeId;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`scroll-progress-node ${active ? 'is-active' : ''}`}
              style={{ top: `${index / Math.max(1, sections.length - 1) * 100}%` }}
              aria-current={active ? 'location' : undefined}
            >
              <AnimatedIcon name={section.icon} trigger={active ? 'loop' : 'none'} size={17} />
              <span>{section.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

