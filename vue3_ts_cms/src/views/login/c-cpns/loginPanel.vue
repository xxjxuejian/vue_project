<script setup lang="ts">
import { ref, watch } from 'vue'
// import type { TabsPaneContext } from 'element-plus'
import panelAccount from './panelAccount.vue'
import panelPhone from './panelPhone.vue'
import { localCache } from '@/utils/cache'

const isRemPwd = ref(localCache.getCache('isRemPwd') ?? false) //是否记住密码
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
  console.log(newValue)
})
const activeName = ref('account')
const accountCpn = ref<InstanceType<typeof panelAccount>>()
const phoneCpn = ref<InstanceType<typeof panelPhone>>()

// 父组件中使用子组件的登录方法
function loginClick() {
  if (activeName.value === 'account') {
    console.log('账号登录')
    // 调用子组件的登录方法
    accountCpn.value?.login(isRemPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<template>
  <div class="loginPanel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" class="demo-tabs" type="card" stretch>
        <el-tab-pane label="账号登录" name="account">
          <!-- label的插槽，这里是具名插槽 -->
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>

          <!-- 选项卡内容的插槽，这里是默认插槽 -->
          <panelAccount ref="accountCpn"></panelAccount>
        </el-tab-pane>

        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>

          <!-- 手机号登录框 -->
          <panelPhone ref="phoneCpn"></panelPhone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="loginClick">
      立即登录
    </el-button>
  </div>
</template>

<style scoped lang="less">
.loginPanel {
  width: 330px;

  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  .tabs {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        margin-left: 5px;
      }
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
