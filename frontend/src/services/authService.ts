// frontend/src/services/authService.ts
import { apiClient } from './api'
import type { AuthResponse } from '../types/api'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface ProfileResponse {
  id: number
  name: string
  email: string
  role: 'USER' | 'VENDOR'
  phone?: string | null
  city?: string | null
  avatar?: string | null
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const result = await apiClient.post<AuthResponse>('/auth/login', payload)

    localStorage.setItem('authToken', result.token)
    localStorage.setItem('user', JSON.stringify(result.user))

    return result
  },

  register: async (payload: RegisterPayload) => {
    const result = await apiClient.post<AuthResponse>('/auth/register', payload)

    localStorage.setItem('authToken', result.token)
    localStorage.setItem('user', JSON.stringify(result.user))

    return result
  },

  getProfile: async () => {
    return apiClient.get<ProfileResponse>('/auth/profile')
  },

  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  getStoredUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  getToken: () => {
    return localStorage.getItem('authToken')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  },
}