<template>
  <div class="login-page">
    <div class="login-container">
      <h2>用户登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="formRef" @submit.prevent="handleLogin" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="User" size="large" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock" size="large"
            show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" size="large" :loading="loading" class="login-button">
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="extra-links">
        <el-link type="primary" @click="$router.push('/find-password')">
          忘记密码?
        </el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '../stores/auth'
import { authApi } from '../services'
import type { LoginRequest, User } from '../types'

const router = useRouter()
const authStore = useAuthStore()
const formRef = ref<FormInstance | null>(null)
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应为3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应为6-20个字符', trigger: 'blur' }
  ]
})

const handleLogin = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 使用真实的API进行登录
        const credentials: LoginRequest = {
          username: loginForm.username,
          password: loginForm.password
        }

        // 调用服务文件中的登录方法
        const response = await authApi.login(credentials)

        // 将认证信息存储到store中
        authStore.setAuth(response.data.token, {
          ...response.data.user,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as User)

        // 登录成功后跳转到日报页
        router.push('/daily')
      } catch (error) {
        console.error('登录失败:', error)
        const errorMessage = error instanceof Error ? error.message : '未知错误'
        alert('登录失败: ' + errorMessage)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-container {
  background: white;
  padding: 3rem 2rem;
  border-radius: 8px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color-primary);
  font-size: 1.5rem;
}

.login-form {
  :deep(.el-form-item) {
    margin-bottom: 1.5rem;
  }

  :deep(.el-input__wrapper) {
    padding: 0 15px;
  }
}

.login-button {
  width: 100%;
  margin-top: 1rem;
}

.extra-links {
  text-align: center;
  margin-top: 1.5rem;
}
</style>