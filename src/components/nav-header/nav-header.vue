<template>
  <div class="nav-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <HeaderCrumb />
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts" name="nav-header">
import { ref } from 'vue'
// import HeaderCrumb from './c-cpns/header-crumb.vue'
// import HeaderInfo from './c-cpns/header-info.vue'
// 组件内部自定义事件
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleMenuIconClick = () => {
  // 1. 内部改变状态
  isFold.value = !isFold.value

  // 2. 将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
