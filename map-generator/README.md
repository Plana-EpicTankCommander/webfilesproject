# 地图数据编辑器

一个完全在浏览器本地运行的手动录入工具，用来生成国家、一级行政区与颜色的
地图数据 JSON。它不处理真实边界几何，适合做设定稿、数据表，或作为后续合并
边界数据的元数据来源。

## 打开

```bash
npm run dev
# http://localhost:5173/map-generator/
```

> 这是本地开发工具，不进入 `npm run build`，不会生成 `dist/map-generator/`，也不会部署到线上。

## 用法

1. 在「添加国家」里填写 3 位国家代码、中文名、英文名和颜色，点添加。
2. 在每个国家卡片里逐条添加一级行政区：中文名、英文名、颜色；编号会自动生成。
3. 国家名、行政区名和颜色都可以直接在卡片里修改，右侧 JSON 会即时更新。
4. 可点「载入示例」查看一份 3 国 / 6 个行政区的样例，或「清空全部」重新开始。
5. 点「下载 JSON」或「复制 JSON」。

## 生成格式

```json
{
  "format": "hoi4-map-data",
  "version": 1,
  "meta": {
    "title": "世界政治地图",
    "titleEn": "WORLD POLITICAL MAP",
    "countries": 1,
    "divisions": 2,
    "geometry": false,
    "generated": "2026-11-15"
  },
  "countries": [
    {
      "code": "CHN",
      "name": "China",
      "nameZh": "中国",
      "color": "#a77b45",
      "divisions": ["CHN001", "CHN002"]
    }
  ],
  "divisions": [
    {
      "id": "CHN001",
      "country": "CHN",
      "name": "Beijing",
      "nameZh": "北京",
      "color": "#b08a52"
    }
  ]
}
```

`meta.geometry` 固定为 `false`，表示这份文件只包含政治数据与颜色，不包含
`polygons` / `arcs` 等边界几何。要直接交给地图插件渲染，需要把它和一份带几何的
底图数据合并。

## 编号规则

行政区编号 = 国家代码 + 三位序号，例如 `CHN001`、`CHN002`。
新增行政区时自动取当前最大序号 + 1；删除后不会复用旧编号。
