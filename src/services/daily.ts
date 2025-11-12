// daily.ts - 日报相关API
import apiClient from './api'

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

export const dailyApi = {
  // 提交日报
  submitDailyReport(data: DailyReportRequest): Promise<{ data: DailyReport }> {
    return apiClient.post('/daily', data)
  },

  // 获取日报列表
  getDailyReports(date?: string): Promise<{ data: DailyReport[] }> {
    const params = date ? { date } : {}
    return apiClient.get('/daily', { params })
  },

  // 获取单个日报详情
  getDailyReport(id: number): Promise<{ data: DailyReport }> {
    return apiClient.get(`/daily/${id}`)
  },

  // 更新日报
  updateDailyReport(id: number, data: DailyReportRequest): Promise<{ data: DailyReport }> {
    return apiClient.put(`/daily/${id}`, data)
  },

  // 删除日报
  deleteDailyReport(id: number): Promise<{ data: any }> {
    return apiClient.delete(`/daily/${id}`)
  },
}