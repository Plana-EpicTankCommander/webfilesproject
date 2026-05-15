<template>
  <div class="home">
    <h2>欢迎来到创意工坊</h2>
    <p>选择左侧导航开始～</p>
    <img src="https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/images/%E4%B8%BB%E9%A1%B5%E5%B0%81%E9%9D%A2.jpg" alt="主页封面" class="cover-img">
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}

.cover-img {
  max-width: 49%;
  height: auto;
  display: block;
  margin: 0 auto 2rem;
}

h2 {
  color: #333;
}

p {
  color: #666;
  margin-top: 0.5rem;
}
</style>
