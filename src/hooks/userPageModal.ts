import { ref } from 'vue'
import type PageModel from '@/components/page-model/page-model.vue'
function usePageModal() {
  const modelRef = ref<InstanceType<typeof PageModel>>()
  function handleNewClick() {
    modelRef.value?.setModalVisible()
  }
  function handleEditClick(itemData: any) {
    modelRef.value?.setModalVisible(false, itemData)
  }

  return {
    handleNewClick,
    handleEditClick,
    modelRef
  }
}

export default usePageModal
