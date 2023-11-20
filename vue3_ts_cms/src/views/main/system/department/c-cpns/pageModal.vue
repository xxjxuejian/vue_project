<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/system/system'

const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

/*
  新建用户和编辑用户都用到了用一个对话框，但是代码的逻辑不一样，需要确定
  本次点击是新建还是编辑，同时只有在新建用户的时候，密码框才需要显示
 */
const isCreateData = ref(true)
const editData = ref()

// 2.获取roles/departments数据
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(systemStore)

// 2.定义设置对话框是否显示的dialogVisible方法
function setModalVisible(isCreate: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isCreateData.value = isCreate
  // 不是创建用户，那就是编辑用户
  if (!isCreate && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// // 3.对话框中点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isCreateData.value && editData.value) {
    // 编辑用户的数据
    systemStore.editPageDataByIdAction('department', formData, editData.value.id).then(() => {
      systemStore.postPageListDataAction('department')
    })
    console.log('编辑了用户')
  } else {
    // 创建新的用户
    systemStore.createPageDataAction('department', formData).then(() => {
      systemStore.postPageListDataAction('department')
    })
    console.log('新建了用户')
  }
}

defineExpose({
  setModalVisible
})
</script>

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateData ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="80px" size="large">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入部门领导" />
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请选择上级部门" style="width: 100%">
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.modal {
  color: red;
}
</style>
