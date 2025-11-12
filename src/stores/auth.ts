// stores/auth.ts - 认证状态管理
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref<boolean>(false)

  // 设置认证信息
  const setAuth = (newToken: string, newUser: User) => {
    token.value = newToken
    user.value = newUser
    isAuthenticated.value = true
    
    // 保存token到localStorage
    localStorage.setItem('token', newToken)
  }

  // 清除认证信息
  const clearAuth = () => {
    token.value = null
    user.value = null
    isAuthenticated.value = false
    
    // 清除localStorage中的token
    localStorage.removeItem('token')
  }

  // 检查用户是否已认证
  const checkAuth = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      isAuthenticated.value = true
      // 这里可以添加获取用户信息的逻辑
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    clearAuth,
    checkAuth
  }
})