<template>
  <div class="user-search">
    <el-form :model="searchForm" ref="formRef" size="large" label-width="80px">
      <!-- 输入关键词表单 -->
      <el-row :gutter="20">
        <el-col span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="请输入查询的真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入查询的手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择查询的状态"
              style="width: 180px"
            >
              <el-option :value="1" label="启用"></el-option>
              <el-option :value="0" label="禁用"></el-option>
            </el-select>
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
  realname: '',
  cellphone: '',
  enable: 1,
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
