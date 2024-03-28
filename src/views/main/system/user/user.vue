<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" />
    <user-model ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="user">
// 依赖、包、函数、工具
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModel from './c-cpns/user-model.vue'
import { ref } from 'vue'

// combination-操作子组件 user-content
const contentRef = ref<InstanceType<typeof UserContent>>()
const handleQueryClick = (formData: any) => {
  console.log(formData)
  console.log(contentRef.value)
  // 非空断言 !
  contentRef.value!.fetchUserListData(formData)
}

const handleResetClick = () => {
  contentRef.value?.fetchUserListData()
}

const modelRef = ref<InstanceType<typeof UserModel>>()
const handleNewClick = () => {
  modelRef.value?.setModalVisible()
}
</script>

<style scoped lang="less"></style>
