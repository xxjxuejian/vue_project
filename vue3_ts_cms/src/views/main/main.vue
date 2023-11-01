<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { useRouter } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/cache'
import mainAside from '@/components/main-aside/mainAside.vue'
import mainHeader from '@/components/main-header/mainHeader.vue'

const loginStore = useLoginStore()
const router = useRouter()
// 退出登录的按钮事件
function quitLogin() {
  // 1.删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 2.跳转到login页面
  router.push('/login')
}
</script>

<template>
  <div class="main">
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <mainAside></mainAside>
        </el-aside>
        <el-container>
          <el-header>
            <mainHeader></mainHeader>
          </el-header>
          <el-main>
            <h2>欢迎用户{{ loginStore.name }}</h2>
            <button @click="quitLogin">退出登录</button>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="less">
.main {
  height: 100%;
  .common-layout {
    height: 100%;
    .el-container {
      height: 100%;
      .el-header {
        background-color: aquamarine;
      }
    }
    .el-aside {
    }

    .el-main {
      background-color: skyblue;
    }
  }
}
</style>
