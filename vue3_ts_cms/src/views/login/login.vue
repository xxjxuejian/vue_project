<script setup lang="ts">
import loginPanel from './c-cpns/loginPanel.vue'
</script>

<template>
  <div class="login">
    <loginPanel></loginPanel>
  </div>
</template>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
