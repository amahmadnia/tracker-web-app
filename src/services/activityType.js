import axiosInstance from '@/services/axios'

const activityTypeVersion = import.meta.env.VITE_ACTIVITY_TYPE_SCHEMA_VERSION
const activityTypeSchema = import.meta.env.VITE_ACTIVITY_TYPE_SCHEMA

export const activityTypeService = {
  async getActivityTypes(userId) {
    return axiosInstance.get(`${import.meta.env.VITE_BARJAVAND_BASE_URL}/activity-type`, {
      params: {
        schemaVersion: activityTypeVersion,
        schemaName: activityTypeSchema
      }
    })
  }
}
