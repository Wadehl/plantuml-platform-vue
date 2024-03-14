import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:uno.css'

import pinia from './store'

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

createApp(App).use(pinia).mount('#app')
