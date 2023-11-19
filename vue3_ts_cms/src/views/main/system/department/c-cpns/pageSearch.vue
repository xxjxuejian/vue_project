<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import useSystemStore from '@/store/system/system'

// interface searchFormType {
//   name: any
//   leader: any
//   createAt: any
// }

const systemStore = useSystemStore()
const searchForm = reactive<any>({
  name: '',
  leader: '',
  createAt: ''
})

// 重置操作,直接拿到整个表单元素
const formRef = ref<InstanceType<typeof ElForm>>()
const emits = defineEmits(['resetClick', 'queryClick'])
function resetClick() {
  emits('resetClick')
}
function queryClick() {
  emits('queryClick')
}

// 重置的具体操作
function handleResetClickEvent() {
  // 表单内容清空
  for (const key in searchForm) {
    searchForm[key] = ''
  }
  systemStore.postPageListDataAction('department')
}

// 查询的具体操作
function handleQueryClickEvent() {
  const queryInfo = {
    offset: 0,
    size: 10,
    ...searchForm
  }
  systemStore.postPageListDataAction('department', queryInfo)
}

// 向外暴露方法
defineExpose({
  handleResetClickEvent,
  handleQueryClickEvent
})
</script>

<template>
  <div class="search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="cellphone">
            <el-input v-model="searchForm.leader" placeholder="请输入查询的部门领导" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="resetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="queryClick">查询</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
