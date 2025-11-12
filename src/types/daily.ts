// types/daily.ts - 日报相关类型定义
export interface DailyReport {
  id: number
  date: string
  workContent: string
  problems: string
  tomorrowPlan: string
  userId: number
  createdAt: string
  updatedAt: string
}

export interface DailyReportRequest {
  date: string
  workContent: string
  problems: string
  tomorrowPlan: string
}

export interface DailyReportListResponse {
  reports: DailyReport[]
  total: number
  page: number
  pageSize: number
}