import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { registerRouterProgress } from './utils/progress'
import { initializeTheme } from './utils/theme'

import './assets/main.css'

const app = createApp(App)

registerRouterProgress(router)

app.use(createPinia())
app.use(router)

app.mount('#app')
initializeTheme()
