<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :is-fold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="48px">
          <nav-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="main">
import { ref } from 'vue'
import useLoginStore from '@/store/login/login'
const loginStore = useLoginStore()
loginStore.loadLocalDataAction()

// 处理 main-header 中的折叠变化
const isCollapse = ref(false)
const handleFoldChange = (value: boolean) => {
  isCollapse.value = value
}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    background-color: #f0f2f5;
  }
}
</style>
