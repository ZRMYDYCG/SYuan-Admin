<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-model :modal-config="modalConfig" ref="modelRef"></page-model>
  </div>
</template>

<script setup lang="ts" name="role">
import searchConfig from './config/search.config'
import PageSearch from '@/components/page-search/page-search.vue'

import contentConfig from './config/content.config'
import PageContent from '@/components/page-content/page-content.vue'

import modalConfig from './config/modal.config'
import pageModel from '@/components/page-model/page-model.vue'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/userPageModal'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modelRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped lang="less"></style>
