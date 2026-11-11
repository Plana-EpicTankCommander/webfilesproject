<template>
  <nav class="toc" aria-label="本页目录">
    <p class="toc-title">本页目录</p>
    <ul class="toc-list">
      <li v-for="item in items" :key="item.id">
        <button
          type="button"
          class="toc-item"
          :class="{ 'is-active': item.id === activeId }"
          :style="{ paddingLeft: 8 + (Math.min(item.level, 4) - 1) * 10 + 'px' }"
          @click="$emit('navigate', item.id)"
        >
          {{ item.text }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  activeId: { type: String, default: '' }
})

defineEmits(['navigate'])
</script>

<style scoped>
.toc {
  position: sticky;
  top: 104px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding: 16px 10px 16px 14px;
  border-left: 1px solid var(--line);
}

.toc-title {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 10px;
  padding-left: 8px;
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.toc-item {
  position: relative;
  display: block;
  width: 100%;
  padding: 5px 8px;
  border-radius: 6px;
  text-align: left;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--ink-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color var(--fast), background var(--fast);
}

.toc-item:hover {
  color: var(--ink);
  background: var(--surface-2);
}

.toc-item.is-active {
  color: var(--accent-ink);
  background: var(--accent-soft);
  font-weight: 600;
}

.toc-item.is-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 12px;
  border-radius: 2px;
  background: var(--accent);
}
</style>
