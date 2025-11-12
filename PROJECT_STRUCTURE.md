# Vue 3 + TypeScript 项目结构说明

## 项目概述
本项目是一个基于Vue 3和TypeScript的现代化前端应用，采用模块化架构设计，使用Pinia进行状态管理，vue-router处理路由，Vite作为构建工具。

## 项目根目录文件

### package.json
项目配置文件，定义了项目依赖、脚本命令等
- 依赖管理：Vue 3, Pinia, vue-router, Element Plus等
- 脚本命令：dev(开发), build(构建), lint(代码检查)等

### tsconfig.json
TypeScript配置文件，定义了编译选项和路径映射

### vite.config.ts
Vite构建工具配置文件，包含开发服务器配置和构建选项

### index.html
应用入口HTML文件

## src/ 目录结构

### assets/ - 静态资源
- main.scss: 全局样式文件

### components/ - 可复用组件
- HelloWorld.vue: 示例组件
- TheWelcome.vue: 欢迎页面组件
- WelcomeItem.vue: 欢迎页面子项组件
- icons/: 图标组件目录

### router/ - 路由配置
- index.ts: 路由定义文件，配置应用的所有页面路由

### services/ - 网络请求服务
- api.ts: Axios实例配置，包含请求和响应拦截器
- auth.ts: 认证相关API接口定义
- daily.ts: 日报相关API接口定义
- index.ts: 统一导出所有服务

### stores/ - 状态管理 (Pinia)
- auth.ts: 认证状态管理，存储用户信息和token
- counter.ts: 计数器状态示例

### types/ - TypeScript类型定义
- auth.ts: 认证相关类型定义
- daily.ts: 日报相关类型定义
- index.ts: 统一导出所有类型

### views/ - 页面组件
- LoginView.vue: 登录页面
- DailyView.vue: 日报页面
- AboutView.vue: 关于页面
- FindPasswordView.vue: 找回密码页面
- ApiExample.vue: API调用示例页面

## 核心功能说明

### 认证流程
1. 用户在LoginView.vue输入凭据
2. 调用services/auth.ts中的API方法进行登录
3. 登录成功后，token存储到stores/auth.ts中并持久化到localStorage
4. 通过router/index.ts中的路由守卫保护需要认证的页面

### 状态管理
使用Pinia进行状态管理，auth store负责管理用户认证状态，counter store作为状态管理示例。

### 网络请求
所有网络请求通过services/目录下的文件处理，api.ts配置了统一的请求拦截器和响应拦截器。