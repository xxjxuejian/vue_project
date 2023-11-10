<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { matchBtnfromUrl } from '@/utils/dyMapRouter'

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus ?? localCache.getCache('userMenus')
const router = useRouter()

// 是否折叠的flag
defineProps({
  isFlod: {
    type: Boolean,
    default: false
  }
})

// 侧边栏导航按钮点击
function navClick(item: any) {
  console.log(item)
  router.push(item.url)
}

// 路径与左侧导航按钮之间的匹配
// default-active="4" 的值是和el-menu-item index 的绑定的
// 拿到当前的路由
const curRoute = useRoute()
const activeMenu = computed(() => {
  const activeRoute = matchBtnfromUrl(curRoute.path, userMenus)
  return activeRoute.id + ''
})
</script>

<template>
  <div class="main-aside">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="icon" />
      <h2 class="title" v-show="!isFlod">后台管理系统-CMS</h2>
    </div>
    <div class="menus">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        text-color="#b7bdc3"
        :collapse="isFlod"
        active-text-color="#fff"
        background-color="#001529"
        :collapse-transition="false"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <!-- 二级菜单 -->
            <template v-if="item.children">
              <template v-for="subItem in item.children" :key="subItem.id">
                <el-menu-item :index="String(subItem.id)" @click="navClick(subItem)"
                  >{{ subItem.name }}
                </el-menu-item>
              </template>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.main-aside {
  color: #fff;
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 30px;
    justify-content: center;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
    }
    .title {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .menus {
    .el-menu {
      border-right: none;
      user-select: none;

      .el-sub-menu {
        .el-menu-item {
          padding-left: 50px !important;
          background-color: #0c2135;
        }

        .el-menu-item:hover {
          color: #fff;
        }

        .el-menu-item.is-active {
          background-color: #0a60bd;
        }
      }
    }
  }
}
</style>
