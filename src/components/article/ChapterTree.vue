<template>
  <div class="chapter-tree">
    <div class="ct-head">
      <span class="ct-title">章节目录</span>
      <span class="ct-count">{{ total }} 篇</span>
    </div>

    <label class="ct-search">
      <Icon name="search" :size="15" />
      <input v-model="query" type="search" placeholder="搜索章节…" aria-label="搜索章节" />
    </label>

    <div class="ct-scroll">
      <section v-for="group in visibleGroups" :key="group.title" class="ct-group">
        <button type="button" class="ct-group-head" @click="toggle(group.title)">
          <Icon :name="isOpen(group.title) ? 'chevron-down' : 'chevron-right'" :size="14" />
          <span class="ct-group-name">{{ group.title }}</span>
          <span class="ct-group-count">{{ group.items.length }}</span>
        </button>

        <div v-show="isOpen(group.title)" class="ct-items">
          <button
            v-for="item in group.items"
            :key="item.path"
            type="button"
            class="ct-item"
            :class="{ 'is-active': item.path === selected }"
            @click="$emit('select', item)"
          >
            <span class="ct-item-name">{{ item.displayName }}</span>
            <span v-if="item.fileType === 'pdf'" class="ct-tag">PDF</span>
          </button>
        </div>
      </section>

      <p v-if="!visibleGroups.length" class="ct-empty">没有匹配的章节</p>
      <div v-if="loading" class="ct-skeleton">
        <span v-for="n in 5" :key="n" class="skeleton" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Icon from '../ui/Icon.vue'

const props = defineProps({
  groups: { type: Array, default: () => [] },
  selected: { type: String, default: '' },
  loading: { type: Boolean, default: false }
})

defineEmits(['select'])

const query = ref('')
const closed = ref(new Set())

const total = computed(() => props.groups.reduce((sum, g) => sum + g.items.length, 0))

const visibleGroups = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return props.groups
  return props.groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.displayName.toLowerCase().includes(keyword))
    }))
    .filter((group) => group.items.length > 0)
})

function isOpen(title) {
  if (query.value.trim()) return true
  return !closed.value.has(title)
}

function toggle(title) {
  const next = new Set(closed.value)
  if (next.has(title)) next.delete(title)
  else next.add(title)
  closed.value = next
}
</script>

<style scoped>
.chapter-tree {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}

.ct-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 4px 10px;
}

.ct-title {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--ink);
}

.ct-count {
  font-size: 0.7rem;
  color: var(--ink-faint);
  font-variant-numeric: tabular-nums;
}

.ct-search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding: 7px 11px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink-faint);
  transition: border-color var(--fast);
}

.ct-search:focus-within {
  border-color: var(--accent);
}

.ct-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: none;
  font-size: 0.82rem;
  color: var(--ink);
}

.ct-search input::placeholder {
  color: var(--ink-faint);
}

.ct-search input::-webkit-search-cancel-button {
  appearance: none;
}

.ct-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin-right: -6px;
  padding-right: 6px;
}

.ct-group + .ct-group {
  margin-top: 6px;
}

.ct-group-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 6px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--ink-soft);
  transition: background var(--fast), color var(--fast);
}

.ct-group-head:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.ct-group-name {
  flex: 1;
  text-align: left;
  font-family: var(--font-serif);
  font-size: 0.86rem;
}

.ct-group-count {
  font-size: 0.68rem;
  color: var(--ink-faint);
  font-variant-numeric: tabular-nums;
}

.ct-items {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin: 2px 0 4px;
}

.ct-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 26px;
  border-radius: 8px;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--ink-soft);
  text-align: left;
  transition: background var(--fast), color var(--fast);
}

.ct-item:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.ct-item.is-active {
  background: var(--accent-soft);
  color: var(--accent-ink);
  font-weight: 600;
}

.ct-item-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ct-tag {
  flex-shrink: 0;
  padding: 0 5px;
  border-radius: 4px;
  background: var(--accent-2-soft);
  color: var(--accent-2);
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  line-height: 1.6;
}

.ct-empty {
  padding: 18px 8px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--ink-faint);
}

.ct-skeleton {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 6px;
}

.ct-skeleton span {
  height: 26px;
}
</style>
