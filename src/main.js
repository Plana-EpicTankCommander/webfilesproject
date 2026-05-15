import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import InlinePlayer from './components/InlinePlayer/InlinePlayer.vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('inline-music-player', InlinePlayer)

app.mount('#app')
