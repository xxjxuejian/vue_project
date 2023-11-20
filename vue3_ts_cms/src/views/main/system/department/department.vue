<script setup lang="ts">
import pageSearch from './c-cpns/pageSearch.vue'
import pageContent from './c-cpns/pageContent.vue'
import pageModal from './c-cpns/pageModal.vue'
import { ref } from 'vue'

/*
这次页面的逻辑和之前的用户页面的逻辑不太一样，这个页面只做一些简单的逻辑，比如，搜索框的重置，查询的逻辑
都是在search组件中的，这边监听到了，只需要去调用对应的方法就行了
*/
const pageSearchCpnRef = ref<InstanceType<typeof pageSearch>>()
const pageModalCpnRef = ref<InstanceType<typeof pageModal>>()

const resetPage = () => {
  pageSearchCpnRef.value?.handleResetClickEvent()
}
const queryPage = () => {
  pageSearchCpnRef.value?.handleQueryClickEvent()
}

// 新建用户的处理逻辑
const handleNewBtnEvent = () => {
  pageModalCpnRef.value?.setModalVisible()
}
const handleEditBtnEvent = (itemData: any) => {
  pageModalCpnRef.value?.setModalVisible(false, itemData)
}
</script>

<template>
  <div class="department">
    <h2>department</h2>
    <pageSearch
      ref="pageSearchCpnRef"
      @reset-click="resetPage"
      @query-click="queryPage"
    ></pageSearch>
    <pageContent
      @new-event-btn-click="handleNewBtnEvent"
      @edit-event-btn-click="handleEditBtnEvent"
    ></pageContent>
    <pageModal ref="pageModalCpnRef"></pageModal>
  </div>
</template>

<style scoped lang="less">
.department {
  color: red;
}
</style>
