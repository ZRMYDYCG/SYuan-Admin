import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import 'normalize.css'
import 'element-plus/theme-chalk/el-message.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.mount('#app')
