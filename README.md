# 古明地灵殿 · Chireiden Archive

一个展示文章、图片和音乐的静态网站。前端只负责取数据与排版，所有内容都存放在 GitHub 仓库里，站点本身不保存任何数据。

线上地址：<https://plana-epictankcommander.github.io/aweb/>

## 功能

- **📝 文章** — 递归读取 `novels/` 下的 Markdown 与 PDF，按文件夹分组；支持章节搜索、文内目录、上一篇 / 下一篇、字号调整、阅读进度，以及“上次读到哪”的自动恢复
- **📄 PDF** — 在页面内直接阅读，不依赖第三方阅读器；支持下载
- **🖼️ 图片** — 网格画廊，点击进入灯箱：缩放平移、左右键切换、缩略图条、新窗口看原图
- **🎨 画布** — 文章里可以把图片放进固定画布，滚轮缩放、拖动平移、双击复位，始终不会拖出画布
- **🎵 音乐** — 全局底部播放器，列表循环 / 单曲 / 随机、音量记忆；文章内嵌音轨与「声音」页共用同一个队列
- **📊 状态** — 数据源连通性测试、API 限额说明与文章标记语法速查

## 界面与主题

- **浅色「纸」为默认主题**，深色「夜」可一键切换，选择记在 localStorage
- 视觉语言：靛紫主色 + 绯红点缀 + 低饱和纸感底色；正文用衬线字体，界面用系统无衬线
- 设计变量集中在 `src/styles/tokens.css`，改一处即可换肤
- 界面图标全部为自绘内联 SVG（`src/components/ui/Icon.vue`），没有图标字体、没有第三方 UI 库
- 响应式三档：桌面「侧栏 + 正文 + 目录」、平板图标栏、手机顶栏 + 底部 Tab + 抽屉目录

## 文章内插入语法

### 🖼️ 插入图片

在 `.md` 中使用 Markdown 图片语法，图片放在仓库的 `images/` 目录：

```
![](图片文件名.png)
![](图片文件名.png?w=50)
```

- 相对路径会自动到 `images/` 目录查找
- GitHub blob 链接会自动转成 `raw.githubusercontent.com` 直链
- `?w=` 控制宽度百分比（1~150），默认 70%

### 🎵 插入音乐

`.mp3` 放在 `musicpage` 仓库根目录，然后在文章里写音乐标记：

```
[music:歌曲名.mp3]
[music:歌曲名.mp3;title:自定义标题]
```

渲染成一张音轨卡片，点击后交给底部全局播放器，与「声音」页共用队列。支持文件名含中括号，如 `[TFR]瞄准强敌打！.mp3`。

### 🎨 插入可缩放画布

```
[canvas:图片名.png]
[canvas:图片名.png;h:520;w:80;fit:cover;title:说明文字]
```

| 参数 | 含义 | 默认 |
|------|------|------|
| `h` | 画布高度（px，160~1200） | `420` |
| `w` | 画布宽度百分比（20~100） | `100` |
| `fit` | `contain` 完整显示 / `cover` 铺满裁切 | `contain` |
| `title` | 图片替代文字 | 文件名 |

交互：滚轮以鼠标位置为中心缩放、拖动平移、双击放大/复位，键盘聚焦后支持 `+` / `-` / `0` 与方向键。

### 📄 插入 PDF

把 `.pdf` 丢进 `novels/` 的任意子目录即可，章节列表会自动识别并打上 `PDF` 标签，点击后直接在页面里阅读。

实现上不依赖 `mozilla.github.io/pdf.js` 这类第三方阅读器：GitHub raw 对 PDF 返回的是 `application/octet-stream`，直接放进 `<iframe>` 只会触发下载，所以前端会先 `fetch` 回二进制、包成 `application/pdf` 的 Blob，再交给浏览器内置阅读器渲染；切换章节时会释放 Blob URL。取不到文件时，错误提示里会给出「下载 PDF」兜底。

## 站点图标与头像

- 原图：`public/icon-source.jpg`
- 图标：`public/favicon.ico`（16/32/48/64）、`favicon-32.png`、`favicon-192.png`、`apple-touch-icon.png`、`icon-512.png`
- 站内头像：`public/koishi-avatar.png`（侧栏品牌位、手机顶栏）

处理方式是：裁出头部方形区域 → 去掉白色背景与边缘杂线 → 圆形米白底 + 细紫环 → 导出上述各尺寸。想换图时替换 `icon-source.jpg` 后按同样规格重新导出即可（`index.html` 里的引用不用改）。

## 技术栈

- Vue 3 + Vite + Vue Router（hash 模式）+ Pinia
- Pinia 只做一件事：全局播放器状态（`src/stores/player.js`）
- GitHub API：获取文件列表（未登录 60 次/小时，已加 2 分钟缓存）
- `raw.githubusercontent.com`：获取正文 / 图片 / 音频 / PDF，绕过 API 限额
- 无 UI 框架、无图标库、无 CSS 预处理器；入口 chunk + 按页懒加载

## 目录结构

```
.
├── public/                  图标、头像、原图（构建时原样拷贝）
├── src/
│   ├── components/
│   │   ├── article/         ChapterTree.vue  ArticleToc.vue
│   │   ├── gallery/         Lightbox.vue
│   │   ├── layout/          SideNav.vue  MobileTabBar.vue
│   │   ├── player/          PlayerBar.vue  InlineTrack.vue
│   │   ├── ui/              Icon.vue
│   │   └── ImageCanvas/     ImageCanvas.vue
│   ├── composables/         useTheme.js
│   ├── services/            contentSource.js（GitHub 取数与标记解析）
│   ├── stores/              player.js
│   ├── styles/              tokens.css  base.css  markdown.css
│   ├── views/               Home / Article / Image / Sound / Status / Dev
│   ├── router/              index.js
│   └── site.js              站点名、导航、仓库地址等常量
├── .github/workflows/       deploy-aweb.yml（把 dist 同步到 aweb）
└── dist/                    构建产物（提交到仓库，供部署）
```

## 开发与部署

```bash
npm install     # 安装依赖
npm run dev     # 开发服务器，默认 http://localhost:5173
npm run build   # 构建到 dist/
npm run preview # 本地预览构建产物
```

部署链路：推送到 `main` 后，`.github/workflows/deploy-aweb.yml` 会把 `dist/` 同步到 `Plana-EpicTankCommander/aweb` 仓库，由 GitHub Pages 对外提供。

> 因为部署直接取 `dist/`，**改完源码一定要 `npm run build` 并把 `dist/` 一起提交**，否则线上还是旧版本。

## 数据来源

| 内容 | 仓库 | 目录 |
|------|------|------|
| 文章 / PDF | `Plana-EpicTankCommander/sth_ineed` | `novels/` |
| 图片 | `Plana-EpicTankCommander/sth_ineed` | `images/` |
| 音乐 | `Plana-EpicTankCommander/musicpage` | 根目录 |

## 注意事项

- GitHub API 未认证上限 60 次/小时，按 IP 计算；已加 2 分钟列表缓存。触发限流时页面会显示提示和「重试」按钮
- 图片、音乐、PDF 都走 `raw.githubusercontent.com`，不消耗 API 额度
- 播放器默认音量 10%，音量与循环模式记在 localStorage
- 文章内的图片/音乐/画布标记只在 `novels/` 下的 Markdown 中生效，路径大小写敏感
- 图标文件名被浏览器缓存得比较死，换图标后线上可能需要强刷（Ctrl+F5）才更新
