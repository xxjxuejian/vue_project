function getLocalRouter() {
  // 1.获取所有的注册好的路由信息
  const mainSubRoutes = []
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    mainSubRoutes.push(module.default)
  }

  return mainSubRoutes
}

// 2. 动态添加路由,获取到路由数组
function mapRouter(userMenus: any) {
  const mainSubRoutes = getLocalRouter()
  const routes = [] //存放匹配的路由的数组
  let firstRoute = ''

  for (const menus of userMenus) {
    let isAddRedirect = false

    for (const subMenu of menus.children) {
      // route返回的是匹配到的路由对象，一个完整的路由对象
      const route = mainSubRoutes.find((item) => {
        // 所有的路由数组中的路由 和 菜单树中的路由 匹配
        return item.path === subMenu.url
      })
      if (route) {
        if (!isAddRedirect) {
          routes.push({ path: menus.url, redirect: subMenu.url })
          isAddRedirect = true
        }
        // 添加一个main页面的默认跳转路由,还要激活对应的按钮
        if (!firstRoute) {
          routes.push({ path: '/main', redirect: subMenu.url })
          firstRoute = subMenu.url
        }
        routes.push(route)
      }
    }
  }

  return routes
}

// 3. 根据当前路由匹配对应的导航按钮
function matchBtnfromUrl(path: any, userMenus: any) {
  // 去userMenus中找到对应的路由，它有id值
  for (const menus of userMenus) {
    for (const item of menus.children) {
      if (path === item.url) {
        return item
      }
    }
  }
  return undefined
}

export { getLocalRouter, mapRouter, matchBtnfromUrl }
