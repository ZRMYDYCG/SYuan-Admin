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

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()

  // 根据当前用户返回的角色菜单进行匹配
  const currentRoutes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      // 给 route 顶层菜单增加重定向功能
      if (route) {
        if (
          !currentRoutes.find((item) => {
            item.path === submenu.url
          })
        ) {
          currentRoutes.push({ path: menu.url, redirect: route.path })
        }
        // 二级菜单对应路由
        currentRoutes.push(route)
      }
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }

  return currentRoutes
}

/**
 * @desc 根据当前路由路径去激活需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 * @return { submenu } 默认激活的菜单项
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

/**
 * @desc 面包屑导航体内容的动态展示
 * @param path 当前的路径
 * @param userMenus 所有的菜单
 * @return { breadcrumbs } 动态展示的面包屑内容
 */
interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadCrumbs(path: string, userMenus: any[]) {
  // 定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []
  // 遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
