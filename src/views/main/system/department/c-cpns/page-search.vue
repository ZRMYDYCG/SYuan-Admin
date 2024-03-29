<template>
  <div class="user-search">
    <el-form :model="searchForm" ref="formRef" size="large" label-width="80px">
      <!-- 输入关键词表单 -->
      <el-row :gutter="20">
        <el-col span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的部门名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="searchForm.leader" placeholder="请输入查询的部门领导"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 重置、查询按钮 -->
      <div class="btns">
        <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
        <el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="user">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

// 定义表单数据
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// combination-a 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 清空表单数据
  formRef.value?.resetFields()
  // 重新调用渲染接口
  emit('resetClick')
}

// combination-b 查询操作
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style scoped lang="less">
.user-search {
  background: #fff;
  padding: 20px;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
    .el-button {
      height: 36px;
    }
  }
}
</style>
