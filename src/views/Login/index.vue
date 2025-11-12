<template>
  <div class="login">
    <div class="login__container">
      <div class="login__banner">
        <img src="@/assets/images/login-banner.png" class="login__banner-image">
      </div>
      <div class="login__form">
        <div class="login__form-header">
          <img src="@/assets/images/logo.png" />
          <p>欢迎登录 GEO优化查询平台</p>
        </div>
        <div class="login__form-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 表单引用
const ruleFormRef = ref()

// 响应式表单数据
const ruleForm = reactive({
  name: ''
})

// 表单验证规则
const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ]
})

// 提交表单
const submitForm = async () => {
  if (!ruleFormRef.value) return

  try {
    // 验证表单
    await ruleFormRef.value.validate()

    // 这里可以调用登录 API
    console.log('表单数据:', ruleForm)
    ElMessage.success('登录成功！')

    // 实际项目中这里可能是：
    // const res = await loginApi(ruleForm)
    // if (res.success) {
    //   router.push('/dashboard')
    // }

  } catch (error) {
    ElMessage.error('请完善表单信息')
  }
}

// 重置表单
const resetForm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/background.png');
  background-size: 101% 101%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.login__container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 980px;
  height: 480px;
}

.login__banner {
  width: 560px;
  height: 100%;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.login__form {
  width: 420px;
  height: 480px;
  background: #FFFFFF;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #FFFFFF;
  backdrop-filter: blur(8px);
}

.login__form-header {
  padding: 24px 40px 0 40px;

  img {
    display: block;
    width: 80px;
    height: 69px;
    margin-bottom: 16px;
  }

  font-family: PingFangSC,
  PingFang SC;
  font-weight: 500;
  font-size: 24px;
  color: #222222;
}

.login__form-body {
  margin-top: 48px;
}
</style>