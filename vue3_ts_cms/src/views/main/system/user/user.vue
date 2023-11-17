<script setup lang="ts">
import usesSearch from './c-cpns/userSearch.vue'
import userContent from './c-cpns/userContent.vue'
import userModal from './c-cpns/userModal.vue'

import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()
const newUserModalRef = ref<InstanceType<typeof userModal>>()

// 重置就是不携带额外的参数请求数据
function handleResetClick() {
  contentRef.value?.loadNewData()
}
function handleQueryClick(formData: any) {
  contentRef.value?.loadNewData(formData)
}

// 新建用户
function hanldleNewUserEvent() {
  // 显示对话框
  newUserModalRef.value?.setModalVisible()
}
// 编辑用户
function handlerEditUserEvent(itemData: any) {
  // 同样显示新建用户的对话框，不过这时候需要把当前编辑用户的数据填入文本框中
  newUserModalRef.value?.setModalVisible(false, itemData)
}
</script>

<template>
  <div class="user">
    <!-- 搜索栏 -->
    <div class="header">
      <usesSearch @reset-click="handleResetClick" @query-click="handleQueryClick"></usesSearch>
    </div>
    <!-- 数据展示栏 -->
    <div class="user-info">
      <userContent
        ref="contentRef"
        @newUserBtnClick="hanldleNewUserEvent"
        @edit-user-btn-click="handlerEditUserEvent"
      ></userContent>
    </div>

    <!-- 新建用户对话框 -->
    <div class="newUserDialog">
      <userModal ref="newUserModalRef"></userModal>
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
