# 古明地灵殿

一个展示文章、图片和音乐的静态网站，数据全部托管在 GitHub 仓库。

## 功能

- **📝 文章**：从 GitHub 仓库读取 Markdown 文件，支持插入图片和音乐播放器
- **🖼️ 图片**：展示图片画廊，点击可预览大图
- **🎵 音乐**：音乐播放器，支持暂停/播放、音量控制、进度拖动
- **📊 状态**：查看数据来源仓库和连接状态

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

## 技术栈

- Vue 3 + Vite + Vue Router + Pinia
- GitHub API（获取文件列表，有 60次/小时 限制）
- raw.githubusercontent.com（获取内容，绕过 API 限制）

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

## 数据来源

| 内容 | 仓库 | 目录 |
|------|------|------|
| 文章 | `Plana-EpicTankCommander/sth_ineed` | `novels/` |
| 图片 | `Plana-EpicTankCommander/sth_ineed` | `images/` |
| 音乐 | `Plana-EpicTankCommander/musicpage` | 根目录 |

## 注意事项

- GitHub API 未认证上限为 60次/小时，已加入 2 分钟缓存机制
- 图片使用前需确保已上传到对应仓库的 `images/` 目录
- 音乐文件需上传到 `musicpage` 仓库根目录
