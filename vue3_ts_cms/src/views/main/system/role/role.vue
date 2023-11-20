<script setup lang="ts">
import { ref } from 'vue'
import pageSearch from '@/components/page-search/pageSearch.vue'
import searchConfig from './config/searchConfig'

const pageSearchCpnRes = ref()
const resetPage = () => {
  pageSearchCpnRes.value?.handleResetClickEvent()
}
const queryPage = () => {
  pageSearchCpnRes.value?.handleQueryClickEvent()
}
</script>

<template>
  <div class="role">
    <pageSearch
      ref="pageSearchCpnRes"
      :search-config="searchConfig"
      @reset-click="resetPage"
      @query-click="queryPage"
    ></pageSearch>
  </div>
</template>

<style scoped lang="less">
.role {
  color: red;
}
</style>
