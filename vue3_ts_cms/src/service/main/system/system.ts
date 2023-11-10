import hyRequest from '@/service'

export function postUsersListData(queryInfo = { offset: 0, size: 10 }) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
