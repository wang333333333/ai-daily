// stores/auth.ts - 认证状态管理
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi, type LoginRequest } from '@/services'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref<boolean>(false)

  // 用户登录
  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authApi.login(credentials)
      token.value = response.data.token
      // 注意：这里我们假设登录接口返回的用户信息不包含createdAt和updatedAt字段
      // 所以我们需要创建一个符合User类型的对象
      user.value = {
        ...response.data.user,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as User
      isAuthenticated.value = true
      
      // 保存token到localStorage
      localStorage.setItem('token', response.data.token)
      
      return response.data
    } catch (error) {
      // 清除认证状态
      logout()
      throw error
    }
  }

  // 用户登出
  const logout = () => {
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
    login,
    logout,
    checkAuth
  }
})