<template>
  <div class="dev">
    <h2>🛠️ 开发页</h2>
    <p class="tip">画布图片组件演示：滚轮缩放、拖动平移、双击复位，图片不会拖出画布。</p>
    <div class="demo">
      <ImageCanvas
        src="https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/images/%E4%B8%BB%E9%A1%B5%E5%B0%81%E9%9D%A2.jpg"
        alt="画布演示图片"
        height="520px"
      />
    </div>
  </div>
</template>

<script setup>
import ImageCanvas from '../components/ImageCanvas/ImageCanvas.vue'
</script>

<style scoped>
.dev {
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

h2 {
  color: #333;
}

.tip {
  color: #666;
  margin: 0.5rem 0 1.5rem;
}

.demo {
  width: 100%;
}
</style>
