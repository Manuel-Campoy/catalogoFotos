import { apiClient } from './api'
import type { Package } from '../types/api'

export interface CreatePackagePayload {
  name: string
  description: string
  price: number
  duration: string
  includes?: string[]
  availability?: string
}

export const packageService = {
  getVendorPackages: async (vendorId: number) => {
    return apiClient.get<Package[]>(`/packages/vendors/${vendorId}/packages`)
  },

  createPackage: async (vendorId: number, payload: CreatePackagePayload) => {
    return apiClient.post<Package>(
      `/packages/vendors/${vendorId}/packages`,
      payload
    )
  },

  updatePackage: async (
    vendorId: number,
    packageId: number,
    payload: Partial<CreatePackagePayload>
  ) => {
    return apiClient.put<Package>(
      `/packages/vendors/${vendorId}/packages/${packageId}`,
      payload
    )
  },

  deletePackage: async (vendorId: number, packageId: number) => {
    return apiClient.delete<void>(
      `/packages/vendors/${vendorId}/packages/${packageId}`
    )
  },
}