import { defineStore } from 'pinia'
import {
  postUsersListData,
  deleteUserById,
  getEntireRoles,
  getEntireDepartments,
  newUserData,
  editUserData
} from '@/service/main/system/system'
import type { ISystemState } from './types'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    // 获取用户列表的网络请求
    async postUsersListAction(queryInfo = { offset: 0, size: 10 }) {
      const userListResult = await postUsersListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    // 删除指定用户的请求
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
    },
    // 获取所有角色列表的网络请求
    async fetchEntireRolesAction() {
      const entireRolesResult = await getEntireRoles()
      this.entireRoles = entireRolesResult.data.list
      console.log('juese', this.entireRoles)
    },
    // 获取所有的部门列表的网络请求
    async fetchEntireDepartmentsAction() {
      const entireDepartmentsResult = await getEntireDepartments()
      this.entireDepartments = entireDepartmentsResult.data.list
      console.log('bumen', this.entireDepartments)
    },
    // 创建新用户的网络请求
    async newUserDataAction(userInfo: any) {
      const newUserResult = await newUserData(userInfo)
      console.log(newUserResult)
    },
    // 编辑并更新数据
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
    }
  }
})

export default useSystemStore
