<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="app-container">
    <div v-if="authStore.isAuthenticated" class="logout-container">
      <button @click="authStore.clearAuth" class="logout-button">登出</button>
    </div>
    <RouterView />
  </div>
</template>

<style lang="scss">
// 全局样式已在main.ts中引入

.app-container {
  width: 100%;
  height: 100%;
}

.logout-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.logout-button {
  padding: 8px 16px;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e45656;
  }
}
</style>