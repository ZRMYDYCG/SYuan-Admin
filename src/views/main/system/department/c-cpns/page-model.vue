<template>
  <div class="user-model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'
const systemStore = useSystemStore()
const editData = ref()
// 表单数据
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

// 定义模态框状态
const isNewRef = ref<boolean>(true)

// 设置 dialogVisible 方法
const dialogVisible = ref(false)
function setModalVisible(isNew: boolean = true, itemData?: any) {
  isNewRef.value = isNew
  dialogVisible.value = true
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    // 保证数据的安全性
    editData.value = null
  }
}

// 获取下拉选择列表的数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

// 点击确定的逻辑
const handleConfirm = () => {
  dialogVisible.value = false
  if (isNewRef.value) {
    // 创建新的部门
    systemStore.newPageDataAction('department', formData)
  } else {
    // 编辑部门信息
    systemStore.editPageDataAction('department', editData.value.id, formData)
  }
}

// 暴露属性、方法
defineExpose({ setModalVisible })
</script>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
</style>
