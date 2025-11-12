// types/auth.ts - 认证相关类型定义
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

export interface User {
  id: number
  username: string
  email: string
  createdAt: string
  updatedAt: string
}