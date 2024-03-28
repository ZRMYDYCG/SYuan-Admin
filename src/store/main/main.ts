import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireDepartments: [],
    entireRoles: []
  }),
  actions: {
    async fetchRntireDataAction() {
      const rolesResult = await getEntireRoles()
      const DepartmentsResult = await getEntireDepartments()
      console.log(rolesResult, DepartmentsResult)

      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = DepartmentsResult.data.list
    }
  }
})

export default useMainStore
