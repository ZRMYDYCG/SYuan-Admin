import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 方案一. 动态获取所有的路由对象
  // * 路由对象都在地理的文件当中
  // * 从文件当中将所有的路由对象先全部读取到数组中
  // 方案二. 直接将所有的路由对象直接定义到一个数组当中也是可以的

  const localRoutes: RouteRecordRaw[] = []
  // 读取 router / main 中所有的 .ts 文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })

  // 将加载的对象追加到 localRoutes 中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()

  // 根据当前厚点返回的角色菜单进行匹配
  const currentRoutes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        console.log(route)
        currentRoutes.push(route)
      }
    }
  }

  return currentRoutes
}
