<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px"></el-table-column>
        <el-table-column align="center" label="序号" type="index" width="60px"></el-table-column>
        <el-table-column align="center" label="用户名" prop="name" width="150px"></el-table-column>
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="120px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="120px"
        ></el-table-column>
        <el-table-column align="center" label="状态" prop="enable" width="100px">
          <!-- 作用域插槽：内部遍历数据的同时反向传递给父组件 row -> 整行数据 -->
          <template #default="slotProps">
            <el-button size="small" :type="slotProps.row.enable ? 'primary' : 'danger'" plain>
              {{ slotProps.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt"></el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt"></el-table-column>
        <el-table-column align="center" label="操作" width="180px">
          <el-button size="small" icon="Edit" text type="primary">编辑</el-button>
          <el-button size="small" icon="Delete" text type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<script setup lang="ts" name="user-content">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
const systemStore = useSystemStore()
systemStore.postUserListAction()

const { usersList } = storeToRefs(systemStore)
</script>

<style scoped lang="less">
.user-content {
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  margin-top: 20px;
  padding: 20px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 20px 0;
  }
}
</style>
