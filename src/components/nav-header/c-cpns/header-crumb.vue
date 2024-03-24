<template>
  <div class="header-crumb">
    <el-breadcrumb separator=">">
      <template v-for="(item, index) in breadcrumbs" :key="index">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss"></style>

<script setup lang="ts" name="header-crumb">
import { computed } from 'vue'
import { mapPathToBreadCrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => {
  return mapPathToBreadCrumbs(route.path, userMenus)
})
</script>
