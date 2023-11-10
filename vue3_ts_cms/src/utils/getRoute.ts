// 从所有的菜单树中找出当前路由对应的那个,用在面包屑导航上

export default function getMenuInfoFromRoute(routes: any, path: string) {
  const res = []
  for (const route of routes) {
    if (route.url === path) {
      res.push({ name: route.name, url: route.url })
      return res
    }
    if (route.children) {
      res.push({ name: route.name, url: route.url })
      const r: any = getMenuInfoFromRoute(route.children, path)
      if (r.length === 0) {
        res.pop()
      } else {
        res.push(...r)
        return res
      }
    }
  }
  return res
}
