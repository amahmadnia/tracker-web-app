import axiosInstance from '@/services/axios'

export const fileManagerService = {
  upload(data) {
    return axiosInstance.put(`${import.meta.env.VITE_FILE_MANAGER_BASE_URL}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
