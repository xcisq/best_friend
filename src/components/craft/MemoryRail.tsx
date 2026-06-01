import { useEffect, useRef, useState } from 'react';
import { useCraftMotion } from './useCraftMotion';
import { usePageVisible } from './usePageVisible';

function drawRail(context: CanvasRenderingContext2D, width: number, height: number, phase: number) {
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  context.clearRect(0, 0, width * ratio, height * ratio);
  context.save();
  context.scale(ratio, ratio);
  context.lineCap = 'round';
  context.lineJoin = 'round';

  const baseline = height - 38;
  context.strokeStyle = 'rgba(118, 81, 62, 0.72)';
  context.lineWidth = 1.6;
  context.beginPath();
  context.moveTo(12, baseline);
  for (let x = 12; x <= width - 12; x += 18) {
    context.lineTo(x, baseline + Math.sin(x * 0.08 + phase) * 1.2);
  }
  context.stroke();

  for (let x = 20; x <= width - 20; x += 22) {
    const grass = 5 + (x % 4);
    context.beginPath();
    context.moveTo(x, baseline);
    context.lineTo(x + Math.sin(x) * 2, baseline - grass);
    context.stroke();
  }

  const nodes = [
    { ratio: 0.08, label: '相遇', color: '#d98565' },
    { ratio: 0.36, label: '熟悉', color: '#97b6a4' },
    { ratio: 0.66, label: '日常', color: '#a9bdd9' },
    { ratio: 0.92, label: '珍藏', color: '#dfb7b0' },
  ];
  nodes.forEach((node, index) => {
    const x = width * node.ratio;
    const y = baseline - 15 - Math.sin(phase + index) * 2;
    context.fillStyle = node.color;
    context.beginPath();
    context.arc(x, y, 7, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = 'rgba(118, 81, 62, 0.78)';
    context.stroke();
    context.fillStyle = '#76513e';
    context.font = '13px "Patrick Hand", cursive';
    context.textAlign = 'center';
    context.fillText(node.label, x, baseline + 23);
  });

  const handX = width * 0.53 + Math.sin(phase * 0.65) * width * 0.28;
  context.fillStyle = '#76513e';
  context.font = '22px "Patrick Hand", cursive';
  context.fillText('♡', handX, baseline - 44 - Math.sin(phase) * 5);
  context.restore();
}

export function MemoryRail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useCraftMotion();
  const pageVisible = usePageVisible();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible || !pageVisible || reducedMotion) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let animation = 0;
    let phase = 0;
    const render = () => {
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.round(rect.width * ratio);
      const nextHeight = Math.round(rect.height * ratio);
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
      phase += 0.025;
      drawRail(context, rect.width, rect.height, phase);
      animation = requestAnimationFrame(render);
    };
    animation = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animation);
  }, [pageVisible, reducedMotion, visible]);

  return (
    <div ref={rootRef} className="memory-rail" aria-label="一起走过的回忆轨道">
      <canvas ref={canvasRef} aria-hidden="true" />
      <svg className="memory-rail-static" viewBox="0 0 720 150" aria-hidden="true">
        <path d="M16 104 C140 101 264 106 390 103 S590 106 704 103" />
        {[80, 260, 470, 650].map((x, index) => <circle key={x} cx={x} cy={86} r="7" className={`memory-dot memory-dot-${index + 1}`} />)}
        <text x="80" y="132">相遇</text><text x="260" y="132">熟悉</text><text x="470" y="132">日常</text><text x="650" y="132">珍藏</text>
      </svg>
      <p>把散落的小事，慢慢收进同一条路里。</p>
    </div>
  );
}
