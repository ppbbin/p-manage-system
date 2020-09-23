import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全局配置
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/api/config'
import './mock'

//第三方包
import ElementUI from 'element-ui'

Vue.use(ElementUI)

// 将http对象挂载到Vue原型上，实现所有Vue实例都可以通过$http调用这个HTTP对象
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
