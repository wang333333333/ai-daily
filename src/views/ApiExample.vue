<template>
  <div class="api-example">
    <h1>API使用示例</h1>
    <div class="api-section">
      <h2>认证接口测试</h2>
      <button @click="testLogin">测试登录接口</button>
      <button @click="testFindPassword">测试找回密码接口</button>
      <button @click="testLogout">测试登出接口</button>
    </div>

    <div class="api-section">
      <h2>日报接口测试</h2>
      <button @click="testSubmitDaily">测试提交日报</button>
      <button @click="testGetDailies">测试获取日报列表</button>
    </div>

    <div class="response-section">
      <h2>接口响应</h2>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authApi, dailyApi } from '@/services'

const response = ref('')

const testLogin = async () => {
  try {
    // 这里只是一个示例，实际应该传递真实的用户名和密码
    const res = await authApi.login({ username: 'testuser', password: 'testpass' })
    response.value = JSON.stringify(res, null, 2)
  } catch (error) {
    response.value = `登录错误: ${error}`
  }
}

const testFindPassword = async () => {
  try {
    // 这里只是一个示例，实际应该传递真实的邮箱
    const res = await authApi.findPassword({ email: 'test@example.com' })
    response.value = JSON.stringify(res, null, 2)
  } catch (error) {
    response.value = `找回密码错误: ${error}`
  }
}

const testLogout = async () => {
  try {
    const res = await authApi.logout()
    response.value = JSON.stringify(res, null, 2)
  } catch (error) {
    response.value = `登出错误: ${error}`
  }
}

const testSubmitDaily = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]
    const res = await dailyApi.submitDailyReport({
      date: today,
      workContent: '今天完成了API接口的设计和实现',
      problems: '遇到了一些TypeScript类型问题',
      tomorrowPlan: '明天将继续完善接口功能'
    })
    response.value = JSON.stringify(res, null, 2)
  } catch (error) {
    response.value = `提交日报错误: ${error}`
  }
}

const testGetDailies = async () => {
  try {
    const res = await dailyApi.getDailyReports()
    response.value = JSON.stringify(res, null, 2)
  } catch (error) {
    response.value = `获取日报列表错误: ${error}`
  }
}
</script>

<style scoped>
.api-example {
  padding: 20px;
}

.api-section {
  margin-bottom: 30px;
}

.api-section h2 {
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

button {
  background-color: #409eff;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #337ecc;
}

.response-section {
  margin-top: 30px;
}

.response-section h2 {
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>