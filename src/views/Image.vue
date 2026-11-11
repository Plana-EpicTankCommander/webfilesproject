<template>
  <div class="page">
    <header class="page-head">
      <p class="eyebrow">Gallery</p>
      <h1 class="page-title">画中景</h1>
      <p class="lede">
        仓库 <code class="inline-code">images/</code> 里的全部图片，共
        <strong>{{ items.length || '—' }}</strong> 张。点击任意一张进入大图，画布支持滚轮缩放与拖动平移。
      </p>
    </header>

    <div class="gallery-bar">
      <span class="chip">
        <Icon name="image" :size="13" />
        {{ items.length }} 张
      </span>
      <button type="button" class="btn btn-ghost btn-sm" :disabled="!items.length" @click="openRandom">
        <Icon name="shuffle" :size="15" />
        随便看一张
      </button>
    </div>

    <div v-if="loading" class="grid">
      <div v-for="n in 8" :key="n" class="skeleton tile-skeleton" />
    </div>

    <div v-else-if="error" class="notice notice-error">
      <Icon name="alert" :size="18" />
      <span class="err-text">{{ error }}</span>
      <button type="button" class="btn btn-sm" @click="load">
        <Icon name="refresh" :size="14" />
        重试
      </button>
    </div>

    <div v-else-if="items.length" class="grid">
      <button
        v-for="(item, i) in items"
        :key="item.name"
        type="button"
        class="tile"
        @click="open(i)"
      >
        <img :src="item.url" :alt="item.displayName" loading="lazy" decoding="async" />
        <span class="tile-cap">{{ item.displayName }}</span>
      </button>
    </div>

    <div v-else class="empty-state">
      <span class="es-icon"><Icon name="image" :size="24" /></span>
      <p class="es-title">还没有图片</p>
      <p class="es-text">把图片上传到仓库的 images/ 目录即可出现在这里。</p>
    </div>

    <Lightbox
      v-model:index="lightboxIndex"
      :items="items"
      @close="closeLightbox"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Icon from '../components/ui/Icon.vue'
import Lightbox from '../components/gallery/Lightbox.vue'
import { listFiles, itemImageUrl } from '../services/contentSource'

const route = useRoute()
const router = useRouter()

const items = ref([])
const loading = ref(true)
const error = ref('')
const lightboxIndex = ref(-1)

onMounted(load)

watch(
  () => route.query.img,
  () => {
    if (route.query.img) openByName(String(route.query.img))
  }
)

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data = await listFiles('images')
    items.value = data.map((item) => ({
      name: item.name,
      displayName: item.name.replace(/\.[^.]+$/, ''),
      url: itemImageUrl(item)
    }))
    openByName(route.query.img ? String(route.query.img) : '')
  } catch (e) {
    error.value = `图片列表加载失败：${e.message}`
  } finally {
    loading.value = false
  }
}

function openByName(name) {
  if (!name) return
  const target = items.value.findIndex((item) => item.name === name || item.displayName === name)
  if (target >= 0) lightboxIndex.value = target
}

function open(index) {
  lightboxIndex.value = index
  const item = items.value[index]
  if (item) {
    router.replace({ path: '/image', query: { img: item.name } }).catch(() => {})
  }
}

function openRandom() {
  if (!items.value.length) return
  open(Math.floor(Math.random() * items.value.length))
}

function closeLightbox() {
  lightboxIndex.value = -1
  if (route.query.img) router.replace({ path: '/image' }).catch(() => {})
}
</script>

<style scoped>
.inline-code {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.88em;
  padding: 0.1em 0.4em;
  border-radius: 5px;
  background: var(--surface-2);
  color: var(--accent-ink);
}

.gallery-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
  gap: 14px;
}

.tile-skeleton {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius);
}

.tile {
  position: relative;
  display: block;
  padding: 0;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--surface-2);
  aspect-ratio: 4 / 3;
  box-shadow: var(--shadow-sm);
  transition: transform var(--fast), box-shadow var(--fast);
}

.tile:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--ease);
}

.tile:hover img {
  transform: scale(1.04);
}

.tile-cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 26px 12px 10px;
  font-size: 0.72rem;
  color: #fff;
  text-align: left;
  background: linear-gradient(to top, rgba(18, 12, 28, 0.76), transparent);
  opacity: 0;
  transition: opacity var(--fast);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tile:hover .tile-cap,
.tile:focus-visible .tile-cap {
  opacity: 1;
}

.err-text {
  flex: 1;
}

.empty-state {
  padding: 64px 24px;
  text-align: center;
  border-radius: var(--radius);
  border: 1px dashed var(--line-strong);
}

.es-icon {
  display: inline-grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  margin-bottom: 14px;
}

.es-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
}

.es-text {
  margin-top: 6px;
  font-size: 0.85rem;
  color: var(--ink-faint);
}

@media (hover: none) {
  .tile-cap {
    opacity: 1;
  }
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(146px, 1fr));
    gap: 10px;
  }
}
</style>
