import axiosInstance from '@/services/axios'

export const authService = {
  login(data) {
    return axiosInstance.post(`${import.meta.env.VITE_USER_MANAGER_BASE_URL}/login`, data)
  },
  signup(data) {
    return axiosInstance.post(`${import.meta.env.VITE_USER_MANAGER_BASE_URL}/signup`, data)
  }
}
