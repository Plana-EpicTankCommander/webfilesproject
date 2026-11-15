# 地图 JSON 生成器

一个完全在浏览器本地运行的地图区域裁剪工具，用来从 `world-map.json` 生成
可以直接上传到 `sth_ineed/maps/` 的区域地图 JSON。

## 打开

```bash
npm run dev
# http://localhost:5173/map-generator/
```

构建后访问：

```text
dist/map-generator/index.html
```

## 用法

1. 默认从 `sth_ineed/maps/world-map.json` 读取世界数据；也可以点「选择本地 JSON」加载本地文件。
2. 在左侧选择国家 / 地区；「东亚示例」会选中中国、香港、澳门、日本、韩国、朝鲜、蒙古、台湾。
3. 修改标题、英文副标题、边距和文件名。
4. 点「生成 JSON」——右侧会即时预览，并显示国家数、行政区数、弧段数和文件大小。
5. 点「下载 JSON」保存文件，或「复制 JSON」。

生成的文件结构与 `world-map.json` 完全一致：

- 只保留所选国家的行政区
- 坐标平移到新区域的原点，`meta.width` / `meta.height` 改为区域尺寸
- `arcs` 重新编号，`polygons` 的弧段引用同步重映射
- `coast` / `borders` 只保留区域内的弧段
- 颜色、行政区编号和共享边界拓扑保持不变

## 发布到文章

把下载的文件上传到：

```text
sth_ineed/maps/<id>-map.json
```

例如 `east-asia-map.json`，文章里写：

```markdown
[map:east-asia;h:560;title:东亚局势]
```

就会加载这份区域地图。

## 说明

- 工具不上传文件，所有解析和生成都在浏览器里完成。
- 默认读取世界地图的 raw 地址；网络不可用时可使用「选择本地 JSON」。
- 边距单位与地图坐标一致，默认 `900`；数值越大，区域四周留白越多。
