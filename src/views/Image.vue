<template>
  <div class="page-with-sidenav">
    <!-- 图片目录侧边栏 -->
    <aside class="sidenav">
      <div class="sidenav-title">图片目录</div>
      <div class="sidenav-list">
        <div
          v-for="(items, category) in grouped"
          :key="category"
          class="sidenav-category"
        >
          <div class="category-label">{{ category }}</div>
          <div
            v-for="item in items"
            :key="item.path"
            class="sidenav-item"
            :class="{ active: selectedFile === item.path }"
            @click="preview(item)"
          >
            {{ item.displayName }}
          </div>
        </div>
      </div>
    </aside>

    <!-- 图片预览 -->
    <div class="content-area">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="previewItem" class="image-container">
        <img :src="previewItem.proxyUrl" :alt="previewItem.displayName" />
      </div>
      <div v-else class="empty">请从左侧选择图片</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { listFiles, getImageUrl, groupFiles } from '../services/contentSource'

const files = ref([])
const selectedFile = ref('')
const previewItem = ref(null)
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const data = await listFiles('images')
    files.value = data.map(f => ({
      ...f,
      displayName: f.name.replace(/\.[^.]+$/, '')
    }))
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

const grouped = computed(() => {
  const groups = groupFiles(files.value, 'images')
  const map = {}
  for (const g of groups) {
    map[g.title] = g.items.map(f => ({
      ...f,
      displayName: f.name.replace(/\.[^.]+$/, '')
    }))
  }
  return map
})

async function preview(item) {
  if (!item) return
  selectedFile.value = item.path
  loading.value = true
  previewItem.value = null
  error.value = ''
  try {
    const url = await getImageUrl('images', item.path.replace(/^images\//, ''))
    previewItem.value = { ...item, proxyUrl: url }
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

.sidenav-category {
  margin-bottom: 0.5rem;
}

.category-label {
  font-size: 0.75rem;
  color: #666;
  padding: 0.3rem 0.8rem;
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

.image-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 60vh;
  width: 100%;
  box-sizing: border-box;
  padding: 4rem 2rem;
}

.image-container img {
  max-width: 100%;
  max-height: calc(100vh - 200px);
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>
