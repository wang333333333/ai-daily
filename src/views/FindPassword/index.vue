<template>
  <div class="login">
    <div class="login__container">
      <div class="login__banner">
        <img src="@/assets/images/login-banner.png" class="login__banner-image" />
      </div>
      <div class="login__form">
        <div class="login__form-header" @click="goBack">
          <el-icon><ArrowLeftBold /></el-icon>
          <span>重置密码</span>
        </div>
        <div class="login__form-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" class="demo-ruleForm">
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.username" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.username" placeholder="输入验证码"></el-input>
              <div class="login__form-code">获取验证码</div>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="ruleForm.password"
                placeholder="新密码"
                :type="showPassword ? 'text' : 'password'"
              ></el-input>
              <img
                v-if="!showPassword"
                class="login__form-eye"
                src="@/assets/images/close.png"
                @click="showPassword = !showPassword"
              />
              <img
                v-else
                class="login__form-eye"
                src="@/assets/images/open.png"
                @click="showPassword = !showPassword"
              />
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="ruleForm.password"
                placeholder="请再次输入新密码"
                :type="showPassword ? 'text' : 'password'"
              ></el-input>
              <img
                v-if="!showPassword"
                class="login__form-eye"
                src="@/assets/images/close.png"
                @click="showPassword = !showPassword"
              />
              <img
                v-else
                class="login__form-eye"
                src="@/assets/images/open.png"
                @click="showPassword = !showPassword"
              />
            </el-form-item>
            <el-form-item>
              <el-button class="login__form-button" type="primary" @click="submitForm('ruleForm')"
                >确认</el-button
              >
            </el-form-item>
          </el-form>
          <div class="login__form-footer">
            <span>请通过绑定的手机号码重置密码后，使用新密</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 密码图标的切换
const showPassword = ref(false)

// 跳转登录页
const router = useRouter()
const goBack = () => {
  router.push('/')
}

// 表单引用
const ruleFormRef = ref()

// 响应式表单数据
const ruleForm = reactive({
  username: '',
  password: '',
})

// 表单验证规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
  ],
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
  background-image: url('../../assets/images/background.png');
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
  background: #ffffff;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #ffffff;
  backdrop-filter: blur(8px);
  padding: 24px 40px 0 40px;
}

.login__form-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  color: #222222;
  padding: 0 3px;
  span {
    margin-left: 13px;
  }
}

.login__form-body {
  margin-top: 24px;
  .el-input {
    height: 46px;
    border-radius: 8px;
    position: relative;
  }
  :deep(.el-input__wrapper) {
    padding: 1px 16px !important;
  }
  .login__form-code {
    position: absolute;
    right: 0;
    top: 0;
    width: 112px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 13px 16px;
    background: #d7d1ff;
    border-radius: 0px 8px 8px 0px;
    font-weight: 500;
    font-size: 16px;
    color: #222222;
    cursor: pointer;
  }
  .login__form-eye {
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
  }
  .login__form-button {
    width: 100%;
    height: 56px;
    background: linear-gradient(135deg, #291bff 0%, #ba3aff 100%);
    border-radius: 8px;
    color: #ffffff;
    font-weight: 500;
    font-size: 20px;
    margin-top: 27px;
  }
  .login__form-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    font-size: 14px;
    color: #999999;
    margin-top: 24px;
    cursor: pointer;
  }
}
</style>