<template>
  <div class="page-with-sidenav">
    <!-- 声音目录侧边栏 -->
    <aside class="sidenav">
      <div class="sidenav-title">音乐目录</div>
      <div class="sidenav-list">
        <div
          v-for="item in items"
          :key="item.path"
          class="sidenav-item"
          :class="{ active: selectedName === item.name }"
          @click="play(item)"
        >
          {{ item.displayName }}
        </div>
      </div>
    </aside>

    <!-- 播放器 -->
    <div class="content-area">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="current" class="player-card">
        <div class="player-title">正在播放：{{ current.displayName }}</div>
        <audio controls ref="audioRef" :src="current.downloadUrl"></audio>
      </div>
      <div v-else class="empty">请从左侧选择音乐</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listFiles, getMusicUrl } from '../services/contentSource'

const items = ref([])
const current = ref(null)
const selectedName = ref('')
const loading = ref(true)
const error = ref('')

const audioRef = ref(null)

onMounted(async () => {
  try {
    const data = await listFiles('musics')
    items.value = data.map(f => ({
      ...f,
      displayName: f.name.replace(/\.mp3$/, '').replace(/^\[/, '【').replace(/\]/, '】')
    }))
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

async function play(item) {
  selectedName.value = item.name
  loading.value = true
  error.value = ''
  current.value = null
  try {
    const url = await getMusicUrl('musics', item.path)
    current.value = { ...item, downloadUrl: url }
    // 等音频加载完再设置音量
    await new Promise(resolve => setTimeout(resolve, 100))
    if (audioRef.value) {
      audioRef.value.volume = 0.1
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-with-sidenav {
  display: flex;
  min-height: 100vh;
}

.sidenav {
  width: 160px;
  background: #1a1a1a;
  color: #fff;
  padding: 1rem 0;
  flex-shrink: 0;
  overflow-y: auto;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidenav-title {
  font-size: 0.8rem;
  color: #888;
  padding: 0 0.8rem 0.6rem;
  border-bottom: 1px solid #333;
  margin-bottom: 0.6rem;
}

.sidenav-list {
  overflow-y: auto;
  max-height: calc(100vh - 60px);
}

.sidenav-item {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  color: #aaa;
  cursor: pointer;
  border-radius: 4px;
  margin: 0.1rem 0.3rem;
  transition: background 0.2s, color 0.2s;
  word-break: break-all;
}

.sidenav-item:hover {
  background: #333;
  color: #fff;
}

.sidenav-item.active {
  background: #4a90e2;
  color: #fff;
}

.content-area {
  flex: 1;
  padding: 2rem 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background-color: rgba(245, 245, 245, 0.85);
  background-image: url('https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/images/%E6%B0%B4%E7%9D%80%E6%99%AE%E6%8B%89%E5%A8%9C.png');
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 30% auto;
  background-attachment: fixed;
}

.loading, .error, .empty {
  align-self: center;
  width: 100%;
  max-width: 900px;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 0 auto;
}

.loading { background: #f0f0f0; color: #666; }
.error { background: #ffe0e0; color: #c00; }
.empty { background: #f9f9f9; color: #999; }

.player-card {
  background: #f0f7ff;
  border: 1px solid #4a90e2;
  border-radius: 10px;
  padding: 1rem;
  width: 61.8%;
  max-width: 100%;
  margin: 0 auto;
}

.player-title {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.player-card audio {
  width: 100%;
  height: 40px;
}
</style>
