import { useAuthStore, User } from '../store/store'
import { useEffect } from 'react'

interface UseAuthReturn {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (fullName: string, email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuth = (): UseAuthReturn => {
  const {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    hydrate,
    clearError,
  } = useAuthStore()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  }
}