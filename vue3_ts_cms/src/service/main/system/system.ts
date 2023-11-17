import hyRequest from '@/service'

export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

// 获取角色列表的接口
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

// 获取部分列表的接口
export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}

export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
