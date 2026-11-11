import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/image',
    name: 'Image',
    component: () => import('../views/Image.vue')
  },
  {
    path: '/sound',
    name: 'Sound',
    component: () => import('../views/Sound.vue')
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('../views/Status.vue')
  },
  {
    path: '/dev',
    name: 'Dev',
    component: () => import('../views/Dev.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // 只在页面切换时回到顶部；仅 query 变化（切章节 / 打开大图）保持当前位置
    if (to.path !== from.path) return { top: 0 }
    return false
  }
})

export default router
