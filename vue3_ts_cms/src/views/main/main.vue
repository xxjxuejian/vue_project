<script setup lang="ts">
import { ref } from 'vue'
import useLoginStore from '@/store/login/login'
import mainAside from '@/components/main-aside/mainAside.vue'
import mainHeader from '@/components/main-header/mainHeader.vue'

const loginStore = useLoginStore()

// 折叠相关操作
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  // 1.mainAside组件中的属性collapse属性改变
  isFold.value = flag
  // 2. el-aside的宽度改变
}
</script>

<template>
  <div class="main">
    <div class="common-layout">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isFold ? '60px' : '210px'">
          <!-- <el-aside width="210px"> -->
          <mainAside :is-flod="isFold"></mainAside>
        </el-aside>

        <el-container>
          <!-- 容器中的顶部 -->
          <el-header>
            <mainHeader @fold-change="handleFoldChange"> </mainHeader>
          </el-header>

          <!-- 内容区域 -->
          <el-main>
            <h2>欢迎用户{{ loginStore.name }}</h2>
            <RouterView></RouterView>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="less">
.main {
  height: 100%;
  .common-layout {
    height: 100%;
    .el-container {
      height: 100%;
      .el-header {
        background-color: aquamarine;
      }
    }
    .el-aside {
      transition: width 0.3s ease-out;
    }

    .el-main {
      background-color: skyblue;
    }
  }
}
</style>
