// 1. 区分开发环境时的服务器,和生产环境时的服务器
// export const BASE_URL = 'http://coderwhy:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2. vite默认提供的环境变量,
/*
  如果使用npm run dev import.meta.env.DEV 表示的是这时候是开发环境
  如果使用npm run build -> npm run preview 这时候import.meta.env === 'production'表示的是生产环境
  就可以通过import.meta.env的值切换不同的服务器地址或者其他的东西
*/
let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://codercba.com:5000'
} else {
  // 开发环境
  // BASE_URL = 'http://codercba.com:5000'
  BASE_URL = 'http://codercba.com:5000'
}

// 3.通过.env文件来设置
/*
  .env  //默认总会读取的文件
  .env.[mode] ...mode是固定的
  .env.development  //development环境读取的文件
  .env.production   //production 环境读取的文件
  .env.production.local  //git提交会忽略的文件
*/

export const TIME_OUT = 10000
export { BASE_URL }
