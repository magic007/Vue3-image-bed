import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Bmob from 'hydrogen-js-sdk'

// 初始化
Bmob.initialize("e7cebb69e9ed76e9", "111111");

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
