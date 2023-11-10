/// <reference types="vite/client" />

// 声明所有的.vue文件的类型是一个DefineComponent类型
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '*.mjs'
