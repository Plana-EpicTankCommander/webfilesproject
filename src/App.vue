<template>
  <div id="app">
    <aside class="sidebar">
      <div class="sidebar-title">📂 导航</div>
      <router-link to="/" class="sidebar-link">🏠 主页</router-link>
      <router-link to="/article" class="sidebar-link">📝 文章</router-link>
      <router-link to="/image" class="sidebar-link">🖼️ 图片</router-link>
      <router-link to="/sound" class="sidebar-link">🎵 声音</router-link>
      <router-link to="/status" class="sidebar-link">📊 状态</router-link>
      <router-link to="/dev" class="sidebar-link">🛠️ 开发</router-link>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 140px;
  background: #1a1a1a;
  color: #fff;
  padding: 1.5rem 0.5rem;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar-title {
  font-size: 0.8rem;
  color: #888;
  padding: 0 0.5rem 0.8rem;
  border-bottom: 1px solid #333;
  margin-bottom: 0.8rem;
}

.sidebar-link {
  display: block;
  padding: 0.65rem 0.8rem;
  color: #ccc;
  text-decoration: none;
  font-size: 0.95rem;
  border-radius: 6px;
  margin: 0.2rem 0.3rem;
  transition: background 0.2s, color 0.2s;
}

.sidebar-link:hover {
  background: #333;
  color: #fff;
}

.sidebar-link.router-link-active {
  background: #4a90e2;
  color: #fff;
}

main {
  flex: 1;
  min-width: 0;
}
</style>
