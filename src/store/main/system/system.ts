import { defineStore } from 'pinia'
import { postUsersListData, deleteUserById } from '@/service/main/system/system'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = userListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      // 重新请求最新数据
      this.postUserListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
