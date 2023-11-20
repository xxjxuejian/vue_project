<script setup lang="ts">
import { reactive, ref, defineProps } from 'vue'
import type { ElForm } from 'element-plus'
import useSystemStore from '@/store/system/system'

const systemStore = useSystemStore()

interface IPros {
  searchConfig: {
    searchFormConfig: any[]
  }
}

const props = defineProps<IPros>()

// 这个对象的作用是为了和模板中的input进行双向绑定
const initialForm: any = {}
for (const item of props.searchConfig.searchFormConfig) {
  initialForm[item.prop] = ''
}
const searchForm = reactive<any>(initialForm)

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
        <template v-for="item in searchConfig.searchFormConfig" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <!-- v-model是双向的数据绑定 -->
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <!-- v-model是双向的数据绑定 -->
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"> </el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
