import hyRequest from '../index'
// import type { IAccount } from '@/types'

export function accountLoginRequest(account: { name: string; password: string }) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

// 请求某个用户的详细信息
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `users/${id}`
    // 也可以在这里设置设置header中携带的token,但是这里仅仅是在getUserInfoById中添加，其他的操作也需要
    /* headers: {
      Authorization: localCache.getCache(LOGIN_TOKEN)
    } */
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
