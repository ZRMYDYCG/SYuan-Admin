import { defineStore } from 'pinia'
import { postUsersListData } from '@/service/main/system/system'
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
    }
  }
})

export default useSystemStore
