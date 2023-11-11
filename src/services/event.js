import axiosInstance from '@/services/axios'

const eventVersion = import.meta.env.VITE_EVENT_SCHEMA_VERSION
const eventSchema = import.meta.env.VITE_EVENT_SCHEMA

export const eventService = {
  async deleteEvent(eventId) {
    return axiosInstance.delete(
      `${
        import.meta.env.VITE_BARJAVAND_BASE_URL
      }/event?schemaVersion=${eventVersion}&schemaName=${eventSchema}&id=${eventId}`
    )
  },

  async createEvent(data) {
    return axiosInstance.post(`${import.meta.env.VITE_BARJAVAND_BASE_URL}/new-event`, data)
  },

  async getEvents(userId) {
    return axiosInstance.get(
      `${
        import.meta.env.VITE_BARJAVAND_BASE_URL
      }/event?schemaVersion=${eventVersion}&schemaName=${eventSchema}&tags={"userId":"${userId}"}`
    )
  }
}
