import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    currentMenu: null,
    menu: [],
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  },
  mutations: {
    clearTabList(state) {
      state.tabList = [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 'home'
        }
      ]
    },
    // 动态路由设置
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    // 清除cookie
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    // 添加
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      let currentMenu = [
        {
          path: '/',
          component: () => import(`@/views/Main`),
          children: []
        }
      ]
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      router.addRoutes(currentMenu)
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        let result = state.tabList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabList.push(val) : false
      } else {
        state.currentMenu = null
      }
    },
    closeTab(state, val) {
      let result = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(result, 1)
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
