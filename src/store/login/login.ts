import router from '@/router'
import { accountLogin, getRoleMenus, getUserById } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
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
      localCache.setCache('userInfo', this.userInfo)

      // 4.根据role的id获取菜单
      const roleId = this.userInfo.role.id
      const menuRes = await getRoleMenus(roleId)
      this.userMenus = menuRes.data
      localCache.setCache('userMenus', this.userMenus)

      // 动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      // 在 main 路由的子路由里面动态添加子路由
      routes.forEach((route) => router.addRoute('main', route))
      // 5. 跳转到首页
      router.push('/main')
    },

    loadLocalDataAction() {
      console.log(1)
      // 1. 用户进行刷新后默认加载数据
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      console.log(token)
      console.log(userInfo)
      console.log(userMenus)
      if (token && userInfo && userMenus) {
        console.log(2)
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        // 2. 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
