<script setup lang="ts">
import { ref } from 'vue'
import personInfo from './personInfo.vue'
import headerCrumb from '@/components/main-content/header-crumb.vue'

const emits = defineEmits(['foldChange'])
// 记录是否折叠侧边栏
const isFold = ref<boolean>(false)
function handleMenuIconClick() {
  // 折叠的逻辑是，需要折叠时候，侧边栏缩进去，同时图标也要换掉
  // 1. 点击取反，模板中切换图标
  isFold.value = !isFold.value
  // 2, el-aside 和el-menu都需要折叠,发送事件出去
  emits('foldChange', isFold.value)
}
</script>

<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <!-- 动态的切换图标 -->
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <headerCrumb></headerCrumb>
      <personInfo></personInfo>
    </div>
  </div>
</template>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
