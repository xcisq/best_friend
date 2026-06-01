import { AnimatedIcon, CraftCursor, CraftFilterDefs, CraftLine, CraftPattern, CraftShape, CraftThemePanel, useCraftPatternBackground } from './components/craft';
import { CraftMotionProvider } from './components/craft/CraftMotionProvider';

const shapes = [
  ['blob', '#f4d7b2'],
  ['rounded-rect', '#d7e7db'],
  ['circle', '#f1d4d0'],
  ['triangle', '#e9d98f'],
  ['star', '#d9d7eb'],
] as const;

export function CraftUiShowcase() {
  const backgroundImage = useCraftPatternBackground({ pattern: 'cross', colors: ['#d98565'], tileSize: 24 });
  return (
    <CraftMotionProvider>
      <main className="craft-ui-showcase">
        <CraftFilterDefs />
        <header className="craft-ui-hero">
          <p>CRAFT UI · LOCAL LAB</p>
          <h1>把网页做成一本<br /><span>可以翻动的手帐。</span></h1>
          <AnimatedIcon name="sparkle" trigger="loop" lordiconSrc="/icons/lordicon-sparkle.json" />
          <a href="/">返回纪念页</a>
        </header>

        <div className="craft-ui-layout">
          <div className="craft-ui-sections">
            <section className="craft-ui-card" style={{ backgroundImage }}>
              <h2>CraftShape <small>有机形状</small></h2>
              <div className="craft-ui-shape-grid">
                {shapes.map(([type, color], index) => (
                  <figure key={type}>
                    <CraftShape type={type} fillColor={color} fillStyle="crayon" seed={index + 4} roughness={2.4} erosion={index === 0 ? 4 : 0} morphTo={index === 0 ? 'star' : undefined} idleMotion={index === 4 ? 'twinkle' : 'none'} />
                    <figcaption>{type}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="craft-ui-card">
              <h2>CraftLine <small>装饰线条</small></h2>
              <div className="craft-ui-line-list">
                <CraftLine type="line" animate />
                <CraftLine type="arc" strokeColor="#d98565" />
                <CraftLine type="wave" strokeColor="#8aaf9e" frequency={5} roughness={1.8} animate />
                <CraftLine type="circle" strokeColor="#a9bdd9" start={0.08} end={0.92} />
                <CraftLine type="freehand" strokeColor="#dfb7b0" points={[{ x: 2, y: 30 }, { x: 45, y: 15 }, { x: 92, y: 27 }, { x: 138, y: 11 }, { x: 178, y: 25 }]} />
              </div>
            </section>

            <section className="craft-ui-card">
              <h2>CraftPattern <small>受控随机纹样</small></h2>
              <div className="craft-ui-pattern-grid">
                <CraftPattern id="dots-demo" colors={['#d98565', '#e6c984']} scatter={0.8} />
                <CraftPattern id="cross-demo" pattern="cross" colors={['#97b6a4', '#a9bdd9']} tileOffset={8} />
                <CraftPattern id="symbol-demo" pattern="symbol" colors={['#dfb7b0', '#e6c984']} scatter={0.65} />
              </div>
            </section>

            <CraftCursor items={['✦', '♡', '﹏', '花']}>
              <section className="craft-ui-card craft-ui-cursor-demo">
                <h2>CraftCursor <small>局部 Trail Cursor</small></h2>
                <p>把光标移进来，留下几笔轻轻的轨迹。</p>
              </section>
            </CraftCursor>
          </div>

          <aside>
            <CraftThemePanel />
          </aside>
        </div>
      </main>
    </CraftMotionProvider>
  );
}
