import axiosInstance from '@/services/axios'

export const userService = {
  login(data) {
    return axiosInstance.post(`${import.meta.env.VITE_USER_MANAGER_BASE_URL}/login`, data)
  },
  signup(data) {
    return axiosInstance.post(`${import.meta.env.VITE_USER_MANAGER_BASE_URL}/signup`, data)
  },
  getProfile() {
    return axiosInstance.get(`${import.meta.env.VITE_USER_MANAGER_BASE_URL}/profile`)
  }
}
