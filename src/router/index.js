import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * 重写路由的push方法
 * 解决，相同路由跳转时，报错
 * 添加，相同路由跳转时，触发watch (针对el-menu，仅限string方式传参，形如"view?id=5")
 */

// 保存原来的push函数
const routerPush = VueRouter.prototype.push
// 重写push函数
VueRouter.prototype.push = function push(location) {
  // 这个if语句在跳转相同路径的时候，在路径末尾添加新参数（一些随机数字）
  // 用来触发watch
  if (typeof location == 'string') {
    let Separator = '&'
    if (location.indexOf('?') === -1) {
      Separator = '?'
    }
    location = location + Separator + 'random=' + Math.random()
  }

  // 这个语句用来解决报错
  // 调用原来的push函数，并捕获异常
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login')
    }
  ]
})
export default router
