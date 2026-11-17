# 古明地灵殿 · Chireiden Archive

一个展示文章、图片和音乐的静态网站。前端只负责取数据与排版，所有内容都存放在 GitHub 仓库里，站点本身不保存任何数据。

线上地址：<https://plana-epictankcommander.github.io/aweb/>

## 功能

- **📝 文章** — 递归读取 `novels/` 下的 Markdown 与 PDF，按文件夹分组；支持章节搜索、文内目录、上一篇 / 下一篇、字号调整、阅读进度，以及“上次读到哪”的自动恢复
- **📄 PDF** — 在页面内直接阅读，不依赖第三方阅读器；支持下载
- **🖼️ 图片** — 网格画廊，点击进入灯箱：缩放平移、左右键切换、缩略图条、新窗口看原图
- **🎨 画布** — 文章里可以把图片放进固定画布，滚轮缩放、拖动平移、双击复位，始终不会拖出画布
- **🗺️ 地图** — 可缩放 / 拖动的 HOI4 风格世界政治地图；按 250 个国家、4,928 个行政区组织数据，网页只描国界与海岸线，基础数据全部装在单个 JSON 里
- **🎵 音乐** — 全局底部播放器，列表循环 / 单曲 / 随机、音量记忆；文章内嵌音轨与「声音」页共用同一个队列
- **📊 状态** — 数据源连通性测试、API 限额说明与文章标记语法速查

## 界面与主题

- **浅色「纸」为默认主题**，深色「夜」可一键切换，选择记在 localStorage
- 视觉语言：靛紫主色 + 绯红点缀 + 低饱和纸感底色；正文用衬线字体，界面用系统无衬线
- 设计变量集中在 `src/styles/tokens.css`，改一处即可换肤
- 界面图标全部为自绘内联 SVG（`src/components/ui/Icon.vue`），没有图标字体、没有第三方 UI 库
- 响应式三档：桌面「侧栏 + 正文」、平板图标栏、手机顶栏 + 底部 Tab + 章节抽屉
- 文章目录是右下角的**浮动小方块**：可拖动、可收起，位置和展开状态记在 localStorage；手机上默认收起并贴在 Tab 栏上方

## 文章内插入语法

快速索引：

| 写法 | 效果 |
|------|------|
| `![](图片.png)` / `![](图片.png?w=50)` | 正文里直接显示图片 |
| `[popup:图片.png;text:点我看图]` | 行内按钮，点击弹出灯箱 |
| `[music:歌名.mp3;title:标题]` | 内嵌音轨卡片，交给底部播放器 |
| `[canvas:图片.png;h:520;fit:cover]` | 可缩放 / 平移的画布 |
| `[map:world;h:560;focus:CHN]` | 可缩放 / 平移的 HOI4 风格世界地图 |
| 把 `.pdf` 放进 `novels/` 子目录 | 章节列表出现 PDF，点开直接阅读 |
| 直接贴 `<iframe src="…">` | 内嵌视频 / 网页 |

### 🖼️ 插入图片（直接显示）

在 `.md` 中使用 Markdown 图片语法，图片放在仓库的 `images/` 目录：

```
![](图片文件名.png)
![](图片文件名.png?w=50)
```

- 相对路径会自动到 `images/` 目录查找
- GitHub blob 链接会自动转成 `raw.githubusercontent.com` 直链
- `?w=` 控制宽度百分比（1~150），默认 70%

### 👁️ 点击文字弹图（popup）

正文里不直接显示图片，只放一个可点的行内按钮：

```
[popup:图片文件名.png;text:点我看图]
[popup:图片文件名.png;text:点我看图;title:完整说明]
```

- `text`：按钮文字，省略时用文件名
- `title`：灯箱里显示的标题，省略时同 `text`
- 点击打开灯箱：可缩放、拖动、双击复位，并在本文所有 popup 图片之间 ←/→ 切换
- 图片查找规则和普通图片一致（相对路径走 `images/`，也支持 blob 链接和外部 URL）

### 🎵 插入音乐

`.mp3` 放在 `sth_ineed` 仓库的 `musics/` 目录，然后在文章里写音乐标记：

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

### 🗺️ 插入可交互地图

在文稿里单独占一行写：

```
[map:world]
[map:world;h:560;w:100;focus:CHN;zoom:2.6;fit:contain;title:世界政治地图]
```

| 参数 | 含义 | 默认 |
|------|------|------|
| `world` / `east-asia` | 地图数据 id；对应 `sth_ineed/maps/<id>-map.json` | `world` |
| `h` | 地图高度（px，240~1200） | `540` |
| `w` | 地图宽度百分比（20~100） | `100` |
| `focus` | 初始聚焦：三位国家代码（如 `CHN`）或行政区编号（如 `CHN011`） | 无 |
| `zoom` | 初始缩放倍数；配合 `focus` 可只给某个国家 | `0`（全图） |
| `fit` | `contain` 完整显示 / `cover` 铺满画布 | `contain` |
| `graticule` | 写 `on` 显示经纬网；默认不显示 | `off` |
| `title` | 标题牌文字；写 `none` 可隐藏 | 数据里的标题 |

交互：滚轮以指针位置为中心缩放，单指 / 鼠标拖动平移，双指捏合，双击放大或复位；悬停显示行政区名称，点击国家打开信息卡。键盘聚焦后支持 `+` / `-` / `0` / 方向键 / `Esc`。

地图外观是低饱和政治色 + 暗色海面 + 细金线 + 纸纹。**默认同一国家使用纯色填充**，不显示行政区色差；需要色块时给组件加 `show-province-shading="true"`。网页只描海岸线与国界，不描任何一级行政区或市级边界；市级数据仅用于悬停、点击和本地编辑。缩放时线宽保持屏幕像素级，不会跟着地图一起变粗。

地图数据不在本站的构建产物里，而是和文章一起放在内容仓库 `sth_ineed/maps/`，由前端通过 `raw.githubusercontent.com` 读取。当前提供：

- `world-map.json`：全球地图，250 国家 / 7,153 行政区；中国大陆 366 个市级 / 省直辖县级单元，美国为 51 个州级单位，俄罗斯 2,328 个区，香港为单一行政区
- `east-asia-map.json`：东亚区域（中国、香港、澳门、日本、韩国、朝鲜、蒙古、台湾），486 行政区，文章写 `[map:east-asia]` 即可

**在其他网页里使用**：执行 `npm run build` 后，把 `dist/map-plugin/hoi4-map.js` 放到静态站点即可；地图 JSON 直接使用内容仓库的 raw 地址（也可以下载后自建副本）：

```html
<script type="module" src="./map-plugin/hoi4-map.js"></script>

<hoi4-map
  src="https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/maps/world-map.json"
  height="560"
  title="世界政治地图"
  focus="CHN"
  zoom="2.6"
></hoi4-map>
```

可用属性：`src`、`height`、`width`、`title`、`subtitle`、`focus`、`zoom`、`fit`、`show-title`、`show-compass`、`show-graticule`、`show-province-shading`；不写 `src` 时默认读取 `sth_ineed/maps/world-map.json`。地图内部是 Shadow DOM，不会和页面样式打架。完整示例见仓库根目录的 `map-demo.html`（构建后访问 `/map-demo.html`）。

### 🧰 地图编辑器

`map-generator/` 是一个**仅本地使用**的地图编辑工具：载入东亚 / 世界底图后，点选省份把它划入当前国家，颜色、国界和标签实时更新，导出的 JSON 带完整几何，可直接给网站插件使用。

Windows 下可以直接双击仓库根目录的 [`启动地图编辑器.bat`](启动地图编辑器.bat)：它只启动地图编辑器自己的静态服务，不会启动整站 Vite，也不需要安装 npm 依赖，随后会自动打开编辑器。关闭时在窗口按 `Ctrl+C` 或直接关闭窗口。

也可以手动启动编辑器专用服务：

```bash
npm run dev:editor
# http://127.0.0.1:5173/map-generator/
```

`npm run dev` 仍然用于开发整个站点，不会由编辑器启动器调用。

支持选择 / 新增国家、点击地图分配省份、在删除模式下把地块从国家中剔除并撤销、删除整个国家 tag 及其地块、修改国家名称与颜色、按国家开关是否在地图上渲染，以及进入批量模式后一次性显示 / 隐藏或设置多个国家的颜色。隐藏只影响绘制，隐藏国家的省份会以淡色虚线轮廓显示，仍可悬停、点击、分配或删除；隐藏或显示国家后，地图会自动缩放到当前可见范围。省份色差默认关闭，可在编辑器里开启。被隐藏的国家不会写进导出文件。详细说明见 `map-generator/README.md`。

> 这个工具**不参与 `npm run build`**，不会被打包进 `dist/`，也不会部署到线上。

### 📄 插入 PDF

把 `.pdf` 丢进 `novels/` 的任意子目录即可，章节列表会自动识别并打上 `PDF` 标签，点击后直接在页面里阅读，工具条里也有「下载」。

实现上不依赖第三方阅读器：GitHub raw 对 PDF 返回的是 `application/octet-stream`，直接放进 `<iframe>` 只会触发下载，所以前端会先 `fetch` 回二进制、包成 `application/pdf` 的 Blob，再交给浏览器内置阅读器渲染；切换章节时会释放 Blob URL。

### 📺 内嵌视频 / 网页

把 B 站、YouTube 等平台的 `<iframe>` 代码原样贴进 Markdown 即可：

```html
<iframe src="//player.bilibili.com/player.html?bvid=..." scrolling="no" border="0" frameborder="no" allowfullscreen="true" width="800" height="450"></iframe>
```

站点会把所有 iframe 统一成 16:9、圆角、宽度自适应（不会超出正文栏），`width` / `height` 属性可以不管。


## 站点图标与头像

- 原图：`public/icon-source.jpg`
- 图标：`public/favicon.ico`（16/32/48/64）、`favicon-32.png`、`favicon-192.png`、`apple-touch-icon.png`、`icon-512.png`
- 站内头像：`public/koishi-avatar.png`（侧栏品牌位、手机顶栏）

处理方式是：裁出头部方形区域 → 去掉白色背景与边缘杂线 → 圆形米白底 + 细紫环 → 导出上述各尺寸。想换图时替换 `icon-source.jpg` 后按同样规格重新导出即可（`index.html` 里的引用不用改）。

## 技术栈

- Vue 3 + Vite + Vue Router（hash 模式）+ Pinia
- Pinia 只做一件事：全局播放器状态（`src/stores/player.js`）
- 目录列表：优先读取内容仓库里的静态 `manifest.json`（GitHub Action 生成），取不到才回退 GitHub API（未登录 60 次/小时）
- `raw.githubusercontent.com`：获取正文 / 图片 / 音频 / PDF，绕过 API 限额
- 地图：原生 Canvas 2D + Path2D + Shadow DOM，不依赖地图库；单文件量化拓扑 JSON，快慢双速渲染（拖动时变换快照，停下后重绘矢量细节）
- 无 UI 框架、无图标库、无 CSS 预处理器；入口 chunk + 按页懒加载

## 目录结构

```
.
├── public/                  图标、头像、原图（构建时原样拷贝）
├── src/
│   ├── components/
│   │   ├── article/         ChapterTree.vue  FloatingToc.vue
│   │   ├── gallery/         Lightbox.vue
│   │   ├── layout/          SideNav.vue  MobileTabBar.vue
│   │   ├── map/             MapCanvas.vue（文章内挂载用 Vue 包装）
│   │   ├── player/          PlayerBar.vue  InlineTrack.vue
│   │   ├── ui/              Icon.vue
│   │   └── ImageCanvas/     ImageCanvas.vue
│   ├── map/                 hoi4-map.js（引擎）  hoi4-map-element.js（Web Component）  map-styles.js
│   ├── composables/         useTheme.js
│   ├── services/            contentSource.js（GitHub 取数与标记解析）
│   ├── stores/              player.js
│   ├── styles/              tokens.css  base.css  markdown.css
│   ├── views/               Home / Article / Image / Sound / Status / Dev
│   ├── router/              index.js
│   └── site.js              站点名、导航、仓库地址等常量
├── scripts/build-map-data.mjs    从 Natural Earth 生成 world-map.json
├── scripts/build-region-map.mjs  从世界数据裁剪区域地图
├── map-demo.html            地图插件独立演示页（含网页 / 文章两种插入方式）
├── .github/workflows/       deploy-aweb.yml（把 dist 同步到 aweb）
└── dist/                    构建产物（提交到仓库，供部署）
```

> 地图基础数据不在本仓库的 `public/` 下，而是和文章一起放在内容仓库 `sth_ineed/maps/`。

## 地图数据格式

`sth_ineed/maps/world-map.json` 是全球地图数据，`east-asia-map.json` 是东亚区域子集。两者结构完全相同，都是**混合缩进**的可读 JSON：`meta`、`countries`、`divisions` 逐字段换行，`arcs` / `graticule` 每 12 个数字换一行，而不是压缩成一行。顶层字段：

| 字段 | 含义 |
|------|------|
| `meta` | 标题、投影、量化后的世界宽高、国家数、行政区数、来源与许可 |
| `countries[]` | 国家：三位字母数字代码 `code`、英文名 `name`、中文名 `nameZh`、国家色 `color`、标签锚点 `label`、包围盒 `bbox`、面积 `area`、国界弧段 `arcs`、下辖行政区编号 `divisions` |
| `divisions[]` | 行政区：`id`（国家代码 + 三位序号，如 `CHN001`）、`country`、`name` / `nameZh`、该行政区颜色 `color`、`polygons` |
| `arcs[]` | 共享边界弧段，量化后按 `[x, y, dx, dy, …]` 增量编码 |
| `coast[]` / `borders[]` | 需要描边的海岸线 / 国界弧段索引；行政区内部弧段不在其中 |
| `graticule[]` | 10° 经纬网，格式同 `arcs` |

`polygons` 的结构是「多边形 → 环 → 有符号弧段引用」：

```json
"polygons": [[[12, -34, 35], [40, 41]]]
```

- 正数表示正向使用 `arcs[i]`，负数表示反向使用（`~i`，与 TopoJSON 一致）
- 相邻行政区共用弧段，因此简化不会把地块撕开；渲染时默认只描 `coast` / `borders`
- 颜色是预制在 JSON 里的十六进制值；网页默认按国家纯色填充，只改省份色不会改变网页显示

数据由 `scripts/build-map-data.mjs` 生成，区域地图再由 `scripts/build-region-map.mjs` 裁剪：

```bash
# 首次需要下载 Natural Earth 1:10m 数据到 .map-cache/（见脚本顶部 URL）
npm run build:map-data    # 生成 .map-cache/world-map.json
npm run build:map-region  # 生成 .map-cache/east-asia-map.json

# 然后复制到内容仓库并提交：
#   sth_ineed/maps/world-map.json
#   sth_ineed/maps/east-asia-map.json
```

## 开发与部署

```bash
npm install     # 安装依赖
npm run dev     # 开发服务器，默认 http://localhost:5173
npm run build   # 构建站点 + 生成 dist/map-plugin/hoi4-map.js
npm run preview # 本地预览构建产物
```

部署链路：推送到 `main` 后，`.github/workflows/deploy-aweb.yml` 会把 `dist/` 同步到 `Plana-EpicTankCommander/aweb` 仓库，由 GitHub Pages 对外提供。

> 因为部署直接取 `dist/`，**改完源码一定要 `npm run build` 并把 `dist/` 一起提交**，否则线上还是旧版本。独立插件 `dist/map-plugin/hoi4-map.js` 也由构建生成，需一并提交。

## 数据来源

| 内容 | 仓库 | 目录 |
|------|------|------|
| 文章 / PDF | `Plana-EpicTankCommander/sth_ineed` | `novels/` |
| 图片 | `Plana-EpicTankCommander/sth_ineed` | `images/` |
| 音乐 | `Plana-EpicTankCommander/sth_ineed` | `musics/` |
| 地图数据 | `Plana-EpicTankCommander/sth_ineed` | `maps/world-map.json` 与 `maps/east-asia-map.json` |

> 内容清单：`sth_ineed` 仓库里的 GitHub Action 会在 `novels/`、`images/`、`musics/` 变更时生成根目录的 `manifest.json`。前端优先读取这份静态清单（不消耗 API 额度），读不到时自动回退到 GitHub API。

## 注意事项

- GitHub API 未认证上限 60 次/小时，按 IP 计算；已加 2 分钟列表缓存。触发限流时页面会显示提示和「重试」按钮
- 图片、音乐、PDF、地图都走 `raw.githubusercontent.com`，不消耗 API 额度
- 播放器默认音量 10%，音量与循环模式记在 localStorage
- 文章内的图片/音乐/画布/地图标记只在 `novels/` 下的 Markdown 中生效，路径大小写敏感
- 图标文件名被浏览器缓存得比较死，换图标后线上可能需要强刷（Ctrl+F5）才更新
