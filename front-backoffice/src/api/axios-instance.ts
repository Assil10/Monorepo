import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token and checking expiration
axiosInstance.interceptors.request.use(
  (config) => {
    const auth = useAuthStore.getState().auth
    const accessToken = auth.accessToken

    // Check if token exists and is not expired
    if (accessToken && auth.user?.exp) {
      // Check if token is expired
      if (auth.user.exp * 1000 < Date.now()) {
        auth.reset()
        window.location.href = '/sign-in?redirect=' + window.location.pathname
        return Promise.reject('Token expired')
      }

      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for handling authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If error is 401 (Unauthorized) or 403 (Forbidden)
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear auth state
      useAuthStore.getState().auth.reset()

      // Redirect to login page
      if (!originalRequest.url.includes('/auth/')) {
        window.location.href = '/sign-in?redirect=' + window.location.pathname
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
