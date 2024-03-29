<template>
  <div class="user-search">
    <el-form :model="searchForm" ref="formRef" size="large" label-width="80px">
      <!-- 输入关键词表单 -->
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="searchForm.createAt"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <!-- 重置、查询按钮 -->
      <div class="btns">
        <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
        <el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="page-search">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

// 定义自定义事件 / 组件接收的属性
interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

// 定义表单数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)

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
