<template>
  <div class="daily">
    <!-- 顶部 start -->
    <div class="daily__header">
      <div class="daily__header-left">
        <img src="../../assets/images/s-logo.png" />
        <span>GEO优化平台 2025-11-23</span>
      </div>
      <div class="daily__header-right">
        <div>
          <span style="font-size: 12px">开通时间</span>
          <span style="font-size: 14px">2025-03-23</span>
        </div>
        <div>
          <span style="font-size: 12px">开通时间</span>
          <span style="font-size: 14px">2025-03-23</span>
        </div>
        <img
          class="daily__user-trigger"
          @mouseenter="showUserMenu = true"
          @click="toggleUserMenu"
          src="../../assets/images/user.png"
        />
      </div>
      <div v-show="showUserMenu" class="daily__user-menu" @mouseleave="showUserMenu = false">
        <div class="daily__user-info">大树科技</div>
        <div class="daily__menu-item">
          <img src="../../assets/images/lock.png" />
          修改密码
        </div>
        <div class="daily__menu-item">
          <img src="../../assets/images/exit.png" />
          退出登录
        </div>
      </div>
    </div>
    <!-- 顶部 end -->

    <!-- 内容 start -->
    <div class="daily__content">
      <div class="daily__banner">
        <div class="daily__banner-title">长春常康药业有限公司</div>
        <div class="daily__banner-subtitle">实时监控各大AI平台的品牌表现，提供精准</div>
        <div style="display: flex; align-items: center;">
          <div class="daily__banner-content">
            <img src="../../assets/images/heart.png" />
            <div class="daily__banner-content-info">
              <span>5</span>
              <span>GEO核心词</span>
            </div>
          </div>
          <div class="daily__banner-content">
            <img src="../../assets/images/calc.png" />
            <div class="daily__banner-content-info">
              <span>5</span>
              <span>总计智能问答数</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 end -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleChangePassword = () => {
  console.log('修改密码')
  showUserMenu.value = false
}

const handleLogout = () => {
  console.log('退出登录')
  showUserMenu.value = false
}
</script>


<style lang="scss" scoped>
.daily {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/report-bg.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.daily__header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.43);
  //   border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  z-index: 1000;
  img {
    display: block;
    width: 32px;
    height: 32px;
  }
  .daily__header-left {
    height: 100%;
    display: flex;
    align-items: center;
    span {
      font-weight: 600;
      font-size: 20px;
      color: #fff;
      margin-left: 12px;
    }
  }
  .daily__header-right {
    display: flex;
    align-items: center;
    div {
      padding: 0 16px;
      span {
        display: block;
        color: #222222;
      }
      &:first-child {
        border-right: 1px solid rgba(34, 34, 34, 0.12);
      }
    }
    .daily__user-trigger {
      cursor: pointer;
      margin-left: 8px;
    }
  }
}
.daily__user-menu {
  position: fixed;
  top: 64px;
  right: 0;
  z-index: 1001;
  width: 136px;
  height: 120px;
  background: #ffffff;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08),
    0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  opacity: 0.95;
  font-size: 14px;
  color: #222222;
  padding: 12px 0 12px 12px;
  .daily__user-info {
    font-weight: 500;
    width: 100%;
    padding-bottom: 12px;
    border-bottom: 1px solid #eeeeee;
  }
  .daily__menu-item {
    display: flex;
    align-items: center;
    padding-top: 12px;
    cursor: pointer;
    img {
      display: block;
      width: 16px;
      height: 16px;
      margin-right: 12px;
    }
  }
}
.daily__content {
  // padding-top: 96px;
  padding: 96px 54px 0 54px;
}
.daily__banner {
  width: 100%;
  height: 186px;
  background-image: url('../../assets/images/banner.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  padding: 24px;
  .daily__banner-title {
    font-weight: 500;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
  }
  .daily__banner-subtitle {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
    margin: 4px 0 24px 0;
  }
  .daily__banner-content {
    height: 48px;
    display: flex;
    align-items: center;
    margin-right: 56px;
    img {
      display: block;
      width: 48px;
      height: 48px;
      margin-right: 12px;
    }
    .daily__banner-content-info {
      display: flex;
      flex-direction: column;
      span:first-child {
        font-weight: bold;
        font-size: 21px;
        color: rgba(0, 0, 0, 0.85);
      }
      span:last-child {
        font-size: 14px;
        color: rgba(102, 102, 102, 0.85);
      }
    }
  }
}
</style>