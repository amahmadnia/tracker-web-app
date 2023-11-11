import axiosInstance from '@/services/axios'

const userId = '66d8bdf8-1e07-4088-9bf8-d6ec7d56c710'
const activityVersion = import.meta.env.VITE_ACTIVITY_SCHEMA_VERSION
const activitySchema = import.meta.env.VITE_ACTIVITY_SCHEMA
const activityTypeVersion = import.meta.env.VITE_ACTIVITY_TYPE_SCHEMA_VERSION
const activityTypeSchema = import.meta.env.VITE_ACTIVITY_TYPE_SCHEMA

export const activityService = {
  async deleteActivity(activityId) {
    return axiosInstance.delete(`${import.meta.env.VITE_BARJAVAND_BASE_URL}/activity`, {
      params: {
        schemaName: activitySchema,
        schemaVersion: activityVersion,
        id: activityId
      }
    })
  },

  async createActivity(data) {
    return axiosInstance.post(`${import.meta.env.VITE_BARJAVAND_BASE_URL}/new-activity`, data)
  },

  async getActivityTypes() {
    return axiosInstance.get(`${import.meta.env.VITE_BARJAVAND_BASE_URL}/activity`, {
      params: {
        schemaVersion: activityTypeVersion,
        schemaName: activityTypeSchema,
        tags: `{"userId":"${userId}"}`
      }
    })
  },

  async getActivities(userId) {
    return axiosInstance.get(`${import.meta.env.VITE_BARJAVAND_BASE_URL}/activity`, {
      params: {
        schemaName: activitySchema,
        schemaVersion: activityVersion,
        tags: `{"userId":"${userId}"}`
      }
    })
  },

  async getReports(startDate, endDate, userId) {
    return axiosInstance.get(`${import.meta.env.VITE_BARJAVAND_BASE_URL}/report`, {
      params: {
        schemaName: activitySchema,
        schemaVersion: '1.0.5',
        startDate,
        endDate,
        tags: `{"userId":"${userId}"}`
      }
    })
  }
}
