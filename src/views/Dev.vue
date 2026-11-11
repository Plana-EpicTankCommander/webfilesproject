<template>
  <div class="page dev">
    <header class="page-head">
      <p class="eyebrow">Development</p>
      <h1 class="page-title">开发</h1>
      <p class="lede">组件与画布预览，用来检查视觉稿与交互是否正常。</p>
    </header>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">图标</h2>
        <span class="section-note">{{ icons.length }} 个 · 全部自绘</span>
      </div>
      <div class="icon-grid">
        <div v-for="name in icons" :key="name" class="icon-cell">
          <Icon :name="name" :size="21" />
          <span>{{ name }}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">按钮与徽标</h2>
      </div>
      <div class="row">
        <button type="button" class="btn btn-primary"><Icon name="play" :size="15" fill /> 主要按钮</button>
        <button type="button" class="btn">次要按钮</button>
        <button type="button" class="btn btn-ghost"><Icon name="refresh" :size="15" /> 幽灵按钮</button>
        <button type="button" class="btn btn-icon" aria-label="图标按钮"><Icon name="search" :size="17" /></button>
      </div>
      <div class="row">
        <span class="chip">普通徽标</span>
        <span class="chip chip-accent"><Icon name="check" :size="12" /> 强调</span>
        <span class="chip chip-live">正在播放</span>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">卡片</h2>
      </div>
      <div class="card-grid">
        <article class="card demo-card">
          <span class="chip chip-accent">章节</span>
          <h3>万物起源</h3>
          <p>卡片用于章节、数据源与曲目分组，圆角 16px，阴影很轻，避免抢正文的注意力。</p>
        </article>
        <article class="card demo-card">
          <span class="chip">状态</span>
          <h3>调用限制</h3>
          <p>正文使用衬线字体，界面使用无衬线字体，两套字号梯度各自独立。</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">画布组件</h2>
        <span class="section-note">滚轮缩放 · 拖动平移 · 双击复位</span>
      </div>
      <ImageCanvas
        src="https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/images/%E4%B8%BB%E9%A1%B5%E5%B0%81%E9%9D%A2.jpg"
        alt="画布演示图片"
        height="520px"
      />
    </section>
  </div>
</template>

<script setup>
import Icon from '../components/ui/Icon.vue'
import ImageCanvas from '../components/ImageCanvas/ImageCanvas.vue'

const icons = [
  'home', 'book', 'image', 'music', 'pulse', 'sliders', 'search',
  'chevron-down', 'chevron-right', 'chevron-left', 'menu', 'close',
  'sun', 'moon', 'eye', 'eye', 'list', 'grid',
  'play', 'pause', 'prev', 'next', 'volume', 'volume-off',
  'repeat', 'repeat-one', 'shuffle', 'clock', 'file', 'folder',
  'alert', 'check', 'refresh', 'arrow-right', 'arrow-left', 'arrow-up',
  'external', 'zoom', 'github'
].filter((name, index, list) => list.indexOf(name) === index)
</script>

<style scoped>
.section-note {
  font-size: 0.74rem;
  color: var(--ink-faint);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  gap: 8px;
}

.icon-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink-soft);
  font-size: 0.64rem;
  letter-spacing: 0.02em;
  transition: color var(--fast), border-color var(--fast);
}

.icon-cell:hover {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 35%, var(--line));
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.row + .row {
  margin-top: 14px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.demo-card {
  padding: 20px;
}

.demo-card h3 {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  margin: 12px 0 8px;
}

.demo-card p {
  font-size: 0.84rem;
  line-height: 1.8;
  color: var(--ink-soft);
}
</style>
