import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/main.vue'),
      children: [
        {
          path: '/main/analysis/overview',
          component: () => import('@/views/main/analysis/overview/overview.vue')
        },
        {
          path: '/main/analysis/dashboard',
          component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
        },
        {
          path: '/main/system/user',
          component: () => import('@/views/main/system/user/user.vue')
        },
        {
          path: '/main/system/role',
          component: () => import('@/views/main/system/role/role.vue')
        }
      ]
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('@/views/notFound/not-found.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/login' && token) {
    return '/main'
  }
})

export default router
