<template>
  <div class="user-model">
    <el-dialog v-model="dialogVisible" title="新建用户" width="500" center>
      <span> It should be noted that the content will not be aligned in center by default </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dialogVisible = ref(true)

// 设置 dialogVisible 方法
function setModalVisible() {
  dialogVisible.value = true
}
// 暴露属性、方法
defineExpose({ setModalVisible })
</script>

<style scoped lang="less"></style>
