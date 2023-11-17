<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/system/system'

const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

/*
  新建用户和编辑用户都用到了用一个对话框，但是代码的逻辑不一样，需要确定
  本次点击是新建还是编辑，同时只有在新建用户的时候，密码框才需要显示
 */
const isCreateUser = ref(true)
const editData = ref()

// 2.获取roles/departments数据
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(systemStore)

// 2.定义设置dialogVisible方法
function setModalVisible(isCreate: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isCreateUser.value = isCreate
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

// // 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isCreateUser.value && editData.value) {
    // 编辑用户的数据
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    // 创建新的用户
    systemStore.newUserDataAction(formData)
  }
  systemStore.postUsersListAction()
}

defineExpose({
  setModalVisible
})
</script>

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateUser ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="80px" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item v-if="isCreateUser" label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
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
