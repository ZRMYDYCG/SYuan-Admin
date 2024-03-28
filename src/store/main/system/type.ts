export interface IUser {
  id: number
  name: string
  cellphone: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface ISystemState {
  usersList: IUser[]
  usersTotalCount: number
}
