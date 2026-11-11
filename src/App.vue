<template>
  <div class="shell">
    <SideNav class="shell-nav" />

    <header class="mobile-topbar">
      <router-link to="/" class="mt-brand" aria-label="回到主页">
        <span class="mt-mark"><Icon name="eye" :size="17" :stroke-width="1.6" /></span>
        <span class="mt-name">古明地灵殿</span>
      </router-link>
      <button type="button" class="btn-icon" :aria-label="theme === 'dark' ? '切换浅色主题' : '切换深色主题'" @click="toggle">
        <Icon :name="theme === 'dark' ? 'sun' : 'moon'" :size="19" />
      </button>
    </header>

    <main class="shell-main" :class="{ 'has-player': player.hasTrack }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <MobileTabBar />
    <PlayerBar />
  </div>
</template>

<script setup>
import SideNav from './components/layout/SideNav.vue'
import MobileTabBar from './components/layout/MobileTabBar.vue'
import PlayerBar from './components/player/PlayerBar.vue'
import Icon from './components/ui/Icon.vue'
import { useTheme } from './composables/useTheme'
import { usePlayerStore } from './stores/player'

const { theme, toggle } = useTheme()
const player = usePlayerStore()
</script>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: var(--sidebar-w) minmax(0, 1fr);
  min-height: 100vh;
}

.shell-main {
  min-width: 0;
  transition: padding-bottom 0.2s var(--ease);
}

.shell-main.has-player {
  padding-bottom: var(--player-h);
}

.mobile-topbar {
  display: none;
}

@media (max-width: 1080px) and (min-width: 769px) {
  .shell {
    --sidebar-w: 74px;
  }
}

@media (max-width: 768px) {
  .shell {
    grid-template-columns: minmax(0, 1fr);
  }

  .shell-nav {
    display: none;
  }

  .mobile-topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc(var(--topbar-h) + env(safe-area-inset-top, 0px));
    padding: 0 16px;
    padding-top: env(safe-area-inset-top, 0px);
    background: color-mix(in srgb, var(--surface) 90%, transparent);
    border-bottom: 1px solid var(--line);
    backdrop-filter: blur(14px);
  }

  .mt-brand {
    display: inline-flex;
    align-items: center;
    gap: 9px;
  }

  .mt-mark {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    color: #fff;
    background: linear-gradient(145deg, #7b56c4, #4d3488);
  }

  .mt-name {
    font-family: var(--font-serif);
    font-size: 0.98rem;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  .shell-main {
    padding-top: calc(var(--topbar-h) + env(safe-area-inset-top, 0px));
  }

  .shell-main.has-player {
    padding-bottom: calc(66px + var(--tabbar-h) + env(safe-area-inset-bottom, 0px));
  }
}
</style>
