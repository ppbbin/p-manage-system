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

//添加路由守卫拦截，判断用户登录状态以跳转到对应页面
router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  let token = store.state.user.token
  // 过滤登录页，防止死循环
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
