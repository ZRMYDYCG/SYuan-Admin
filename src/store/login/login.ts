import router from '@/router'
import { accountLogin, getRoleMenus, getUserById } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async accountLoginAction(account: any) {
      // 1.获取登录信息
      const loginRes = await accountLogin(account)
      const { id, token } = loginRes.data
      this.token = token

      // 2.保存在cache中
      localCache.setCache('token', token)

      // 3.获取用户信息
      const userRes = await getUserById(id)
      this.userInfo = userRes.data
      localCache.setCache('useInfo', this.userInfo)

      // 4.根据role的id获取菜单
      const roleId = this.userInfo.role.id
      const menuRes = await getRoleMenus(roleId)
      this.userMenus = menuRes.data
      localCache.setCache('userMenus', this.userMenus)

      // 5. 动态添加角色路由
      // 方案一. 所有路由写死在 localRoutes
      // 方案二. 将路由写到每一个文件里面, 读取文件
      // 方案一、方案二 => 殊途同归
      const localRoutes: any[] = []
      // 5.1 读取 router / main 中所有的 .ts 文件
      const files: Record<string, any> = import.meta.glob('../../router/main/**/*.ts', {
        eager: true
      })
      console.log(files)
      for (const key in files) {
        const module = files[key]
        console.log(module.default)
        localRoutes.push(module.default)
      }
      console.log(localRoutes)

      // 6. 将当前菜单与 localRoutes 进行匹配，做动态注册
      for (const menu of this.userMenus) {
        for (const submenu of menu.children) {
          const route = localRoutes.find((item) => item.path === submenu.url)
          if (route) {
            router.addRoute('main', route)
          }
        }
      }
      // 跳转到首页
      router.push('/main')
    },

    loadLocalDataAction() {
      this.token = localCache.getCache('token')
      this.userInfo = localCache.getCache('userInfo')
      this.userMenus = localCache.getCache('userMenus')
    }
  }
})

export default useLoginStore
