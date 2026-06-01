# Craft UI 组件路线与 Prompt

> `/ui` 示例页只作为参考，不存在公开组件库。
>
> `paper-shape` 继续直接复用 [craft-paper](https://github.com/SuneBear/craft-paper) 开源源码。

## 1. 组件边界

```text
src/components/
├── paper-shape/                 # 直接复用 craft-paper
└── craft/                       # 本项目自研 Craft UI 基础层
```

- `PaperShape`：纸张语义、折角、裁缺、票券和内容安全区。
- `CraftShape`：通用有机图形、彩铅填充、Morph 和动态装饰。
- 新组件先解决当前页面问题，再扩展通用 API。

### 1.1 当前实现状态

- 已完成本地 `/ui` 展示页，可直接检查首版组件和 Theme Panel。
- `CraftShape` 已支持受控随机 Path、彩铅滤镜、Idle Motion、边缘裁缺 Mask 和兼容形状间的 Morph。
- `CraftLine` 已支持直线、拱形、波浪、圆弧与 `perfect-freehand` 自由手绘线。
- `CraftPattern` 已支持颜色数组随机 Pick、Scatter、自定义 SVG Tile 和 CSS Background Hook。
- `CraftCursor` 已支持基于 Simplex Noise 的局部 Trail 与点击粒子。
- `CraftThemePanel` 已支持主题、圆角、线宽、材质透明度和动画强度调整。
- Lordicon 当前提供本地 JSON 示例和 Phosphor 静态回退；复杂 Lottie 播放器仍是后续增强项。

## 2. `CraftShape`

支持形状：

- Blob
- 矩形
- 圆角矩形
- 圆与椭圆
- 三角形
- 多边形
- 五角星、六角星与更多星形

核心属性：

```ts
interface CraftShapeProps {
  type: 'blob' | 'rect' | 'rounded-rect' | 'circle' | 'ellipse' | 'polygon' | 'star';
  width: number;
  height: number;
  seed?: number;
  roughness?: number;
  bowing?: number;
  fillStyle?: 'solid' | 'crayon' | 'chalk' | 'dry-brush' | 'image';
  idleMotion?: 'none' | 'float' | 'swing' | 'spin' | 'twinkle';
  erosion?: number;
  morphTo?: CraftShapeProps['type'];
  morphDuration?: number;
}
```

实现要求：

- 使用 `perfect-freehand` 模拟压感。
- Path 根据容器尺寸与参数动态生成。
- 使用普通 DOM 容器包裹 SVG，支持响应式布局。
- 支持形状 Morph。
- 首版使用受控随机 SVG Mask 制造边缘缺口；复杂 Boolean 运算和折角优先离线计算 Path。
- 滤镜、随机与 Motion 独立抽象，特殊形状也能复用。

## 3. `CraftLine`

线条类型：

- 直线
- 拱形曲线
- 波浪线
- 圆弧
- 外部 Points 传入的不规则线

能力：

- 长度、角度、粗细、颜色。
- `strokeDasharray`。
- 描边绘制动画。
- 波浪频率与峰值 Noise。
- 圆弧起止点。
- 手绘模式：收集 Points 后保存为可复用配置。
- 使用 `viewBox + preserveAspectRatio` 适配文字下划线等响应式场景。

## 4. `CraftPattern`

Pattern 类型：

- Dot
- Circle
- Cross
- Memphis
- Symbol
- 自定义 SVG Tile

核心参数：

- 背景色。
- 填充颜色或颜色数组随机 Pick。
- 线宽与线条颜色。
- Tile 尺寸、间距、偏移和朝向。
- `randomness`：属性偏差强度。
- `scatter`：有机散点分布强度。
- 自定义 SVG Tile。
- 可作为独立 SVG、SVG `<pattern>` Ref 或 CSS Background 使用。

## 5. `CraftCursor`

- 局部 Trail Cursor，只在指定区域启用。
- 支持文字、Emoji、Phosphor Icon 与自定义内容。
- 点击效果支持预置粒子。
- 引入 Simplex Noise 与 Spring Easing 提升自然感。
- 禁止覆盖系统焦点反馈。
- 移动端与 reduced-motion 下关闭。

## 6. `CraftThemePanel`

实时调整：

- 主题预设。
- 主色、辅色、纸张色与墨线色。
- 圆角与圆角扰动。
- 线宽与线宽偏差。
- 材质透明度。
- 彩铅滤镜强度。
- 动画强度。

首版只在开发与展示页使用，不进入纪念页正式 UI。

## 7. Helper 与 Utils

- `createSeededNoise(seed)`：可复现随机。
- `createHandDrawnPath(points, options)`：封装 `perfect-freehand`。
- `createScatterLayout(options)`：生成 Pattern、贴纸和粒子的有机分布。
- `CraftFilterDefs`：集中注册纸张颗粒、彩铅、墨水洇染和轻抖动滤镜。
- `CraftMotionProvider`：统一处理动画强度、视口暂停和 reduced-motion。
- Boolean 运算工具：处理边缘缺口、折角和残缺填充，优先离线计算 Path。

## 8. 图标策略

- 静态图标使用 `@phosphor-icons/react`。
- 优先使用 `fill / duotone / bold` 模式。
- 动态图标使用 Lordicon，但 JSON 资源必须本地化。
- 禁止运行时请求外部 CDN。
- 高频小动画优先 CSS 或 SVG。
- 复杂图标才使用 Lottie。
- 动态图标不能承担唯一信息表达。
- 每个动态图标必须提供 reduced-motion 静态回退。

## 9. 职业回顾网页生成 Prompt

```md
参考我提供的职业回顾材料，为我生成一个中文职业回顾页面。

设计风格参考 `craft-ui-spec.md`，并参考：
- https://work-journey.sunebear.com/
- https://work-journey.sunebear.com/ui

执行顺序：
1. 先分析材料，列出仍不明确的需求。
2. 遇到不明确的需求时，不要直接编码，先向我提出问题或建议。
3. 生成一份详细实施 Plan，写入 `README.md`。
4. 我确认 Plan 后再开始编码。
5. 每完成一个阶段，更新 README 中的完成状态和验证记录。

工程约束：
- 界面语言使用中文。
- 单个源码文件超过 500 行时，必须拆分为多个模块。
- 优先使用 React + TypeScript。
- 主题、字体、颜色、线宽、圆角、材质与动画强度使用 Token 管理。
- 页面内容和页面组件分离，职业经历写入独立数据文件。
- 动画必须支持 `prefers-reduced-motion`。
- Canvas、物理动画与粒子离开视口后暂停。
- 禁止新增隐式网络请求、遥测、登录、CMS 或后端。

视觉要求：
- 使用温暖、自然、童趣的手帐风。
- Logo 和大标题使用文心喜乐体 `xile`。
- 小标题和正文使用素材集市康康体 `kangkang`。
- UI 元素使用手写卡通字体。
- 使用奶油纸、深棕墨线、低饱和彩铅与轻微不规则纸片。
- 使用 `PaperShape` 作为纸张语义容器。
- 动态效果要克制，重点突出一处特色互动。

组件要求：
- 优先复用 `craft-paper` 开源仓库中的 `src/components/paper-shape`。
- `/ui` 页面中的 Craft UI 组件没有开源源码，只能作为交互与视觉参考。
- 对缺失组件进行自研时，先实现当前页面真正需要的最小能力，再抽象通用 API。

验证要求：
- 运行 lint、TypeScript 检查和生产构建。
- 检查桌面端与 375px 移动端。
- 检查键盘操作、可见焦点与 reduced-motion。
- 检查动画离屏暂停。
```

## 10. Craft UI 组件实现 Prompt

```md
请根据 `craft-ui-spec.md` 实现一个可复用 Craft UI 组件。

开始前：
1. 说明它解决的页面问题。
2. 检查是否可以复用 `PaperShape` 或已有 Craft UI Utils。
3. 给出 Props、响应式规则、reduced-motion 行为和性能边界。
4. 如果实现会让单文件超过 500 行，先拆分模块。

实现原则：
- 参考 Rough.js 的不规则感，但不要做成黑白素描。
- 轮廓使用 `perfect-freehand` 或受控随机 Path。
- 填充要有彩铅颗粒、低透明度叠层和局部残缺。
- 随机细节必须由 seed 控制，跨帧稳定。
- 滤镜、Noise、Motion 与路径生成器分别抽象，避免组件互相耦合。
- 动画离开视口后暂停。
- reduced-motion 下保留静态可读版本。
```

## 11. 照片转插图 Prompt

```md
将输入人物照片转换为自然童趣的手帐插图。

保留人物可识别的发型、五官比例、服饰和姿态。
轮廓使用 6B Pencil 与 Technical Pen 的轻微不均匀线稿。
填充使用 Dry Brush、Crayon、Chalk，保留低透明度叠层、彩铅颗粒和局部留白。
背景使用少量 Charcoal 与 Noise Brush，不要复杂场景。
整体采用低饱和暖色，并允许替换为海洋蓝、自然绿或冰雪白主题。

禁止：
- 照片级写实
- 光滑矢量描边
- 3D 塑料质感
- 过度锐利边缘
- 复杂背景
- 高饱和霓虹色
```

## 12. 角色设定图 Prompt

```md
基于同一人物插图生成统一比例的角色设定图：
- 正面
- 左侧面
- 右侧面
- 背面
- 站立
- 挥手
- 走路
- 拖动
- 庆祝
- 困倦

保持服装、发型、线稿粗细、色板和留白方式一致。
使用白色或透明背景，角色之间留足裁切空间，不增加文字。
```

## 13. 精灵图 Prompt

```md
将角色整理为透明背景精灵图。

每行动作固定一行，每帧尺寸完全一致：
- idle
- wave
- walk
- dragging
- celebrate
- sleepy

保持脚底基线一致。
动作幅度自然克制。
适合 6 到 10 FPS 循环播放。
避免帧之间服饰、发型、色板和身体比例漂移。
```
