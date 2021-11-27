// Vue3引入的不再是 Vue 构造函数了
// 而是 createApp ，之后注册全局组件不需要使用 new Vue 了
import {createApp} from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store' // 引入 vuex
// 全局样式
import './assets/css/index.css'
// 全局引入Element-Plus
import ElementPlus from "element-plus"
// 引入样式出BUG
import '../node_modules/element-plus/dist/index.css'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
