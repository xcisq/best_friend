# Craft UI 与纪念手帐页升级总计划

> 更新日期：2026-06-01
>
> 状态：规划基线 v2.1
> 目标：先完成纪念手帐页体验升级，再将可复用能力沉淀为 Craft UI 基础库。

## 1. 项目定位

本项目是一张写给第一段实习里朋友们的纪念手帐网页，不是职业作品集，也不是组件陈列页。

整体采用自然童趣的暖色手帐风：纸张、胶带、折角、订书钉、彩铅颗粒和少量动态装饰共同营造“亲手做出来”的质感。所有增强效果必须服务于阅读节奏，不能盖过六封信本身。

采用双层路线：

1. 优先升级当前纪念页，加入可感知但克制的特色互动。
2. 同步沉淀可复用的 Craft UI 基础层，便于后续快速风格化已有网页。
3. 先使用矢量拖动小手建立第一屏记忆点，再接入小女孩 IP 与逐帧动画。
4. 纵向时间线继续承担正文叙事；横版职业旅程场景作为可独立复用的复杂示例组件。

详细附录：

- [横版职业旅程场景规格](./craft-ui-career-journey-scene-spec.md)
- [Craft UI 组件路线与 Prompt](./craft-ui-component-roadmap-and-prompts.md)

## 2. 参考资料与确认结论

### 2.1 参考资料

- [职业时间线参考页](https://work-journey.sunebear.com/)
- [Craft UI 示例页](https://work-journey.sunebear.com/ui)
- [craft-paper 开源仓库](https://github.com/SuneBear/craft-paper)
- 当前本地 React / Vite 项目

### 2.2 已确认的源码边界

`craft-paper` 使用 MIT License，当前尚未发布 npm 包。上游 README 推荐按源码复制方式接入：

```text
src/components/paper-shape
```

当前项目已经复制并使用这一目录，同时保留许可证文本：

```text
LICENSE.craft-paper
```

可以直接复用的上游能力：

- `PaperShape`
- `PaperShapeSplitContent`
- `PosterTitle`
- `createDecoration`
- 纸张预设、纹理、折角、裁缺、缝线、胶带、订书钉和贴纸
- 受控随机、安全内边距与响应式容器能力

不直接复制的上游内容：

- Demo 路由
- Supabase 集成
- 在线编辑器
- 分享与导出页面
- shadcn 页面层
- 装饰编辑 UI
- `react-moveable` 交互依赖

### 2.3 `/ui` 页面使用规则

`https://work-journey.sunebear.com/ui` 展示了完整的 Craft UI 方向，但对应源码没有开源仓库。因此：

- `/ui` 只作为视觉语言、组件 API 和交互效果参考。
- 不直接复制网页压缩后的构建产物。
- `CraftShape / CraftLine / CraftPattern / CraftCursor / CraftThemePanel` 需要在本项目中重新设计和实现。
- 每个新组件先围绕纪念页真实需求实现最小闭环，再扩展为通用 API。
- 单文件 `500` 行限制适用于本项目自研源码。`paper-shape` 是上游源码镜像，优先保持可同步性；如需拆分，必须先在上游仓库完成再同步回来。

## 3. 当前页面状态

### 3.1 已有能力

- `PaperShape` 纸张语义容器。
- 不规则纸张边缘、折角、胶带、订书钉和贴纸。
- Hero、共同经历、纵向时间线、六封信与结尾。
- 六封信单封展开：任意时刻只打开一封。
- 基础 Reveal、信件展开与少量 CSS 动画。
- 初版 `StickyHand`、`ScrollProgressTrack`、`MemoryRail`。
- 初版动效基础层：
  - `CraftMotionProvider`
  - `MotionPrimitives`
  - `AnimatedIcon`
  - `GridFrameAnimation`
  - `CraftFilterDefs`

### 3.2 已知不足

- `StickyHand` 已按参考交互模型重写，但仍需要桌面端人工验收拖动手感、边缘吸附和拉力解除阈值。
- `MemoryRail` 已由模块化 `CareerJourneyScene` 替代，但仍需要桌面端人工验收 Canvas 场景节奏与倒流循环。
- 字体资产目录目前只有 `Patrick Hand`，尚未接入 `Xile` 与 `KangKang` 文件。
- 常规图标已接入 Phosphor Icons，并提供本地 Lordicon JSON 示例与静态回退；复杂 Lordicon 动画播放器仍是后续增强项。
- `CraftShape / CraftLine / CraftPattern / CraftCursor / CraftThemePanel` 已完成可运行首版，后续继续补齐高级 API 与编辑工具。

## 4. 视觉规范

### 4.1 视觉命题

温暖的实习纪念手帐：奶油纸底、深棕墨线、低饱和彩铅、轻微错位的纸片和照片，以及一处让人记住的物理互动。动态效果像翻动手帐时偶然碰到的小机关，不像游戏 HUD。

### 4.2 字体系统

| 场景 | 字体角色 | CSS 字体族 | 字重与规则 |
| --- | --- | --- | --- |
| Logo、大标题 | 文心喜乐体 | `xile` | 默认 `400`；允许多色分词、低强度描边与轻微错位 |
| 小标题、卡片标题、正文 | 素材集市康康体 | `kangkang` | 默认 `400`；强调时可模拟 `700`，避免连续大段粗体 |
| UI 元素、按钮、短标签 | 手写卡通字体 | `var(--font-ui-hand)` | 用于短文本；首版可回退 `Patrick Hand` 与中文手写字体 |
| 日期、元信息 | 手写等宽感字体 | `var(--font-meta)` | 英文优先 `Patrick Hand`，中文回退系统等宽或手写字体 |

字体接入要求：

1. `Xile` 与 `KangKang` 字体文件进入仓库前检查授权。
2. 字体文件统一放入 `public/fonts/`。
3. 使用 `@font-face` 与 `font-display: swap`。
4. 在字体文件尚未提供时，先保留字体族名称与回退栈，不伪造资源 URL。
5. 长信件正文需要实际浏览器校验；如果 `KangKang` 长文阅读密度过高，可在 Theme Token 中保留正文回退开关，但默认按 `KangKang` 执行。

建议 Token：

```css
--font-display: "xile", "文心喜乐体", "Kaiti SC", cursive;
--font-body: "kangkang", "素材集市康康体", "Kaiti SC", cursive;
--font-ui-hand: "Patrick Hand", "kangkang", "Kaiti SC", cursive;
--font-meta: "Patrick Hand", "LXGW WenKai Mono", monospace;
```

### 4.3 色彩系统

| Token | 默认值 | 用途 |
| --- | --- | --- |
| `--journal-paper` | `#FDF8F3` | 主纸张 |
| `--journal-ink` | `#2C1810` | 主墨线与正文 |
| `--journal-accent-1` | `#D4A574` | 牛皮纸与暖色强调 |
| `--journal-accent-2` | `#8B6F47` | 深咖啡色 |
| `--journal-highlight` | `#FFE4B5` | 柔黄高光 |
| `--craft-red` | `#E07A5F` | 陶土红 |
| `--craft-orange` | `#F2A65A` | 万寿菊橙 |
| `--craft-yellow` | `#F4E285` | 芥末黄 |
| `--craft-green` | `#8FB996` | 鼠尾草绿 |
| `--craft-blue` | `#81B5DB` | 天空蓝 |
| `--craft-purple` | `#B8A9C9` | 薰衣草紫 |

主题预设：

| 主题 | 气质 | 关键色 |
| --- | --- | --- |
| `journal-warm` | 默认暖色手帐 | 奶油纸、杏色、浅粉、薄荷绿 |
| `ocean-blue` | 海洋与贝壳 | 雾蓝、贝壳白、沙滩米色 |
| `forest-green` | 自然与干花 | 苔藓绿、木纹棕、干花黄 |
| `snow-white` | 冰雪与安静留白 | 冰雪白、浅灰蓝、低饱和粉紫 |

### 4.4 材质与笔刷

- 线稿与轮廓：`6B Pencil`、`Technical Pen`
- 填充：`Dry Brush`、`Crayon`、`Chalk`
- 背景和细节：`Charcoal`、`Noise Brush`
- 色彩融合：低透明度叠层与少量 `Smudge`

材质类型包括纸张、皮革、木纹、麻绳、石头、蕾丝与布艺、毛毡、叶脉与干花、贝壳与珍珠、陶土。

性能原则：

- 页面级纸张噪点和纤维纹理只渲染一次。
- 元素级优先依靠 SVG Path、Mask、ClipPath 和受控随机制造手绘感。
- 复杂材质作为可选 Overlay，不默认全开。
- 避免大量实时 `blur`、`drop-shadow` 和高频 SVG Filter 叠加。

## 5. 当前纪念页升级路线

### 5.1 第一阶段：高辨识度互动

#### A. `StickyHand` 完整重做

目标：按参考页的交互模型重写当前简化版小手，而不是继续微调现有实现。

物理规格：

- Hero 左上角悬挂矢量小手。
- 默认使用 20 段 Verlet 绳索。
- 绳长根据容器高度比例计算，支持响应式尺寸。
- 物理包含重力、阻尼、约束迭代与手部平滑旋转。
- 小手靠近边缘时可吸附，避免长期遮挡正文。
- 闲置时使用低频轻微晃动吸引注意。

交互区域：

- 顶部锚点可拖动调整悬挂位置。
- 绳索中段可拖动某个绳结。
- 绳索中段双击切换固定状态。
- 小手可拖动；轻点可切换固定状态。
- 拖动绳结超过拉力阈值时，小手可解除固定。

降级规则：

- 桌面端启用完整物理。
- 移动端隐藏，或改为静态悬挂装饰。
- `prefers-reduced-motion` 下使用静态 SVG。
- SVG 可见线条不接管指针事件，只让透明命中路径接收交互。

#### B. `ScrollProgressTrack`

- 桌面端：右侧手绘缝线式阅读进度条。
- 移动端：顶部细进度条。
- 标记开场、一起走过、六封信和结尾。
- 节点进入视口时高亮并轻微脉冲。
- 支持点击节点滚动到对应分区。

#### C. 图标与 Motion

- `AnimatedIcon` 封装 Phosphor Icons 与本地 Lordicon JSON。
- 六封信入口使用拆信、爱心、星光等一次性动效。
- `MotionPrimitives` 统一 `float / swing / spin / twinkle / pulse / squiggly / scratchy / reveal`。
- 所有 Motion Primitive 读取动画强度、页面可见状态、视口状态和 reduced-motion。

### 5.2 第二阶段：结尾场景

当前简版 `MemoryRail` 先保留为低成本结尾装饰，再逐步升级为 `CareerJourneyScene`。纪念页上线不依赖复杂场景完成。

- 桌面端使用 Canvas。
- 移动端使用静态 SVG。
- 场景进入视口时运行，离开视口或页面隐藏时暂停。
- 详细规格见 [横版职业旅程场景规格](./craft-ui-career-journey-scene-spec.md)。

### 5.3 第三阶段：小女孩 IP

1. 使用统一风格 Prompt 将照片转换为插图。
2. 产出正面、左右侧面、背面、表情、服饰和色板。
3. 制作 `idle / wave / walk / dragging / celebrate / sleepy` 精灵图。
4. 使用 `GridFrameAnimation` 接入资产，不在页面组件中写死角色状态。
5. 小女孩 IP 可以替换矢量小手，也可以作为横版旅程的角色节点。

## 6. Craft UI 基础库路线

目录策略：

```text
src/components/
├── paper-shape/                 # 直接复用 craft-paper，上游同步时谨慎处理
└── craft/                       # 本项目自研的 Craft UI 基础层
```

`PaperShape` 与 `CraftShape` 并行存在：

- `PaperShape`：承载纸张语义、折角、裁缺、票券和内容安全区。
- `CraftShape`：承载通用有机图形、彩铅填充、Morph 和动态装饰。

自研组件：

- `CraftShape`
- `CraftLine`
- `CraftPattern`
- `CraftCursor`
- `CraftThemePanel`

共享能力：

- `createSeededNoise(seed)`
- `createHandDrawnPath(points, options)`
- `createScatterLayout(options)`
- `CraftFilterDefs`
- `CraftMotionProvider`
- Boolean Path 运算工具

详细 API、图标策略和生成 Prompt 见 [Craft UI 组件路线与 Prompt](./craft-ui-component-roadmap-and-prompts.md)。

## 7. 实施顺序

### Phase 0：规划与资产

- [x] 确认 `craft-paper` 的 MIT 许可证与源码复制边界。
- [x] 记录 `/ui` 只作为参考，不存在公开组件库。
- [x] 写入总计划与详细附录。
- [ ] 获取并检查 `Xile` 与 `KangKang` 字体授权文件。
- [ ] 确认首版 UI 手写卡通字体。

### Phase 1：纪念页基础体验

- [x] 接入 `PaperShape`。
- [x] 接入 Hero、纵向时间线、六封信和结尾。
- [x] 保证六封信单封展开。
- [x] 接入初版动效基础层。
- [x] 按字体系统更新全局 Typography Token。
- [x] 使用 Phosphor Icons 替换首批占位图标。
- [x] 添加本地 Lordicon JSON 示例并验证静态回退。

### Phase 2：重做特色互动

- [x] 重写 `StickyHand` 物理模型。
- [x] 接入锚点、绳索中段与小手独立命中区域。
- [x] 接入边缘吸附、双击固定、拉力解除和平滑旋转。
- [x] 验证移动端降级。
- [x] 完善阅读进度条节点高亮与点击跳转。

### Phase 3：结尾场景

- [x] 保留简版 `MemoryRail` 作为过渡版本。
- [x] 新增 `CareerJourneyScene` 模块目录。
- [x] 完成轨道、时间轴、视差、角色、Boss 与信息卡。
- [x] 完成动物、种花、烟雾、未来区域和倒流循环。
- [x] 完成离屏暂停和静态 SVG 降级。

### Phase 4：Craft UI 通用组件

- [x] 实现 `CraftShape` 首版。
- [x] 实现 `CraftLine` 首版。
- [x] 实现 `CraftPattern` 首版与 CSS Background Hook。
- [x] 实现 `CraftCursor` 首版。
- [x] 实现 `CraftThemePanel` 首版。
- [x] 增加独立 `/ui` 展示页。
- [x] 增加 `CraftShape` Morph 与受控随机边缘裁缺 Mask。
- [x] 增加 `CraftLine` 自由手绘 Points、`CraftPattern` Scatter 与 CSS Background Hook。
- [x] 增加基于 Simplex Noise 的局部 Cursor Trail 与点击粒子。

### Phase 5：小女孩 IP

- [ ] 完成照片转插图。
- [ ] 完成角色设定图。
- [ ] 完成精灵图。
- [ ] 通过 `GridFrameAnimation` 接入纪念页。
- [ ] 评估替换矢量小手或横版场景小熊。

## 8. 性能与无障碍总规则

- 默认最多保留一个持续运行的特色动画区域。
- 绳索物理与 Canvas 仅桌面端启用。
- 物理、Canvas、视差、粒子和循环动画离开视口后暂停。
- `prefers-reduced-motion` 下关闭物理、粒子、视差和循环动画。
- 动画不得遮挡正文、按钮或焦点轮廓。
- 动态图标不承担唯一信息表达。
- 拖动小手属于增强效果，页面功能不依赖它。
- 所有按钮保留键盘操作、可见焦点和至少 `40px` 点击区域。
- 所有随机装饰使用确定性种子，禁止每帧闪烁。
- 图标、字体、IP 和 Lordicon JSON 使用本地资源，无新增隐式网络请求。

## 9. 验收清单

### 9.1 工程检查

- [x] `npm run lint`
- [x] `./node_modules/.bin/tsc -b`
- [x] `npm run build`
- [x] 自研源码文件不超过 `500` 行；`paper-shape` 上游镜像按源码边界检查

### 9.2 页面检查

- [ ] 桌面宽度布局
- [x] `375px` 移动端布局
- [x] Hero 标题、正文、按钮与元信息使用正确字体角色
- [x] 六封信只能展开一封
- [x] 六封信可以键盘操作
- [x] 焦点状态可见
- [ ] reduced-motion 下内容完整可读

### 9.3 `StickyHand` 检查

- [ ] 锚点可拖动
- [ ] 绳索中段可拖动
- [ ] 绳索中段双击固定
- [ ] 小手可拖动和释放
- [ ] 小手可吸附边缘
- [ ] 拉力超过阈值后可解除固定
- [ ] 闲置动画克制
- [ ] 离屏暂停
- [x] 移动端静态或隐藏

### 9.4 横版场景检查

- [ ] 视差层级正确
- [ ] 时间轴年份正确
- [ ] Boss 顺序与信息卡内容正确
- [ ] 点击种花生效
- [ ] 粒子受数量上限约束
- [ ] 未来区域使用中性墨色
- [ ] 倒流循环无跳切、无白闪
- [ ] 离屏暂停
- [x] 移动端静态 SVG 可读

### 9.5 2026-06-01 验证记录

已自动验证：

- `npm test` 通过，实际包含 `eslint .`、`tsc -b` 与 `vite build`。
- `git diff --check` 通过。
- `375px` 视口下：拖动小手隐藏、顶部阅读进度显示、Canvas 隐藏、静态 SVG 显示。
- `1280px` 视口下：拖动小手显示、透明命中层生效、Canvas 显示、静态 SVG 隐藏。
- Hero 大标题继承 `Xile` Token，分区标题继承 `KangKang` Token，短标签继承 UI 手写字体 Token。
- 六封信在切换后始终只展开一封，按钮焦点轮廓可见。
- `/ui` 展示页存在 5 个 Shape、边缘裁缺 Mask、Morph 动画、自由手绘线和本地 Lordicon 静态回退。
- 扫描源码后未发现新增外部请求；SVG 的 `xmlns` 字符串仅用于生成本地 Data URL。
- 六封信票据支持方向键、Home、End 与 Escape；展开信件后焦点进入信纸区域，并提供 `aria-live` 状态提示。
- `prefers-reduced-motion` 下桌面端拖动小手保留为静态只读 SVG，不再启动物理交互。
- 增量修改后 `npm run lint`、`./node_modules/.bin/tsc -b` 与 `npm run build` 均通过。
- 将六封信区域拆分为 `FriendLettersSection`，`App.tsx` 从 `538` 行降至 `291` 行，自研源码继续满足单文件不超过 `500` 行约束。
- 底部横版动画时间轴已从旧职业年份改为 `2025.10.10` 到 `2026.06.05`，Canvas 刻度、节点卡片、静态 SVG 与无障碍文案已同步。
- 底部横版动画新增便签、拍立得、票根、胶带和星光贴纸等手帐纪念物，使用固定种子生成并同步到静态 SVG 降级图。
- 底部横版动画继续增加信封、纸飞机、工牌、相机、咖啡杯和餐盘等实习记忆物，纪念物数量提升至 `34` 个，`renderCareerWorld.ts` 保持低于 `500` 行。
- 整页新增 `PageKeepsakes` 页面级手帐小物层，并在 Hero、一起走过、六封信和结尾区域增加摘要章、素材条、拆信工具条和收尾清单；新增样式拆分到 `page-keepsakes.css`，所有自研文件继续低于 `500` 行。
- 参考 `https://work-journey.sunebear.com/ui` 的 Craft UI 示例后，整页继续增加 `HeroActionBoard`、`PatternSampler`、`TimelineCardTools`、`LettersStatsPanel`、`ClosingPatternFooter`，覆盖按钮/表单、Pattern、CraftLine、CraftShape 与标签类组件。
- 参考截图、`https://github.com/SuneBear/craft-paper` 与 Craft UI 示例后，新增 `PageAnimatedEffects`：本地 Lottie 风格动图标条、白云气泡组合与全页星光散落层；未引入远程 Lordicon 脚本，reduced-motion 下自动静止。
- 已将新增动效组件从 Craft UI demo 文案调整为 `239` 天实习纪念主题：动图标改为第一天、常聊天、小便签、存回忆、午饭后、写给你；气泡改为午饭、工位、下班、六封信，并将组件带移到 Hero 卡片下方，降低对主标题的挤压。
- 图标小组件继续从 `6` 个扩展到 `10` 个，新增 `10.10`、工位边、想念值、拍下来；同时新增 `MemoryMotionLayer`，提供漂浮纸片/胶带与轨迹光点动效，移动端隐藏，reduced-motion 下静止。
- 页面各处继续增加 `SectionWidgetSprinkles` 区块小组件：时间线区增加路线/午饭/工位，六封信区增加信封/贴纸/回信，结尾区增加收好/常见/再写；配套 `page-section-widgets.css` 提供轻量呼吸与虚线划过动效。
- 六封信新增轻量前端暗号门槛：每封信通过 `VITE_LETTER_PASSWORD_*` 环境变量读取暗号，每次拆开都需要重新输入；新增 `.env.example` 与 `page-letter-lock.css`，真实暗号不写入源码。

仍需人工验收：

- 桌面端小手拖动手感、绳索中段固定、边缘吸附和拉力解除阈值。
- reduced-motion 模式下的完整页面阅读。
- 横版场景的视差节奏、Boss 卡片、种花、未来区域和倒流循环。

仍需外部资产：

- 已授权的 `Xile` 与 `KangKang` 字体文件。
- 首版 UI 手写卡通字体选择。
- 小女孩照片、角色设定图和精灵图。

## 10. 默认决策

- 首版不引入后端、CMS、登录、在线编辑器或遥测。
- `craft-paper` 继续以源码复制方式维护。
- `/ui` 只作为参考，不复制压缩构建产物。
- 拖动小手使用独立 Verlet 物理组件，不依赖 `react-moveable`。
- 先优化纪念页体验，再逐步抽出完整 Craft UI 库。
- 横版职业旅程场景独立模块化实现，不阻塞纪念页基础上线。
- 小女孩 IP 在基础互动稳定后接入，避免资产制作阻塞页面开发。
