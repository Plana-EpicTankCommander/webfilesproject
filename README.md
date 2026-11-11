# 古明地灵殿 · Chireiden Archive

一个展示文章、图片和音乐的静态网站，数据全部托管在 GitHub 仓库。前端只负责取数据与排版，不保存任何内容。

## 功能

- **📝 文章** — 从 GitHub 读取 Markdown / PDF，按文件夹分组，支持文内目录、上一篇/下一篇、字号调整、阅读进度
- **🖼️ 画布** — 图片在固定画布中缩放、平移，始终不会超出画布，支持滚轮、拖动、双击与键盘
- **🖼️ 图片** — 网格画廊，点击进入灯箱：缩放平移、左右切换、缩略图条、新窗口看原图
- **🎵 音乐** — 全局底部播放器，列表循环 / 单曲 / 随机、音量记忆；文章内嵌音轨与音乐页共用同一个播放器
- **📊 状态** — 数据源连通性测试、API 限额说明与文章标记语法速查

## 界面设计

- **浅色「纸」为默认主题**，深色「夜」可一键切换并记住选择
- 视觉语言：靛紫主色（觉之瞳）+ 绯红点缀 + 低饱和纸感底色；正文用衬线字体，界面用系统无衬线
- 设计变量集中在 `src/styles/tokens.css`，改一处即可换肤
- 图标全部为自绘内联 SVG（`src/components/ui/Icon.vue`），没有图标字体或第三方 UI 库
- 响应式三档：桌面「侧栏 + 正文 + 目录」、平板图标栏、手机顶栏 + 底部 Tab + 抽屉目录

## 文章内插入说明

### 🖼️ 插入图片

在文章（`.md` 文件）中使用 Markdown 图片语法：

```
![](图片文件名.png)
```

图片文件需上传到仓库的 `images/` 目录。

**URL 替换规则：**
- 相对路径（如 `![](图片.png)`）→ 自动从 `images/` 目录查找
- GitHub blob 绝对链接 → 自动转换为 `raw.githubusercontent.com` 直链

**调整图片尺寸（可选）：**
在图片路径尾部添加 `?w=数字` 可控制图片宽度百分比，范围 1~150：

```
![](图片.png?w=50)    <!-- 50% 宽度 -->
![](图片.png?w=80)    <!-- 80% 宽度 -->
```

不传参数时默认为文章宽度的 70%。

### 🎵 插入音乐播放器

在文章中使用音乐标记语法，`.mp3` 文件需上传到 `musicpage` 仓库根目录：

```
[music:歌曲名.mp3]
```

或带自定义标题：

```
[music:歌曲名.mp3;title:我的标题]
```

**URL 替换规则：**
- 在 `musicpage` 仓库根目录查找对应的 `.mp3` 文件
- 自动转换为 `raw.githubusercontent.com` 直链
- 支持文件名含中括号（如 `[TFR]瞄准强敌打！.mp3`）

渲染出的音轨卡片点击后交给页面底部的全局播放器，和「声音」页共用同一个队列。

### 🖼️ 插入画布图片（可缩放 / 平移）

在文章中写画布标记，图片会显示在一张固定大小的画布中：

```
[canvas:图片名.png]
```

可选参数（用 `;` 分隔）：

```
[canvas:图片名.png;h:520;w:80;fit:cover;title:说明文字]
```

| 参数 | 含义 | 默认 |
|------|------|------|
| `h` | 画布高度（px，160~1200） | `420` |
| `w` | 画布宽度百分比（20~100） | `100` |
| `fit` | `contain` 完整显示 / `cover` 铺满裁切 | `contain` |
| `title` | 图片替代文字 | 文件名 |

**交互：** 滚轮缩放（以鼠标位置为中心）、拖动平移、双击放大/复位、右下角按钮操作；键盘聚焦后支持 `+` / `-` / `0` 和方向键。图片会被约束在画布内，放大时边缘贴住画布，缩小时自动居中，不会拖出画布。

图片同样从 `images/` 目录读取，也支持 GitHub blob 链接和外部 URL。

## 技术栈

- Vue 3 + Vite + Vue Router（hash 模式）+ Pinia
- Pinia 只做一件事：全局播放器状态（`src/stores/player.js`）
- GitHub API（获取文件列表，未登录 60 次/小时，已加 2 分钟缓存）
- raw.githubusercontent.com（获取正文/图片/音频，绕过 API 限制）
- 无 UI 框架、无图标库、无 CSS 预处理器，产物只有一个入口 chunk + 按页懒加载

## 目录结构

```
src/
├── components/
│   ├── article/   ChapterTree.vue  ArticleToc.vue
│   ├── gallery/   Lightbox.vue
│   ├── layout/    SideNav.vue  MobileTabBar.vue
│   ├── player/    PlayerBar.vue  InlineTrack.vue
│   ├── ui/        Icon.vue
│   └── ImageCanvas/ImageCanvas.vue
├── composables/   useTheme.js
├── services/      contentSource.js
├── stores/        player.js
├── styles/        tokens.css  base.css  markdown.css
├── views/         Home / Article / Image / Sound / Status / Dev
└── router/        index.js
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

> 构建产物在 `dist/`，如果站点由 GitHub Pages 托管，改完需要重新 `npm run build` 并提交 `dist/`。

## 数据来源

| 内容 | 仓库 | 目录 |
|------|------|------|
| 文章 | `Plana-EpicTankCommander/sth_ineed` | `novels/` |
| 图片 | `Plana-EpicTankCommander/sth_ineed` | `images/` |
| 音乐 | `Plana-EpicTankCommander/musicpage` | 根目录 |

## 注意事项

- GitHub API 未认证上限为 60 次/小时，已加入 2 分钟缓存；触发限流时页面会提示并给出「重试」
- 图片使用前需确保已上传到对应仓库的 `images/` 目录
- 音乐文件需上传到 `musicpage` 仓库根目录
- 播放器默认音量 10%，音量与循环模式会记在 localStorage
