export default {
  path: '/main/system/user',
  component: () => import('@/views/main/system/user/user.vue')
  //  component: () => import('../views/main/system/user/user.vue')
  // 为什么../会报错
}
