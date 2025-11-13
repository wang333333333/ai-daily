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
        <div style="display: flex; align-items: center">
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
      <div class="daily__keywords">
        <div class="daily__keywords-title">品牌关键词</div>
        <div class="daily__keywords-list">
          <div class="daily__keywords-item" v-for="(item, index) in keywords" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="daily__ai-visibility">
        <div class="daily__ai-visibility-title">品牌AI可见度</div>
        <div class="daily__chart-stats">
          <div class="daily__chart-stat-item">
            <div class="daily__chart-stat-color" style="background: #852fff"></div>
            <span>上榜比例</span>
          </div>
          <div class="daily__chart-stat-item">
            <div class="daily__chart-stat-color" style="background: #ff8505"></div>
            <span>前三比例</span>
          </div>
        </div>
        <div ref="chartRef" class="daily__chart"></div>
      </div>
      <div class="daily__qa-analysis">
        <!-- AI平台问答分布详情 -->
        <div class="daily__qa-distribution">
          <div class="daily__qa-distribution-title">AI平台问答分布详情</div>
          <!-- 环形图 -->
          <div class="daily__pie-chart-wrapper">
            <div ref="pieChartRef" class="daily__pie-chart"></div>
            <!-- 中心显示内容 -->
            <div class="daily__pie-center">
              <div class="daily__pie-center-label">总问答</div>
              <div class="daily__pie-center-value">{{ pieTotal }}</div>
            </div>
          </div>
          <!-- 数据列表 -->
          <div class="daily__pie-legend">
            <div class="daily__pie-legend-item" v-for="(item, index) in pieData" :key="index">
              <div class="daily__pie-legend-color" :style="{ background: item.color }"></div>
              <span class="daily__pie-legend-name">{{ item.name }}</span>
              <span class="daily__pie-legend-value">{{ item.value }}%</span>
            </div>
          </div>
        </div>

        <!-- 智能问答详情 -->
        <div class="daily__smart-qa">
          <div class="daily__smart-qa-title">智能问答详情</div>
          <!-- 问答详情内容 -->
        </div>
      </div>
    </div>
    <!-- 内容 end -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

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

const keywords = ref([
  '感冒灵颗粒',
  '泰诺酚麻美敏片',
  '泰诺酚麻美敏片',
  '泰诺酚麻美敏片',
  '泰诺酚麻美敏片',
])

const aiList = ref([
  {
    name: '999感冒灵',
    value: 85,
    value1: 72,
  },
  {
    name: '泰诺林',
    value: 85,
    value1: 72,
  },
])

// ECharts 相关
const chartRef = ref(null)
let chartInstance = null

// 环形图相关
const pieChartRef = ref(null)
let pieChartInstance = null

// 环形图数据
const pieData = ref([
  { name: 'ChatGPT', value: 30, color: '#852FFF' },
  { name: '文心一言', value: 25, color: '#FF8505' },
  { name: 'Kimi', value: 20, color: '#00C9FF' },
  { name: '豆包', value: 15, color: '#52C41A' },
  { name: '通义千问', value: 10, color: '#FA8C16' },
])

// 计算总和
const pieTotal = computed(() => {
  return pieData.value.reduce((sum, item) => sum + item.value, 0)
})

// 图表数据
const chartData = ref([
  {
    name: '999感冒灵',
    value: 85,
    value1: 72,
  },
  {
    name: '泰诺林',
    value: 85,
    value1: 72,
  },
  {
    name: '感康',
    value: 68,
    value1: 91,
  },
  {
    name: '白加黑',
    value: 76,
    value1: 65,
  },
])

const initChart = () => {
  if (!chartRef.value) return

  // 初始化图表实例
  chartInstance = echarts.init(chartRef.value)

  // 提取数据
  const names = chartData.value.map((item) => item.name)
  const values = chartData.value.map((item) => item.value)
  const values1 = chartData.value.map((item) => item.value1)

  // 配置图表选项
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function(params) {
        let result = params[0].name + '<br/>'
        params.forEach(item => {
            console.log('item',item)
          result += item.marker + item.seriesName + ': ' + item.value + '%<br/>'
        })
        return result
      }
    },
    legend: {
      data: ['上榜比例', '前三比例'],
      show: false, // 隐藏默认图例，使用自定义图例
    },
    grid: {
      left: '1.5%',
      right: '1%',
      top: '10%',
      bottom: '12%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: names,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%',
      },
    },
    series: [
      {
        name: '上榜比例',
        type: 'bar',
        data: values,
        itemStyle: {
          color: '#852FFF',
        },
        barWidth: 40,
      },
      {
        name: '前三比例',
        type: 'bar',
        data: values1,
        itemStyle: {
          color: '#FF8505',
        },
        barWidth: 40,
      },
    ],
  }

  // 设置图表配置
  chartInstance.setOption(option)

  // 监听窗口大小变化，自动调整图表大小
  window.addEventListener('resize', handleResize)
}

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
  if (pieChartInstance) {
    pieChartInstance.resize()
  }
}

// 初始化环形图
const initPieChart = () => {
  if (!pieChartRef.value) return

  // 初始化图表实例
  pieChartInstance = echarts.init(pieChartRef.value)

  // 配置环形图选项
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}%',
    },
    legend: {
      show: false, // 隐藏默认图例，使用自定义图例
    },
    series: [
      {
        name: 'AI平台分布',
        type: 'pie',
        radius: ['50%', '70%'], // 内半径和外半径，设置为环形图
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{d}%', // 显示百分比
          fontSize: 14,
          color: '#666666',
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 10,
        },
        data: pieData.value.map((item) => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: item.color,
          },
        })),
      },
    ],
  }

  // 设置图表配置
  pieChartInstance.setOption(option)
}

onMounted(() => {
  initChart()
  initPieChart()
})

onUnmounted(() => {
  // 清理工作
  window.removeEventListener('resize', handleResize)
  if (chartInstance) {
    chartInstance.dispose()
  }
  if (pieChartInstance) {
    pieChartInstance.dispose()
  }
})
</script>


<style lang="scss" scoped>
.daily {
  width: 100%;
  min-height: 100vh;
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
  padding: 96px 54px 54px 54px;
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
.daily__keywords {
  width: 100%;
  height: 161px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 36px 24px 16px;
  margin-top: 24px;
  .daily__keywords-title {
    position: relative;
    font-weight: 500;
    font-size: 24px;
    color: #222222;
    padding-left: 12px;
    margin-bottom: 24px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 28px;
      background: linear-gradient(135deg, #1bdaff 0%, #2220ff 100%);
      border-radius: 3px;
    }
  }
  .daily__keywords-list {
    display: flex;
    align-items: center;
    .daily__keywords-item {
      flex: 1;
      height: 48px;
      line-height: 48px;
      text-align: center;
      background: #d8d2ff;
      border-radius: 12px;
      margin-left: 16px;
      font-size: 18px;
      color: #222222;
      &:first-child {
        margin-left: 0;
        background: linear-gradient(135deg, #291bff 0%, #ba3aff 100%);
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
.daily__ai-visibility {
  width: 100%;
  height: 432px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 24px;
  padding: 24px 70px 18px 16px;
  position: relative;
  .daily__ai-visibility-title {
    position: relative;
    font-weight: 500;
    font-size: 24px;
    color: #222222;
    padding-left: 12px;
    margin-bottom: 24px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 28px;
      background: linear-gradient(135deg, #ffaa1b 0%, #8920ff 100%);
      border-radius: 3px;
    }
  }
  .daily__chart-stats {
    // position: absolute;
    // top: 24px;
    // right: 70px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    gap: 24px;
    .daily__chart-stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      .daily__chart-stat-color {
        width: 8px;
        height: 8px;
        border-radius: 2px;
      }
      span {
        font-size: 12px;
        color: #8c8c8c;
      }
    }
  }
  .daily__chart {
    width: 100%;
    height: 350px;
  }
}
.daily__qa-analysis {
  width: 100%;
  height: 480px;
  display: flex;
  align-items: center;
  margin-top: 24px;
  .daily__qa-distribution {
    flex: 1;
    height: 100%;
    background: #ffffff;
    border-radius: 16px;
    margin-right: 24px;
    padding: 24px 24px 24px 16px;
    display: flex;
    flex-direction: column;
    .daily__qa-distribution-title {
      position: relative;
      font-weight: 500;
      font-size: 24px;
      color: #222222;
      padding-left: 12px;
      margin-bottom: 24px;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 28px;
        background: linear-gradient(135deg, #ffaa1b 0%, #8920ff 100%);
        border-radius: 3px;
      }
    }
    .daily__pie-chart {
      width: 100%;
      height: 260px;
      flex-shrink: 0;
    }
    .daily__pie-chart-wrapper {
      position: relative;
      width: 100%;
      height: 260px;
      flex-shrink: 0;
    }
    .daily__pie-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      pointer-events: none;
      .daily__pie-center-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
      .daily__pie-center-value {
        font-weight: bold;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .daily__pie-legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
      padding: 0 16px;
      margin-top: 12px;
      .daily__pie-legend-item {
        width: 40%;
        display: flex;
        align-items: center;
        .daily__pie-legend-color {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .daily__pie-legend-name {
          flex: 1;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
        }
        .daily__pie-legend-value {
          font-weight: 500;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }
  .daily__smart-qa {
    flex: 2;
    height: 100%;
    background: #ffffff;
    border-radius: 16px;
  }
}
</style>