<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="conentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-model ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
// import PageContent from './c-cpns/page-content.vue'
import PageModel from './c-cpns/page-model.vue'
import searchConfig from './config/search.config'
import conentConfig from './config/content.config'

// 点击search, content 的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

// 点击content, model 的操作
const modelRef = ref<InstanceType<typeof PageModel>>()
function handleNewClick() {
  modelRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modelRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped lang="less"></style>
