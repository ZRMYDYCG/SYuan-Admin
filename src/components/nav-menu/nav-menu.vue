<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <span v-show="!isFold" class="title">思源后台管理系统</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
      :collapse="isFold"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 1.系统总览 -->
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <!-- <el-icon><Monitor /></el-icon> -->
            <!-- 如上是 Elment 图标的插入语法的修改 -->
            <!-- 因此内部可以使用动态组件进行图标渲染 -->
            <el-icon><component :is="item.icon.split('el-icon-')[1]"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">{{
              subitem.name
            }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts" name="nav-menu">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToMenu } from '@/utils/map-menus'
const router = useRouter()
// 接收属性
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1. 获取菜单数据
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const handleItemClick = (subitem: any) => {
  router.push(subitem.url)
}

// 2. 默认选中菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
}

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
</style>
