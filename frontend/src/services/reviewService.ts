import { apiClient } from './api'

export interface ReviewUser {
  name: string
  avatar?: string | null
}

export interface Review {
  id: number
  vendorId: number
  userId: number
  packageName: string
  rating: number
  text: string
  createdAt: string
  updatedAt: string
  user?: ReviewUser
}

export interface CreateReviewPayload {
  packageName: string
  rating: number
  text: string
}

export const reviewService = {
  getVendorReviews: async (vendorId: number) => {
    return apiClient.get<Review[]>(`/reviews/vendors/${vendorId}/reviews`)
  },

  createReview: async (vendorId: number, payload: CreateReviewPayload) => {
    return apiClient.post<Review>(`/reviews/vendors/${vendorId}/reviews`, payload)
  },

  deleteReview: async (reviewId: number) => {
    return apiClient.delete<{ message: string }>(`/reviews/reviews/${reviewId}`)
  },
}