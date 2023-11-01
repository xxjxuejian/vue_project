<script setup lang="ts">
import { reactive, defineExpose, ref } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

const loginStore = useLoginStore()
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
// 获取表单组件
const formEl = ref<InstanceType<typeof ElForm>>()

// 校验规则
const accountRules: FormRules = {
  name: [
    {
      required: true,
      message: '帐号是必填字段',
      trigger: 'blur'
    },
    { pattern: /\w{3,20}/, message: '帐号由3-20位数字或字母组成', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码是必填字段', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,20}/, message: '密码由6-20字母或数组组成', trigger: 'blur' }
  ]
}

// login传递一个参数，是否记住密码
function login(isRemPwd: boolean) {
  // 点击登录的时候必须验证 表单的字符是否符合要求，不符合不登录，弹出错误信息
  // 对表单组件验证
  formEl.value?.validate((valid, fields) => {
    if (valid) {
      //验证通过,valid是true
      const name = account.name
      const password = account.password
      // 返回promise,then()中处理逻辑
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 如果需要记住密码，使用localStorage存储
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          // 如果没有勾选记住密码框，把之前的删除掉，没有也不会报错
          localCache.removeCache('name')
          localCache.removeCache('password')
          localCache.removeCache('isRemPwd')
        }
      })
    } else {
      // 验证不通过,告诉你是哪一个字段没有通过       // console.log('未通过', fields)
      ElMessage.error('请检查您的帐号或密码是否正确')
    }
  })
}
// 向父组件暴露方法
defineExpose({
  login
})
</script>

<template>
  <!-- 账户名密码组件 -->
  <div class="panelAccount">
    <el-form
      style="max-width: 460px"
      label-width="60px"
      :model="account"
      :rules="accountRules"
      ref="formEl"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less"></style>
