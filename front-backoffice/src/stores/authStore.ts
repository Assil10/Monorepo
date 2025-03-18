import Cookies from 'js-cookie'
import { create } from 'zustand'

const ACCESS_TOKEN = 'thisisjustarandomstring'
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds

interface AuthUser {
  accountNo: number
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string, rememberMe?: boolean) => void
    resetAccessToken: () => void
    reset: () => void
    isAuthenticated: () => boolean
  }
}

export const useAuthStore = create<AuthState>()((set, get) => {
  const cookieState = Cookies.get(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''
  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken, rememberMe = false) =>
        set((state) => {
          const options = rememberMe
            ? { expires: new Date(Date.now() + THIRTY_DAYS) }
            : undefined // Default to session cookie

          Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken), options)
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN)
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          // Clear all auth-related cookies
          Cookies.remove(ACCESS_TOKEN)

          // Clear any other auth-related storage
          localStorage.removeItem('user-settings')
          sessionStorage.clear()

          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
      isAuthenticated: () => {
        const state = get()
        const user = state.auth.user
        const token = state.auth.accessToken

        if (!user || !token) {
          return false
        }

        // Check if token is expired
        if (user.exp && user.exp * 1000 < Date.now()) {
          state.auth.reset()
          return false
        }

        return true
      },
    },
  }
})

// export const useAuth = () => useAuthStore((state) => state.auth)
