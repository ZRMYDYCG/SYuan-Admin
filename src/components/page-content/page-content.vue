<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="slotProps">
                {{ formatUTC(slotProps.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item" width="150px">
              <template #default="slotProps">
                <el-button
                  size="small"
                  icon="Edit"
                  text
                  type="primary"
                  @click="handleEditBtnClick(slotProps.row)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  icon="Delete"
                  text
                  type="danger"
                  @click="handleClickBtnClick(slotProps.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="user-content">
// 依赖、包、工具、函数
import { ref } from 'vue'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

// 定义事件 / 属性
const emit = defineEmits(['newClick', 'editClick'])
const props = defineProps<IProps>()

// combination-获取列表数据
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
fetchPageListData()
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// combination-分页器相关逻辑
const handleSizeChange = () => {
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}

// 编辑、删除数据操作
function handleClickBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

// 新建用户
function handleNewUserClick() {
  emit('newClick')
}

// 编辑用户
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// combination-发送网络请求
function fetchPageListData(formData: any = {}) {
  // 1. 获取 offset / size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  // 2. 合并请求参数
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 暴露方法、数据
defineExpose({ fetchPageListData })
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

.footer {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>
