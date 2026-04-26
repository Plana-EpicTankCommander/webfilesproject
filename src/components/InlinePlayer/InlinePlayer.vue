<template>
  <div class="inline-player-container">
    <div class="ip-info">
      <h3>{{ title }}</h3>
    </div>

    <div class="ip-controls">
      <div class="ip-progress-container">
        <button @click="togglePlay" class="ip-control-btn" :class="{ playing: isPlaying, paused: !isPlaying }">
          <span v-if="!isPlaying">▶</span>
          <span v-else>⏸</span>
        </button>
        <span class="ip-time">{{ formatTime(currentTime) }}</span>
        <div class="ip-progress-bar" v-if="duration > 0">
          <div class="ip-progress" :style="{ width: progress + '%' }"></div>
          <input
            type="range"
            min="0"
            max="100"
            :value="progress"
            @input="seek"
            class="ip-progress-slider"
          />
        </div>
        <span class="ip-time">{{ formatTime(duration) }}</span>
      </div>
      <div class="ip-volume-control" v-if="duration > 0">
        <span class="ip-volume-label">音量</span>
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          v-model="volume"
          @input="setVolume"
          class="ip-volume-slider"
        />
        <span class="ip-volume-value">{{ volume }}%</span>
      </div>
    </div>

    <div v-if="loading" class="ip-loading">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  title: {
    type: String,
    default: ''
  }
})

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const volume = ref(50)
const loading = ref(false)

let audio = null

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds === 0) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const initAudio = () => {
  if (audio) return
  audio = new Audio(props.src)
  audio.volume = volume.value / 100

  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration
    loading.value = false
  })

  audio.addEventListener('timeupdate', () => {
    if (audio && !isNaN(audio.duration)) {
      currentTime.value = audio.currentTime
      progress.value = (audio.currentTime / audio.duration) * 100
    }
  })

  audio.addEventListener('ended', () => {
    isPlaying.value = false
    progress.value = 0
    currentTime.value = 0
  })

  audio.addEventListener('waiting', () => { loading.value = true })
  audio.addEventListener('playing', () => { loading.value = false })
  audio.addEventListener('loadeddata', () => { loading.value = false })
  audio.addEventListener('error', () => { loading.value = false })
}

const togglePlay = async () => {
  initAudio()
  if (!audio) return

  try {
    if (isPlaying.value) {
      audio.pause()
      isPlaying.value = false
    } else {
      await audio.play()
      isPlaying.value = true
    }
  } catch (err) {
    console.error('播放失败:', err)
    isPlaying.value = false
  }
}

const seek = (event) => {
  if (!audio || !duration.value) return
  const target = event.target
  audio.currentTime = (duration.value * parseInt(target.value)) / 100
  progress.value = parseInt(target.value)
}

const setVolume = (event) => {
  if (!audio) return
  const target = event.target
  audio.volume = parseInt(target.value) / 100
  volume.value = parseInt(target.value)
}

watch(() => props.src, (newSrc) => {
  if (audio) {
    audio.src = newSrc
    audio.load()
    isPlaying.value = false
    progress.value = 0
    currentTime.value = 0
  }
})

onUnmounted(() => {
  if (audio) {
    audio.pause()
    audio = null
  }
})
</script>

<style scoped>
.inline-player-container {
  width: 100%;
  max-width: 600px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 12px 0;
  color: #333;
  display: block;
}

.ip-info {
  text-align: center;
  margin-bottom: 20px;
}

.ip-info h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2em;
}

.ip-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ip-progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.ip-control-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 12px;
  transition: all 0.3s ease;
}

.ip-control-btn:hover {
  transform: scale(1.1);
}

.ip-control-btn.paused {
  background: #f44336;
}

.ip-control-btn.playing {
  background: #4CAF50;
}

.ip-time {
  font-size: 0.85em;
  color: #666;
  min-width: 40px;
  text-align: center;
}

.ip-progress-bar {
  flex: 1;
  position: relative;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.ip-progress {
  position: absolute;
  height: 100%;
  background: #1a73e8;
  border-radius: 3px;
  transition: width 0.1s linear;
}

.ip-progress-slider {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
  top: 0;
  left: 0;
}

.ip-volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 5px;
}

.ip-volume-label {
  color: #666;
  font-size: 0.85em;
  min-width: 35px;
}

.ip-volume-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #e0e0e0;
  border-radius: 2px;
  outline: none;
}

.ip-volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #1a73e8;
  border-radius: 50%;
  cursor: pointer;
}

.ip-volume-value {
  color: #666;
  font-size: 0.85em;
  min-width: 35px;
  text-align: right;
}

.ip-loading {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9em;
}
</style>
