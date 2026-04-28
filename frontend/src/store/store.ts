import { create } from 'zustand'
import { authService } from '../services/authService'
import { AuthResponse } from '../types/api'

export interface User {
  id: number
  name: string
  email: string
  role: 'USER' | 'VENDOR'
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null

  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  login: (email: string, password: string) => Promise<void>
  register: (fullName: string, email: string, password: string) => Promise<void>
  logout: () => void
  hydrate: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  
  setToken: (token) => set({ token }),

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const { user, token } = await authService.login(email, password)
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error en login',
        loading: false,
      })
      throw error
    }
  },

  register: async (fullName, email, password) => {
    set({ loading: true, error: null })
    try {
      const { user, token } = await authService.register(
        fullName,
        email,
        password
      )
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error en registro',
        loading: false,
      })
      throw error
    }
  },

  logout: () => {
    authService.logout()
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    })
  },

  hydrate: () => {
    const token = authService.getToken()
    const user = authService.getStoredUser()
    
    if (token && user) {
      set({
        token,
        user,
        isAuthenticated: true,
      })
    }
  },

  clearError: () => set({ error: null }),
}))

export interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration: number
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  removeNotification: (id: number) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))