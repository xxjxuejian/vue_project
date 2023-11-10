import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'
import 'element-plus/dist/index.css'
import useLoginStore from './store/login/login'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
app.use(registerIcons)
app.use(pinia)

const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()

app.use(router) //路由中需要使用pinia中的数据，要在pinia后面,路由都注册好以后在使用路由

app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
