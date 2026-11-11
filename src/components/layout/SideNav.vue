<template>
  <aside class="sidenav">
    <router-link to="/" class="brand" aria-label="回到主页">
      <span class="brand-mark">
        <Icon name="eye" :size="23" :stroke-width="1.5" />
      </span>
      <span class="brand-text">
        <strong>古明地灵殿</strong>
        <em>Chireiden Archive</em>
      </span>
    </router-link>

    <nav class="nav" aria-label="主导航">
      <router-link
        v-for="item in NAV_ITEMS"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        :class="{ 'is-active': isActive(item.to) }"
      >
        <Icon :name="item.icon" :size="19" />
        <span class="nav-label">{{ item.label }}</span>
        <span v-if="isActive(item.to)" class="nav-dot" aria-hidden="true" />
      </router-link>
    </nav>

    <div class="sidenav-foot">
      <button type="button" class="foot-btn" @click="toggle">
        <Icon :name="theme === 'dark' ? 'sun' : 'moon'" :size="17" />
        <span>{{ theme === 'dark' ? '切换浅色' : '切换深色' }}</span>
      </button>
      <router-link class="foot-btn" to="/dev">
        <Icon name="sliders" :size="17" />
        <span>开发预览</span>
      </router-link>
      <a class="foot-btn" :href="SITE.repo" target="_blank" rel="noreferrer">
        <Icon name="github" :size="17" />
        <span>源码仓库</span>
      </a>
      <p class="foot-note">
        内容托管于 GitHub<br />
        <span class="foot-dot" /> 未登录 API 限 60 次/时
      </p>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Icon from '../ui/Icon.vue'
import { NAV_ITEMS, SITE } from '../../site'
import { useTheme } from '../../composables/useTheme'

const route = useRoute()
const { theme, toggle } = useTheme()

function isActive(to) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}
</script>

<style scoped>
.sidenav {
  position: sticky;
  top: 0;
  height: 100vh;
  width: var(--sidebar-w);
  display: flex;
  flex-direction: column;
  padding: 26px 14px 20px;
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  border-right: 1px solid var(--line);
  backdrop-filter: blur(12px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 8px 22px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(145deg, #7b56c4, #553a94 60%, #3f2a72);
  box-shadow: 0 6px 16px rgba(85, 58, 148, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  min-width: 0;
}

.brand-text strong {
  font-family: var(--font-serif);
  font-size: 1.02rem;
  letter-spacing: 0.06em;
  color: var(--ink);
}

.brand-text em {
  font-style: normal;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-top: 3px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 9px 12px;
  border-radius: 11px;
  font-size: 0.92rem;
  color: var(--ink-soft);
  transition: background var(--fast), color var(--fast);
}

.nav-item:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.nav-item.is-active {
  background: var(--accent-soft);
  color: var(--accent-ink);
  font-weight: 600;
}

.nav-item.is-active::before {
  content: '';
  position: absolute;
  left: -14px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  border-radius: 0 3px 3px 0;
  background: var(--accent);
}

.nav-label {
  flex: 1;
}

.nav-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}

.sidenav-foot {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}

.foot-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 12px;
  border-radius: 9px;
  font-size: 0.82rem;
  color: var(--ink-soft);
  transition: background var(--fast), color var(--fast);
}

.foot-btn:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.foot-note {
  margin: 12px 12px 0;
  font-size: 0.68rem;
  line-height: 1.6;
  color: var(--ink-faint);
}

.foot-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 4px;
  border-radius: 50%;
  background: var(--accent-2);
  vertical-align: middle;
}

/* 平板：收成图标栏 */
@media (max-width: 1080px) and (min-width: 769px) {
  .sidenav {
    width: 74px;
    padding: 22px 10px 18px;
    align-items: center;
  }
  .brand {
    padding: 0 0 20px;
  }
  .brand-text,
  .nav-label,
  .nav-dot,
  .foot-btn span,
  .foot-note {
    display: none;
  }
  .nav-item {
    justify-content: center;
    padding: 11px;
    width: 44px;
  }
  .nav-item.is-active::before {
    left: -10px;
  }
  .foot-btn {
    justify-content: center;
    width: 44px;
    padding: 11px;
  }
}
</style>
