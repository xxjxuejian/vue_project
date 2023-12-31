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

// 一个更加通用的请求函数,参数传递，指定请求哪一个页面的数据
// 前提是后端的接口是/users/list, /department/list .....等形式
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

// 删除某个页面的操作
export function deletePageDataById(pageName: string, deleteId: number) {
  return hyRequest.delete({
    url: `/${pageName}/${deleteId}`
  })
}

// 给某一个页面添加一条数据的操作
export function createPageData(pageName: string, DataInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: DataInfo
  })
}

// 给某一个页面编辑数据得操作
export function editPageData(pageName: string, DataInfo: any, eidtId: number) {
  return hyRequest.patch({
    url: `/${pageName}/${eidtId}`,
    data: DataInfo
  })
}
