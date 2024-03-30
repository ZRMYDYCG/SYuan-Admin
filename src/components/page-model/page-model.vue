<template>
  <div class="user-model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="formData[item.prop]"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </template>
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
// import type { IModalProps } from './type'

const systemStore = useSystemStore()

// props
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
const props = defineProps<IProps>()

const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = ''
}
const formData = reactive<any>(initialData)
const isNewRef = ref<boolean>(true)
const editData = ref()

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

// 点击确定的逻辑
const handleConfirm = () => {
  dialogVisible.value = false
  if (isNewRef.value) {
    // 创建新的部门
    systemStore.newPageDataAction(props.modalConfig.pageName, formData)
  } else {
    // 编辑部门信息
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, formData)
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
