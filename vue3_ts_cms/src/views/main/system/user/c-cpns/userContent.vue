<script setup lang="ts">
import useSystemStore from '@/store/system/system'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import formatUTC from '@/utils/format'

// 分页操作
const systemStore = useSystemStore()
const { usersList, usersTotalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(10)
// 发送网络请求，获取用户列表数据
loadNewData()

function handleSizeChange() {
  loadNewData()
}

function handleCurrentChange() {
  loadNewData()
}

function loadNewData(queryData = {}) {
  const queryInfo = {
    size: pageSize.value,
    offset: (currentPage.value - 1) * pageSize.value,
    ...queryData
  }
  systemStore.postUsersListAction(queryInfo)
}

// 编辑和删除操作
const deleteDiaVisible = ref(false)
const deleteId = ref(null)

const deleteBtnClick = (id: any) => {
  deleteDiaVisible.value = true
  deleteId.value = id
}
function handleConfirmDeleteClick() {
  deleteDiaVisible.value = false
  if (deleteId.value) {
    systemStore.deleteUserByIdAction(deleteId.value).then(() => {
      // 删除完重新请求一次数据
      loadNewData()
    })
  }
}

// 定义编辑事件和删除事件，统一传递给父组件
const emits = defineEmits(['newUserBtnClick', 'editUserBtnClick'])
const handleNewBtnClick = () => {
  emits('newUserBtnClick')
}
const handleEditBtnClick = (itemData: any) => {
  emits('editUserBtnClick', itemData)
}

defineExpose({
  loadNewData
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewBtnClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" label="用户名" prop="name" width="100px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="100px" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="120px" />
        <el-table-column align="center" label="状态" prop="enable" width="90px">
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="140px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="deleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="deleteDialog">
      <el-dialog v-model="deleteDiaVisible" title="Warning" width="30%" center>
        <span> 确认删除？ </span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="deleteDiaVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirmDeleteClick">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped lang="less">
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
</style>
