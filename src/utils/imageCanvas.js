// 图片画布的缩放 / 平移计算
// 约定：图片以画布中心为原点，tx / ty 是图片中心相对画布中心的屏幕像素偏移，
// scale 是相对原始像素的缩放倍率。

export const MAX_ZOOM_FACTOR = 8

// 计算“适应画布”的缩放倍率
// contain: 完整显示整张图（可能留白）
// cover:   铺满画布（可能裁切）
export function computeFitScale(naturalWidth, naturalHeight, viewWidth, viewHeight, mode = 'contain') {
  if (!naturalWidth || !naturalHeight || !viewWidth || !viewHeight) return 0
  const scaleX = viewWidth / naturalWidth
  const scaleY = viewHeight / naturalHeight
  return mode === 'cover' ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY)
}

// 限制缩放范围：最小为适应倍率，最大为适应倍率的 maxFactor 倍
export function clampScale(scale, fitScale, maxFactor = MAX_ZOOM_FACTOR) {
  if (!fitScale || fitScale <= 0) return 0
  const factor = maxFactor > 1 ? maxFactor : 1
  const max = fitScale * factor
  if (!Number.isFinite(scale)) return fitScale
  return Math.min(max, Math.max(fitScale, scale))
}

// 以画布中心为原点，把缩放锚定在 (anchorX, anchorY) 这个屏幕点上
// 保证锚点下方的图片内容在缩放前后保持不动
export function zoomAt(tx, ty, oldScale, newScale, anchorX = 0, anchorY = 0) {
  if (!oldScale) return { tx, ty }
  const ratio = newScale / oldScale
  return {
    tx: anchorX - (anchorX - tx) * ratio,
    ty: anchorY - (anchorY - ty) * ratio
  }
}

// 约束平移，使图片永远不越出画布：
// 图片比画布大时，边缘最多贴住画布边缘；
// 图片比画布小时，该方向锁定居中（偏移归零）。
export function clampTranslation(tx, ty, scale, naturalWidth, naturalHeight, viewWidth, viewHeight) {
  const displayWidth = naturalWidth * scale
  const displayHeight = naturalHeight * scale
  const halfWidth = Math.max(0, (displayWidth - viewWidth) / 2)
  const halfHeight = Math.max(0, (displayHeight - viewHeight) / 2)
  return {
    tx: Math.min(halfWidth, Math.max(-halfWidth, tx)),
    ty: Math.min(halfHeight, Math.max(-halfHeight, ty))
  }
}
