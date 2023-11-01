// login相关的store
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { defineStore } from 'pinia'

// 定义state的类型
interface ILoginState {
  name: string
  token: string
  userInfo: any
  userMenus: any
}

// 给state中的返回的变量添加类型的方法
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? ' ',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: { name: string; password: string }) {
      const res = await accountLoginRequest(account)
      const id = res.data.id
      this.token = res.data.token

      // 2. 本地缓存token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.登录成功跳转
      if (this.token) {
        console.log('登录成功')
        // 在进入页面之前，获取对应用户的详细信息，
        // 请求这个数据之前，需要携带token才行，放到请求拦截中
        const userInfoResult = await getUserInfoById(id)
        this.userInfo = userInfoResult.data
        this.name = this.userInfo.name
        // 拿到用户的角色菜单树,根据这个角色菜单树，展示不同的菜单
        console.log(this.userInfo.role)
        const userMenus = await getUserMenusByRoleId(id)
        this.userMenus = userMenus.data

        router.push('/main')
      }
    }
  }
})

export default useLoginStore
