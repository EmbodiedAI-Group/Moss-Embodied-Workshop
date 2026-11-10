# Moss具身工坊

[Moss具身工坊](https://embodiedai-group.github.io/Moss-Embodied-Workshop/) 是一个聚焦具身智能的开放社区。网站通过 GitHub Pages 发布；项目、知识分享、专家分享与社区动态由内容文件和模板生成。

## 日常内容更新

运营人员使用 [Pages CMS](https://app.pagescms.org/) 管理内容，不需要编辑 HTML、运行命令或手写 JSON：

1. 用获授权的 GitHub 账号登录 Pages CMS，打开 `EmbodiedAI-Group/Moss-Embodied-Workshop` 仓库的 `main` 分支。
2. 左侧选择「项目」「知识分享」「专家分享」或「社区动态」，新建或编辑条目。填写标题、摘要、正文和发布日期；需要时上传封面、填写图片说明与相关链接。专家分享还要填写嘉宾、分享日期和北京时间的开始、结束时间。
3. 检查「发布」开关并保存。完成下方首次启用后，开启并保存会提交到 GitHub，自动触发 Actions 构建和 Pages 发布；等待 Actions 完成后查看网站。关闭「发布」可保存草稿，草稿不会进入首页、列表和详情。
4. 首页按发布日期取各栏目的最新已发布内容；列表和详情也由同一条记录生成。专家列表区分即将分享和往期回顾，状态随自动构建更新。定时构建每小时触发一次，实际时间以 GitHub Actions 运行情况为准。

旧内容没有可靠发布日期的，迁移时保留原顺序、没有编造日期；若编辑这些旧内容，请在必填的发布日期中填写**本次发布或更新的真实日期**。时间字段统一按北京时间（UTC+8）填写。正文编辑器支持格式化、链接和图片；图片会保存到仓库的 `assets/media/`。

项目条目可以选填 MP4 视频、视频封面、标题和说明；项目详情会自动展示该视频，首页展示按发布日期排序的第一个含视频项目。访客可手动播放并选择循环。GitHub 对单个文件有 100 MiB 上限，请先将较大视频转换为适合网页播放的 MP4；文件和封面保存在仓库中。

在 Pages CMS 的「社区二维码设置」中可以更换二维码和修改有效期提示。首页当前二维码原图标明 **11 月 8 日前有效**，过期后应由运营更换为有效图片并同步更新提示。项目封面、分享主题图及其文字说明在对应内容条目中维护；专家主题图可填写来源名称和链接。

## 首次启用与发布前提

Pages CMS 是第三方托管的编辑服务，网站仍为 GitHub Pages 纯静态站点。首次使用需由**组织管理员**在 [Pages CMS](https://app.pagescms.org/) 登录并安装 Pages CMS GitHub App，授权时选择本仓库 `EmbodiedAI-Group/Moss-Embodied-Workshop`；编辑人员也需要相应仓库权限。其后使用 `.pages.yml` 定义的中文表单。安装步骤见 [Pages CMS 官方快速开始](https://pagescms.org/docs/quick-start/)。

具备该仓库 Maintain（维护）或 Admin（管理员）权限的人还需将 GitHub 仓库的 **Settings → Pages → Build and deployment → Source** 设置为 **GitHub Actions**，使 `.github/workflows/pages.yml` 构建和发布 `_site`。切换完成后，保存内容会触发构建；如果发布失败，可在 GitHub 仓库的 Actions 页查看错误。当前执行账号的仓库权限已检查为 `maintain: false`、`admin: false`，无法修改该设置；需要有相应权限的人完成这一步。设置方法见 [GitHub Pages 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

首次启用前，仓库根目录的 HTML 是当前版本的生成快照，仅用于现有分支发布方式；它们不是内容维护入口，也不会随 CMS 保存自动更新。旧项目详情、王治分享页面的网址和正文锚点继续保留，已有分享链接无需更换。当前数据迁移与本地构建已进行自动检查；第三方 CMS 的真实登录、授权和表单保存，需在 GitHub App 获授权后使用真实账号完成验证。四类新内容与草稿的生成测试使用本地临时样本，不能代替实际 CMS 操作验证。

## 每周知识分享

「知识分享」中的专栏文章填写系列名称、篇号、作者和预计阅读分钟，正文支持 Markdown 与概念图。文章会出现在知识分享页与首页；详情自动生成目录和手机折叠目录。「知识分享导读」维护学习路线和开源书架。选题与每周编辑流程见 [首季编辑方案](docs/knowledge-editorial-plan.md)。

## 本地预览与构建

```sh
npm ci
npm run build
python -m http.server 8765 --bind 127.0.0.1 --directory _site
```

打开 `http://127.0.0.1:8765/`。构建过程打包动效，并由 Eleventy 从 `content/` 四类内容和 `site/` 模板生成 `_site/`；`_site/` 是生成目录，重新构建会清理其内部旧产物。内容与图片由 Pages CMS 保存到仓库，页面模板、样式和动效代码供开发维护。

## 设计、动效与素材

`DESIGN.md` 记录设计系统；`assets/provenance.json` 与 `assets/fonts/provenance.json` 记录素材和字体来源，许可保存在 `THIRD_PARTY_NOTICES/`。新增正文字符若不在本地字体子集中，将使用设备的系统字体回退，无需运营人员手工维护字体。

GSAP / ScrollTrigger 管理分段入场与阅读进度；Lenis 仅在精细指针设备上参与平滑滚动，触控保持原生滚动。首页保留 React Bits 的局部动效，背景在屏外暂停。详情转场根据模板生成的内容标记自动识别，新增内容不需填写动效配置；不支持跨文档转场时使用兼容路径，系统偏好“减少动态效果”时即时切换。浏览器原生返回与链接依然可用。
