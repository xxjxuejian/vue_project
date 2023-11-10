<script setup lang="ts">
import usesSearch from './c-cpns/userSearch.vue'
import userContent from './c-cpns/userContent.vue'
</script>

<template>
  <div class="user">
    <!-- 搜索栏 -->
    <div class="header">
      <usesSearch></usesSearch>
    </div>
    <!-- 数据展示栏 -->
    <div class="user-info">
      <userContent></userContent>
    </div>
  </div>
</template>

<style scoped lang="less">
.user {
  color: red;

  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
