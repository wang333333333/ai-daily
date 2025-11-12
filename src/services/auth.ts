// auth.ts - 认证相关API
import apiClient from './api'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    username: string
    email: string
  }
}

export interface FindPasswordRequest {
  email: string
}

export const authApi = {
  // 用户登录
  login(data: LoginRequest): Promise<{ data: LoginResponse }> {
    return apiClient.post('/auth/login', data)
  },

  // 找回密码
  findPassword(data: FindPasswordRequest): Promise<{ data: any }> {
    return apiClient.post('/auth/find-password', data)
  },

  // 用户登出
  logout(): Promise<{ data: any }> {
    return apiClient.post('/auth/logout')
  },
}