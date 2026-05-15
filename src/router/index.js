import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Image from '../views/Image.vue'
import Sound from '../views/Sound.vue'
import Status from '../views/Status.vue'
import Dev from '../views/Dev.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/image',
    name: 'Image',
    component: Image
  },
  {
    path: '/sound',
    name: 'Sound',
    component: Sound
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/dev',
    name: 'Dev',
    component: Dev
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
