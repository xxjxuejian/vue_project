import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/cache'
const router = createRouter({
  history: createWebHashHistory(),
  // 路径和组件的映射关系
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/notFound/not-Found.vue')
    }
  ]
})

// 导航守卫，没有登陆进不去
// to：跳转到哪里，from:从哪里跳转过来
// return ： 决定返回导航的路径
router.beforeEach((to, from) => {
  // 看看有没有token
  const token = localCache.getCache(LOGIN_TOKEN)

  // 如果去往main页面，同时没有登录，就重定向到login页面
  if (to.path === '/main') {
    // 只要登录成功才能进入到main页面,token有值
    // 如果token没有值，说明没有登录，跳转到登录页面
    if (!token) return '/login'
  }
})

export default router
