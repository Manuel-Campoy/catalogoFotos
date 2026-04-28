import { apiClient } from './api'

export type ReservationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'

export interface ReservationVendorSummary {
  name: string
  contact: string
}

export interface ReservationPackageSummary {
  name: string
  price: number
}

export interface Reservation {
  id: number
  vendorId: number
  userId: number
  packageId: number
  contactEmail: string
  notes?: string | null
  status: ReservationStatus
  createdAt?: string
  updatedAt?: string
  vendor?: ReservationVendorSummary
  package?: ReservationPackageSummary
}

export interface CreateReservationPayload {
  packageId: number
  contactEmail: string
  notes?: string
}

export interface UpdateReservationStatusPayload {
  status: ReservationStatus
}

export const reservationService = {
  createReservation: async (vendorId: number, payload: CreateReservationPayload) => {
    return apiClient.post<Reservation>(`/reservations/vendors/${vendorId}/reservations`, payload)
  },

  getMyReservations: async () => {
    return apiClient.get<Reservation[]>('/reservations')
  },

  updateReservationStatus: async (reservationId: number, status: ReservationStatus) => {
    return apiClient.patch<Reservation>(`/reservations/${reservationId}/status`, {
      status,
    })
  },
}