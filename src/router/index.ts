import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login/index.vue'),
    },
    {
      path: '/find-password',
      name: 'findPassword',
      component: () => import('../views/FindPassword/index.vue'),
    },
    {
      path: '/daily',
      name: 'daily',
      component: () => import('../views/Daily/index.vue'),
    }
  ],
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 检查目标路由是否需要认证
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // 如果需要认证但用户未登录，则重定向到登录页
    next('/login')
  } else {
    // 否则允许导航
    next()
  }
})

export default router