import axios from 'axios'
import { getCookie } from '@/plugins/cookies'
const systemName = import.meta.env.VITE_SYSTEM

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  timeout: 10000,
  headers: {
    'gateway-token': getCookie(),
    'gateway-system': systemName,
    system: systemName
  }
})
axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data.data
  },
  (error) => {
    return Promise.reject({
      status: error.response.status,
      error: error.response.data.data,
      devErr: error.response
    })
  }
)

export default axiosInstance
