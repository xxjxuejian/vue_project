<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import getMenuInfoFromRoute from '@/utils/getRoute'
import { computed } from 'vue'

const route = useRoute()
const loginStore = useLoginStore()
let res: any = computed(() => {
  return getMenuInfoFromRoute(loginStore.userMenus, route.path)
})
</script>

<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="res[0].url">{{ res[0].name }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="res[1].url"> {{ res[1].name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="less">
.crumb {
  color: red;
}
</style>
