<template>
  <nav class="tabbar" aria-label="底部导航">
    <router-link
      v-for="item in NAV_ITEMS"
      :key="item.to"
      :to="item.to"
      class="tab"
      :class="{ 'is-active': isActive(item.to) }"
    >
      <Icon :name="item.icon" :size="21" />
      <span>{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Icon from '../ui/Icon.vue'
import { NAV_ITEMS } from '../../site'

const route = useRoute()
const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  display: none;
  height: calc(var(--tabbar-h) + env(safe-area-inset-bottom, 0px));
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  border-top: 1px solid var(--line);
  backdrop-filter: blur(14px);
}

.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-size: 0.64rem;
  letter-spacing: 0.04em;
  color: var(--ink-faint);
  transition: color var(--fast);
}

.tab.is-active {
  color: var(--accent);
}

@media (max-width: 768px) {
  .tabbar {
    display: flex;
  }
}
</style>
