<script setup lang="ts">
import type { ElForm, FormRules } from 'element-plus'
import { reactive } from 'vue'

const phoneAccount = reactive({
  phoneNumber: '',
  yanzhengma: ''
})

// 校验规则
const accountRules: FormRules = {
  phoneNumber: [
    {
      required: true,
      message: '帐号是必填字段',
      trigger: 'blur'
    },
    { pattern: /\w{3,20}/, message: '帐号由3-20位数字或字母组成', trigger: 'blur' }
  ],
  yanzhengma: [
    { required: true, message: '密码是必填字段', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,20}/, message: '密码由6-20字母或数组组成', trigger: 'blur' }
  ]
}
</script>

<template>
  <!-- 手机号验证码组件 -->
  <div class="panelPhone">
    <el-form
      style="max-width: 460px"
      label-width="60px"
      :model="phoneAccount"
      :rules="accountRules"
      ref="formEl"
      status-icon
    >
      <el-form-item label="手机号" prop="name">
        <el-input v-model="phoneAccount.phoneNumber" />
      </el-form-item>

      <el-form-item label="验证码 " prop="password">
        <div class="verify-code">
          <el-input v-model="phoneAccount.yanzhengma" show-password />
          <el-button class="get-yzm" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.panelPhone {
  color: red;

  .verify-code {
    display: flex;

    .get-yzm {
      margin-left: 8px;
    }
  }
}
</style>
