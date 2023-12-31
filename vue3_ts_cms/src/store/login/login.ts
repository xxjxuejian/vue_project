// login相关的store
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { defineStore } from 'pinia'
import { mapRouter } from '@/utils/dyMapRouter'
import useSystemStore from '../system/system'

// 定义state的类型
interface ILoginState {
  name: string
  token: string
  userInfo: any
  userMenus: any
  activeMenu: string
}

// 给state中的返回的变量添加类型的方法
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    name: '',
    token: '',
    userInfo: {},
    userMenus: [],
    activeMenu: ''
  }),
  actions: {
    // 登录的时候做的一些操作
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
        // 用户的信息也需要缓存下来，不然刷新页面就没了
        localCache.setCache('userInfo', this.userInfo)
        this.name = this.userInfo.name

        // 拿到用户的角色菜单树,根据这个角色菜单树，展示不同的菜单
        // 角色菜单树也需要缓存，不然刷新就没了
        console.log('角色信息', this.userInfo.role)
        // 角色id
        const roleId = this.userInfo.role.id
        const userMenus = await getUserMenusByRoleId(roleId)
        this.userMenus = userMenus.data
        localCache.setCache('userMenus', this.userMenus)
        console.log('用户菜单树', this.userMenus)

        // 顺便获取所有的角色列表，部门列表
        const systemStore = useSystemStore()
        systemStore.fetchEntireRolesAction()
        systemStore.fetchEntireDepartmentsAction()

        // 根据用户菜单树信息，动态的注册路由
        // 1.获取所有的注册好的路由信息
        // 2.动态添加路由
        const routes = mapRouter(this.userMenus)
        routes.forEach((item) => {
          router.addRoute('main', item)
        })

        router.push('/main')
      }
    },
    // 页面刷新的时候做的一些操作
    loadLocalCacheAction() {
      this.token = localCache.getCache(LOGIN_TOKEN)
      this.name = localCache.getCache('name')
      this.userInfo = localCache.getCache('userInfo')
      this.userMenus = localCache.getCache('userMenus')
      if (this.token) {
        // 页面刷新也需要重新获取一次角色/部门列表
        const systemStore = useSystemStore()
        systemStore.fetchEntireRolesAction()
        systemStore.fetchEntireDepartmentsAction()

        const routes = mapRouter(this.userMenus)
        routes.forEach((item) => {
          router.addRoute('main', item)
        })
      } else {
        router.push('/login')
      }
    }
  }
})

export default useLoginStore
