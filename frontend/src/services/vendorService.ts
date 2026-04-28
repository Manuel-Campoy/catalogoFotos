import { apiClient } from './api'
import type { Vendor, VendorFilters } from '../types/api'

export const vendorService = {
  getVendors: async (filters?: VendorFilters) => {
    const params = new URLSearchParams()

    if (filters?.tag) params.set('tag', filters.tag)
    if (filters?.city) params.set('city', filters.city)
    if (filters?.search) params.set('search', filters.search)
    if (filters?.sort) params.set('sort', filters.sort)

    const query = params.toString()
    return apiClient.get<Vendor[]>(`/vendors${query ? `?${query}` : ''}`)
  },

  getVendorById: async (id: number) => {
    return apiClient.get<Vendor>(`/vendors/${id}`)
  },

  createVendor: async (payload: Omit<Vendor, 'id' | 'rating' | 'reviewCount'>) => {
    return apiClient.post<Vendor>('/vendors', payload)
  },

  updateVendor: async (
    id: number,
    payload: Partial<Omit<Vendor, 'id'>>
  ) => {
    return apiClient.put<Vendor>(`/vendors/${id}`, payload)
  },

  deleteVendor: async (id: number) => {
    return apiClient.delete<void>(`/vendors/${id}`)
  },
}