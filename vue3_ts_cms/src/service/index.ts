import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constant'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      // 添加headers信息
      const token = localCache.getCache(LOGIN_TOKEN)
      // 现在是只要发送网络请求都会拦截判断
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      return config
    }
  }
})

export default hyRequest
