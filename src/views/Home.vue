<template>
  <div class="page home">
    <section class="hero">
      <div class="hero-text">
        <p class="eyebrow">Chireiden Archive</p>
        <h1 class="hero-title">古明地灵殿</h1>
        <p class="hero-lede">
          地下图书馆的一角，存放着文稿、画与声音。<br />
          所有内容都从 GitHub 仓库直接取用，随写随新。
        </p>
        <div class="hero-actions">
          <router-link to="/article" class="btn btn-primary">
            开始阅读
            <Icon name="arrow-right" :size="16" />
          </router-link>
          <router-link to="/sound" class="btn">
            <Icon name="music" :size="16" />
            听点东西
          </router-link>
        </div>
        <dl class="hero-stats">
          <div class="stat">
            <dt>文稿</dt>
            <dd>{{ stats.novels ?? '—' }}<em>篇</em></dd>
          </div>
          <div class="stat">
            <dt>藏图</dt>
            <dd>{{ stats.images ?? '—' }}<em>张</em></dd>
          </div>
          <div class="stat">
            <dt>曲目</dt>
            <dd>{{ stats.musics ?? '—' }}<em>首</em></dd>
          </div>
        </dl>
      </div>

      <figure class="hero-visual">
        <div class="visual-frame">
          <img :src="coverUrl" alt="主页封面" decoding="async" />
        </div>
        <figcaption>主页封面 · main/images</figcaption>
      </figure>
    </section>

    <div v-if="failed" class="notice notice-error home-notice">
      <Icon name="alert" :size="17" />
      <span>内容读取失败，可能是 GitHub API 限流（未登录 60 次/小时）。</span>
      <button type="button" class="btn btn-sm" @click="load">重试</button>
    </div>

    <!-- 书架 -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">书架</h2>
        <router-link to="/article" class="section-link">
          全部章节
          <Icon name="arrow-right" :size="14" />
        </router-link>
      </div>

      <div v-if="loading" class="chapter-grid">
        <div v-for="n in 4" :key="n" class="skeleton chapter-skeleton" />
      </div>
      <div v-else-if="chapters.length" class="chapter-grid">
        <router-link
          v-for="(chapter, i) in chapters"
          :key="chapter.path"
          class="chapter-card card"
          :to="`/article?doc=${encodeURIComponent(chapter.path)}`"
        >
          <span class="cc-no">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="cc-body">
            <span class="cc-group">{{ chapter.group }}</span>
            <span class="cc-name">{{ chapter.displayName }}</span>
          </span>
          <Icon name="arrow-right" :size="15" class="cc-arrow" />
        </router-link>
      </div>
      <p v-else class="home-empty">书架还空着。</p>
    </section>

    <!-- 画中景 -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">画中景</h2>
        <router-link to="/image" class="section-link">
          进入画廊
          <Icon name="arrow-right" :size="14" />
        </router-link>
      </div>

      <div v-if="loading" class="gallery-strip">
        <div v-for="n in 6" :key="n" class="skeleton tile-skeleton" />
      </div>
      <div v-else-if="gallery.length" class="gallery-strip">
        <router-link
          v-for="image in gallery"
          :key="image.name"
          class="tile"
          :to="`/image?img=${encodeURIComponent(image.name)}`"
        >
          <img :src="image.url" :alt="image.displayName" loading="lazy" decoding="async" />
          <span class="tile-cap">{{ image.displayName }}</span>
        </router-link>
      </div>
      <p v-else class="home-empty">还没有图片。</p>
    </section>

    <!-- 耳畔 -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">耳畔</h2>
        <router-link to="/sound" class="section-link">
          全部曲目
          <Icon name="arrow-right" :size="14" />
        </router-link>
      </div>

      <div v-if="loading" class="track-mini">
        <div v-for="n in 3" :key="n" class="skeleton track-skeleton" />
      </div>
      <ul v-else-if="tracks.length" class="track-mini">
        <li v-for="(track, i) in tracks" :key="track.src">
          <button
            type="button"
            class="track-row"
            :class="{ 'is-active': player.current?.src === track.src }"
            @click="play(track, i)"
          >
            <span class="tr-icon">
              <Icon
                :name="player.current?.src === track.src && player.playing ? 'pause' : 'play'"
                :size="13"
                :stroke-width="player.current?.src === track.src && player.playing ? 2.4 : 1.5"
                :fill="!(player.current?.src === track.src && player.playing)"
              />
            </span>
            <span class="tr-name">{{ track.title }}</span>
            <span class="tr-meta">{{ player.current?.src === track.src ? '正在播放' : 'MP3' }}</span>
          </button>
        </li>
      </ul>
      <p v-else class="home-empty">还没有曲子。</p>
    </section>

    <footer class="home-foot">
      <p class="foot-note">目录列表读取静态 manifest.json（由 GitHub Action 生成）</p>
      <a :href="SITE.repo" target="_blank" rel="noreferrer" class="section-link">
        <Icon name="github" :size="14" />
        查看源码
      </a>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Icon from '../components/ui/Icon.vue'
import { SITE } from '../site'
import { usePlayerStore } from '../stores/player'
import {
  listFiles,
  groupFiles,
  getImageUrl,
  itemImageUrl,
  itemMusicUrl
} from '../services/contentSource'

const player = usePlayerStore()

const coverUrl = getImageUrl('images', '主页封面.jpg')

const chapters = ref([])
const gallery = ref([])
const tracks = ref([])
const loading = ref(true)
const failed = ref(false)
const stats = ref({ novels: null, images: null, musics: null })

onMounted(load)

function flatten(groups) {
  return groups.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      group: group.title,
      displayName: item.fileType === 'pdf'
        ? item.name.replace(/\.pdf$/i, '')
        : item.name.replace(/\.md$/i, '')
    }))
  )
}

async function load() {
  loading.value = true
  failed.value = false
  const [novels, images, musics] = await Promise.allSettled([
    listFiles('novels'),
    listFiles('images'),
    listFiles('musics')
  ])

  if (novels.status === 'fulfilled') {
    stats.value.novels = novels.value.length
    chapters.value = flatten(groupFiles(novels.value, 'novels')).slice(0, 4)
  }
  if (images.status === 'fulfilled') {
    stats.value.images = images.value.length
    gallery.value = images.value.slice(0, 6).map((item) => ({
      name: item.name,
      displayName: item.name.replace(/\.[^.]+$/, ''),
      url: itemImageUrl(item)
    }))
  }
  if (musics.status === 'fulfilled') {
    stats.value.musics = musics.value.length
    tracks.value = musics.value.map((item) => ({
      title: item.name.replace(/\.mp3$/i, ''),
      src: itemMusicUrl(item)
    }))
  }

  failed.value = [novels, images, musics].every((result) => result.status === 'rejected')
  loading.value = false
}

function play(track, index) {
  if (player.current?.src === track.src) {
    player.toggle()
    return
  }
  player.playQueue(tracks.value, index)
}
</script>

<style scoped>
.home {
  padding-top: 52px;
}

/* ---------- Hero ---------- */

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.85fr);
  align-items: center;
  gap: 54px;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2.4rem, 4.4vw, 3.5rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.18;
  margin: 6px 0 0;
}

.hero-lede {
  margin-top: 18px;
  max-width: 38ch;
  font-size: 0.98rem;
  line-height: 1.9;
  color: var(--ink-soft);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.hero-stats {
  display: flex;
  gap: 34px;
  margin: 38px 0 0;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}

.stat dt {
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  color: var(--ink-faint);
}

.stat dd {
  margin: 4px 0 0;
  font-family: var(--font-serif);
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

.stat dd em {
  font-style: normal;
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--ink-faint);
  margin-left: 3px;
}

.hero-visual {
  position: relative;
  margin: 0;
}

.hero-visual::before {
  content: '';
  position: absolute;
  inset: 14px -14px -14px 14px;
  border-radius: var(--radius-lg);
  border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
  background: color-mix(in srgb, var(--accent) 7%, transparent);
}

.visual-frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  background: var(--surface-2);
  transform: rotate(-1.4deg);
  aspect-ratio: 4 / 4.6;
}

.visual-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-visual figcaption {
  position: relative;
  margin-top: 14px;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--ink-faint);
  text-align: right;
}

/* ---------- 书架 ---------- */

.chapter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(228px, 1fr));
  gap: 14px;
}

.chapter-skeleton {
  height: 92px;
}

.chapter-card {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px 16px 16px 18px;
  transition: transform var(--fast), box-shadow var(--fast), border-color var(--fast);
}

.chapter-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--accent) 32%, var(--line));
  box-shadow: var(--shadow-md);
}

.cc-no {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink-faint);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  opacity: 0.75;
}

.cc-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cc-group {
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  color: var(--accent);
}

.cc-name {
  font-family: var(--font-serif);
  font-size: 0.94rem;
  font-weight: 600;
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cc-arrow {
  color: var(--ink-faint);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity var(--fast), transform var(--fast);
}

.chapter-card:hover .cc-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ---------- 画廊 ---------- */

.gallery-strip {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.tile-skeleton {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius);
}

.tile {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--surface-2);
  aspect-ratio: 4 / 3;
  box-shadow: var(--shadow-sm);
}

.tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s var(--ease);
}

.tile:hover img {
  transform: scale(1.05);
}

.tile-cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 22px 10px 8px;
  font-size: 0.7rem;
  color: #fff;
  text-align: left;
  background: linear-gradient(to top, rgba(20, 14, 30, 0.72), transparent);
  opacity: 0;
  transition: opacity var(--fast);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tile:hover .tile-cap {
  opacity: 1;
}

/* ---------- 耳畔 ---------- */

.track-mini {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.track-skeleton {
  height: 46px;
}

.track-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border-radius: 10px;
  text-align: left;
  transition: background var(--fast);
}

.track-row:hover {
  background: var(--surface-2);
}

.track-row.is-active {
  background: var(--accent-soft);
}

.tr-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  color: var(--ink-soft);
  transition: background var(--fast), color var(--fast), border-color var(--fast);
}

.track-row:hover .tr-icon {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.track-row.is-active .tr-icon {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.tr-name {
  flex: 1;
  min-width: 0;
  font-size: 0.88rem;
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tr-meta {
  flex-shrink: 0;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--ink-faint);
}

.track-row.is-active .tr-meta {
  color: var(--accent);
}

/* ---------- 其他 ---------- */

.home-notice {
  margin-top: 40px;
  align-items: center;
}

.home-notice .btn {
  margin-left: auto;
}

.home-empty {
  padding: 22px;
  border-radius: var(--radius);
  border: 1px dashed var(--line-strong);
  text-align: center;
  font-size: 0.86rem;
  color: var(--ink-faint);
}

.home-foot {
  margin-top: 64px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.74rem;
  color: var(--ink-faint);
}

@media (max-width: 900px) {
  .home {
    padding-top: 28px;
  }
  .hero {
    grid-template-columns: minmax(0, 1fr);
    gap: 34px;
  }
  .hero-visual {
    max-width: 320px;
    margin: 0 auto;
  }
  .hero-lede {
    max-width: none;
  }
  .hero-stats {
    gap: 26px;
  }
}
</style>
