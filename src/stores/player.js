import { computed, ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'

const VOLUME_KEY = 'chireiden:volume'
const LOOP_KEY = 'chireiden:loop'
const LOOP_MODES = ['list', 'one', 'shuffle']

function readVolume() {
  try {
    const raw = Number(localStorage.getItem(VOLUME_KEY))
    if (Number.isFinite(raw) && raw >= 0 && raw <= 1) return raw
  } catch {
    /* ignore */
  }
  // 站点一直沿用 10% 的默认音量
  return 0.1
}

function readLoop() {
  try {
    const raw = localStorage.getItem(LOOP_KEY)
    if (LOOP_MODES.includes(raw)) return raw
  } catch {
    /* ignore */
  }
  return 'list'
}

export const usePlayerStore = defineStore('player', () => {
  const queue = ref([])
  const index = ref(-1)
  const playing = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(readVolume())
  const muted = ref(false)
  const loop = ref(readLoop())

  const audio = shallowRef(null)
  let lastVolume = volume.value || 0.4

  const current = computed(() => queue.value[index.value] ?? null)
  const hasTrack = computed(() => Boolean(current.value))
  const progress = computed(() => (duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0))
  const hasNext = computed(() => queue.value.length > 1)
  const hasPrev = computed(() => queue.value.length > 1)

  function ensureAudio() {
    if (audio.value) return audio.value
    const el = new Audio()
    el.preload = 'metadata'
    el.volume = volume.value
    el.muted = muted.value

    el.addEventListener('timeupdate', () => {
      currentTime.value = el.currentTime || 0
    })
    el.addEventListener('loadedmetadata', () => {
      duration.value = Number.isFinite(el.duration) ? el.duration : 0
    })
    el.addEventListener('durationchange', () => {
      duration.value = Number.isFinite(el.duration) ? el.duration : 0
    })
    el.addEventListener('play', () => { playing.value = true })
    el.addEventListener('pause', () => { playing.value = false })
    el.addEventListener('ended', handleEnded)
    el.addEventListener('error', () => {
      playing.value = false
      duration.value = 0
    })

    audio.value = el
    return el
  }

  async function startTrack(target) {
    if (!target) return
    const el = ensureAudio()
    currentTime.value = 0
    duration.value = 0
    el.src = target.src
    el.volume = volume.value
    el.muted = muted.value
    try {
      await el.play()
    } catch {
      // 浏览器可能拦截自动播放：保持暂停态，等用户再次点击
      playing.value = false
    }
  }

  function playQueue(list, startIndex = 0) {
    if (!Array.isArray(list) || list.length === 0) return
    queue.value = list
    const safeIndex = Math.min(Math.max(0, startIndex), list.length - 1)
    index.value = safeIndex
    startTrack(list[safeIndex])
  }

  // 播放单曲：如果已经在队列里，就切换过去，避免列表状态丢失
  function play(track) {
    if (!track) return
    const existing = queue.value.findIndex((item) => item.src === track.src)
    if (existing >= 0) {
      index.value = existing
      startTrack(queue.value[existing])
      return
    }
    queue.value = [track]
    index.value = 0
    startTrack(track)
  }

  function toggle() {
    const el = ensureAudio()
    if (!current.value) return
    if (!el.src) {
      startTrack(current.value)
      return
    }
    if (el.paused) {
      el.play().catch(() => { playing.value = false })
    } else {
      el.pause()
    }
  }

  function next() {
    const list = queue.value
    if (!list.length) return
    if (loop.value === 'shuffle' && list.length > 1) {
      let target = index.value
      while (target === index.value) target = Math.floor(Math.random() * list.length)
      index.value = target
      startTrack(list[target])
      return
    }
    const nextIndex = index.value + 1
    if (nextIndex >= list.length) {
      if (loop.value === 'list') {
        index.value = 0
        startTrack(list[0])
      }
      return
    }
    index.value = nextIndex
    startTrack(list[nextIndex])
  }

  function prev() {
    const el = ensureAudio()
    if (el.currentTime > 3) {
      el.currentTime = 0
      return
    }
    const list = queue.value
    if (!list.length) return
    const prevIndex = index.value - 1 < 0 ? list.length - 1 : index.value - 1
    index.value = prevIndex
    startTrack(list[prevIndex])
  }

  function handleEnded() {
    if (loop.value === 'one') {
      const el = ensureAudio()
      el.currentTime = 0
      el.play().catch(() => { playing.value = false })
      return
    }
    const list = queue.value
    if (!list.length) {
      playing.value = false
      return
    }
    if (loop.value === 'shuffle' && list.length > 1) {
      let target = index.value
      while (target === index.value) target = Math.floor(Math.random() * list.length)
      index.value = target
      startTrack(list[target])
      return
    }
    const nextIndex = index.value + 1
    if (nextIndex >= list.length) {
      if (loop.value === 'list') {
        index.value = 0
        startTrack(list[0])
      } else {
        playing.value = false
      }
      return
    }
    index.value = nextIndex
    startTrack(list[nextIndex])
  }

  function seekTo(seconds) {
    const el = ensureAudio()
    if (!Number.isFinite(el.duration) || el.duration <= 0) return
    el.currentTime = Math.min(Math.max(0, seconds), el.duration)
    currentTime.value = el.currentTime
  }

  function seekPercent(percent) {
    const el = ensureAudio()
    if (!Number.isFinite(el.duration) || el.duration <= 0) return
    seekTo((el.duration * Math.min(100, Math.max(0, percent))) / 100)
  }

  function setVolume(value) {
    const next = Math.min(1, Math.max(0, value))
    volume.value = next
    if (next > 0) lastVolume = next
    muted.value = next === 0
    const el = ensureAudio()
    el.volume = next
    el.muted = muted.value
    try {
      localStorage.setItem(VOLUME_KEY, String(next))
    } catch {
      /* ignore */
    }
  }

  function toggleMute() {
    const el = ensureAudio()
    if (volume.value > 0) {
      lastVolume = volume.value
      el.muted = true
      muted.value = true
      el.volume = 0
    } else {
      const restored = lastVolume || 0.4
      volume.value = restored
      muted.value = false
      el.muted = false
      el.volume = restored
    }
  }

  function cycleLoop() {
    const at = LOOP_MODES.indexOf(loop.value)
    loop.value = LOOP_MODES[(at + 1) % LOOP_MODES.length]
    try {
      localStorage.setItem(LOOP_KEY, loop.value)
    } catch {
      /* ignore */
    }
  }

  function stop() {
    const el = ensureAudio()
    el.pause()
    el.removeAttribute('src')
    el.load()
    playing.value = false
    currentTime.value = 0
    duration.value = 0
    queue.value = []
    index.value = -1
  }

  return {
    queue,
    index,
    current,
    hasTrack,
    playing,
    currentTime,
    duration,
    progress,
    volume,
    muted,
    loop,
    hasNext,
    hasPrev,
    playQueue,
    play,
    toggle,
    next,
    prev,
    seekTo,
    seekPercent,
    setVolume,
    toggleMute,
    cycleLoop,
    stop
  }
})
