import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken')

      if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiResponse>) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
          window.location.href = '/'
        }

        return Promise.reject(error)
      }
    )
  }

  private unwrap<T>(response: { data: ApiResponse<T> & { succes?: boolean } }): T {
    const isSuccess = response.data.success ?? response.data.succes

    if (!isSuccess) {
      throw new Error(response.data.error ?? 'Unexpected API error')
    }

    return response.data.data as T
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.get<ApiResponse<T>>(url, config)
    return this.unwrap<T>(response)
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this.client.post<ApiResponse<T>>(url, data, config)
    return this.unwrap<T>(response)
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this.client.put<ApiResponse<T>>(url, data, config)
    return this.unwrap<T>(response)
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config)
    return this.unwrap<T>(response)
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.delete<ApiResponse<T>>(url, config)
    return this.unwrap<T>(response)
  }
}

export const apiClient = new ApiClient()