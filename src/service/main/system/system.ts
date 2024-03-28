import hyRequest from '@/service'

// 数据列表的获取、查询
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

// 删除数据
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
