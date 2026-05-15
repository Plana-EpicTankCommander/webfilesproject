<template>
  <nav class="navbar">
    <div class="nav-buttons">
      <router-link to="/" class="nav-btn">主页</router-link>
      <router-link to="/article" class="nav-btn">文章</router-link>
      <router-link to="/image" class="nav-btn">图片</router-link>
      <router-link to="/sound" class="nav-btn">声音</router-link>
      <router-link to="/status" class="nav-btn">状态</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  padding: 1rem;
  background: #fff;
}

.nav-buttons {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: #222;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}

.nav-btn:hover {
  background: #444;
}

.nav-btn:active {
  background: #000;
}

.nav-btn.router-link-active {
  background: #000;
}
</style>
