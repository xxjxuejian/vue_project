<script setup lang="ts">
import { useRouter } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
import useLoginStore from '@/store/login/login'

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
  <div class="Info">
    <div class="messages">
      <span>some-messages</span>
    </div>
    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="30" src="https://avatars.githubusercontent.com/u/45041803?v=4" />
          <span class="name">{{ loginStore.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="quitLogin">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.Info {
  display: flex;
  align-items: center;
  :global(.el-dropdown-menu__item) {
    line-height: 36px;
    padding: 6px 20px;
  }

  .messages {
    margin-right: 10px;
  }
  .user-info {
    .el-dropdown-link {
      display: flex;
      justify-content: center;
      align-items: center;
      .name {
        font-size: 16px;
        margin-left: 5px;
      }
    }
  }
}
</style>
