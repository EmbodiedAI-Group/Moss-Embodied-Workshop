# 知识分享与系列长文

Mode: Read

## Direction contract

THESIS: 让读者沿一条连续的路径理解具身智能。首页入口、专栏文章、学习路线和开源书架共同构成阅读链条。

OWN-WORLD: 继承 DESIGN.md 中的纸白、钴蓝、墨色与直角排版；使用现有 Noto Sans SC、细规则线和文本操作。正文以清晰的中文长文列承载知识。

STORY: 读者先发现首篇基础文章，再沿基础、数据、策略、实践四个方向继续阅读；需要深挖时可打开教材、论文与 GitHub 实现。

FIRST VIEWPORT: 保留站点导航，页题后是系列介绍和三个页内入口；首篇以标题、日期、阅读时长、摘要和章节导读展开。长文页采用左侧目录、右侧正文，手机上目录进入文流。

FORM: 现有知识分享页面的内容扩展；继承现有出版物视觉。seed: none (existing-surface extension).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## 内容约定

面向理工背景的学生、工程师及机器人研究者。第一篇限定为基础知识，数采设备与课程建设是远期方向。文章以原创解释连接原始资料，不将外部研究结果写成社区实测成果。

## 首次发布的实现记录与设计系统核对（2026-11-10，历史记录）

以下记录对应首发版本；其中“HTML/CSS 闭环图”“没有新增交付用栅格素材”仅描述首发状态。当前图文版本见文末同日 v2 修订记录。

本次是既有知识分享区的普通扩展。核对后的纸白、钴蓝、墨色、正文灰、规则线灰及字体来源与 incumbent 相符；保留根目录 `DESIGN.md` 和 `.impeccable/design.json` 原样，不建立新视觉世界，不将文章局部尺寸登记为全站 token。

- **专栏目录**：`knowledge.html` 按首篇文章、四阶段学习路线、开源书架和研究社区组织；第一篇入口与四条章节导读以平面双栏呈现。分隔线与下划线文本操作延续 The Rules Before Panels Rule 和 The Cobalt Signal Rule；没有增加阴影卡片或新插画。
- **长文阅读**：`knowledge-embodied-ai-basics.html` 使用现有基础容器（最大 1280px），宽屏目录为 235px，正文最大 780px，列间距为 `clamp(36px,6vw,90px)`；1000px 以下目录缩为 200px。目录固定在顶部 100px，内部可滚动，仍使用普通章节锚点。
- **手机目录**：760px 以下改为文流内原生 `details/summary`，默认折叠，显示九个章节的数量；目录链接至少 44px 高，summary 有明确键盘焦点。正文在目录后连续展开，返回专栏链接置于文章结尾。
- **局部阅读尺度**：文章页题为 `clamp(2rem,3.7vw,3.5rem)`；正文在宽屏为 17px / 2，小屏为 16px / 1.95；二级标题为 `clamp(1.35rem,2.2vw,1.75rem)`。这些是长文路由的阅读选择，不替换 incumbent 的 display、headline、body 角色。行内代码继承 `var(--font)`，不引入 Consolas；局部浅色代码底纹也不提升为品牌色 token。
- **内容图示与来源**：闭环概念图由语义 HTML 与 CSS 排列构成，表格和资料链接保留可阅读文本；本轮没有新增交付用栅格素材。复用品牌字体、普通链接与 SVG 方向箭头；审阅截图是检查证据，不是页面素材。基础知识的资料入口与社区项目成果保持语义区分，符合 The Real Source Rule。

### 核对证据

源文件核对范围：`PRODUCT.md`、`DESIGN.md`、`.impeccable/design.json`、`assets/site.css`、`assets/pages.css`、`assets/reading-position.css`、`assets/knowledge.css`、`site/_includes/base.njk`、`site/pages/knowledge.njk`、`site/_includes/knowledge-article.njk`。

直接查看了 `.impeccable/review/knowledge-series/knowledge-1440-top.png`、`knowledge-embodied-ai-basics-1440-top.png` 和 `knowledge-embodied-ai-basics-375-top.png`：桌面使用独立阅读列与侧边目录，小屏默认折叠目录后的正文可直接阅读，品牌、色彩与细线结构连续。

另核对同目录 `verification.json` 及生成它的 `verify.py`：报告涵盖两个知识路由的 1440 / 768 / 390 / 375px 视口，均无横向溢出、重复 ID、坏锚点和坏图片，每页一个 h1；正文实测分别为 17px 和 16px。报告还记录手机目录、章节与资料锚点、文章返回、列表进入文章、浏览器返回、首页入口及减少动态偏好的检查，并记录无 page error。首页、项目目录与王治分享页在 1440 / 375px 的溢出检查也通过。本记录复核这些已有证据，没有宣称重新执行浏览器测试或完成线上部署验证。

### 未改写或提升为规范的差异

既有 `PRODUCT.md` 与 `DESIGN.md` 的“七条路由”、部分品牌字样和旧导航说明仍反映较早状态，当前模板已含知识分享、分享目录与社区动态入口；现有 sidecar 的时间与源码哈希也是此前快照。本次不以普通扩展为由刷新这些历史文档，不修复无关漂移。知识长文的局部字号与 incumbent token 不完全相同，保留为路由层说明；既有检测器的字号 advisory 不通过新增全站 token 消除。此前报告的 Consolas 引用在本次读取的知识样式中已不存在，仍需以主流程最终检测结果为准。

## 图文修订 v2 的实现记录（2026-11-10，当前版本）

本次继续扩展既有基础文章，保留同一路由、九个章节锚点、桌面目录与手机折叠目录。正文经 humanizer-cn 改写，以拿杯子的具体过程贯穿概念解释；本轮交付统计为 6403 个汉字，页面阅读时长更新为约 25 分钟。正文、导航和图注继续使用既有中文字体与阅读层级，未修改 `DESIGN.md` 或 `.impeccable/design.json`，没有新增全站 token。

### 解释性配图

三幅原创 AI 教学示意图通过内置 imagegen 生成，采用纸白、钴蓝、墨色与少量中性灰；它们解释概念，不充当实物照片、设备参数或社区实验结果。图 1 呈现感知、判断、行动和反馈闭环；图 2 区分几何路径、带时间的轨迹与反馈控制；图 3 区分示范训练更新参数和运行时使用已训练策略。插图内的分组边框属于图解内容，不变更网站直角、平面排版的界面规则。

| 素材 | 原始尺寸 | WebP 文件大小 |
| --- | --- | --- |
| `assets/media/embodied-basics-loop-v2.webp` | 1536 × 1024 | 169486 字节 |
| `assets/media/embodied-basics-motion-v2.webp` | 1536 × 1024 | 111532 字节 |
| `assets/media/embodied-basics-learning-v2.webp` | 1536 × 1024 | 162328 字节 |

三图在最大 780px 的正文列中以全宽、原比例显示，宽高由图像自身比例决定；手机随正文列缩小，不裁切、不横向滚动。图注桌面为 14px、小屏为 13px，并明确可点击图片查看大图；图像链接保持键盘可达，详细替代文本与正文解释承担小屏细标签的补充信息。手机截图中的小标签较细，不将缩略状态视为完整细节阅读尺寸，放大入口保留原图。

素材来源记录在 `assets/media/embodied-basics-illustrations-v2.json`，包括生成方法、原始生成路径、尺寸、精确提示词、转换方式和检查记录；路径/轨迹/控制图另保留定向修正提示词。每张 WebP 相邻的 `.webp.json` 是 WebP 的 embed-prompt 回退记录。转换使用 Pillow，quality 92、method 6，未改动图像内容。审阅目录里的截图仍仅为证据，不是交付插图。

### 本次核对证据与边界

核对了 `assets/knowledge.css` 的图像/图注规则、文章数据中的 25 分钟字段、三幅 WebP 文件尺寸与来源记录。直接查看 `.impeccable/review/article-v2/article-1440-top.png`、`article-390-top.png` 以及 `figure-{1,2,3}-{1440,390}.png` 共八张截图：页头、纸白阅读面与目录延续首发结构；三幅图按原比例位于正文列，手机图注能够完整换行。

同目录 `verification.json` 记录 1440 / 768 / 390 / 375px 下九个章节、三幅图片均存在，图片自然尺寸均为 1536 × 1024，展示宽度依次为 780 / 493 / 350 / 335px；各视口无横向溢出、重复 ID 和坏锚点，图片具备替代文本与图注。报告还记录手机目录、保留章节锚点、ACT 参考资料目的地、大图新窗口和返回文章列表的交互检查，pageErrors 为空。本记录复核已有报告与截图，不声称重新运行浏览器测试或完成线上部署。

本轮媒体扫描另报告五个既有素材缺少 provenance，它们不属于新增的三幅插图；本次未改写或补造其来源。首发记录中的历史路由/导航文档与 sidecar 快照漂移仍保持原状，不将它们或局部插图样式提升为新的全站规范。
