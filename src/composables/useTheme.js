import { ref, watch } from 'vue'

const THEME_KEY = 'chireiden:theme'

function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const theme = ref(readTheme())

function apply(value) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = value
}

apply(theme.value)

watch(theme, (value) => {
  apply(value)
  try {
    localStorage.setItem(THEME_KEY, value)
  } catch {
    /* 隐身模式等场景忽略 */
  }
})

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  function set(value) {
    theme.value = value === 'dark' ? 'dark' : 'light'
  }
  return { theme, toggle, set }
}
