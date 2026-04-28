export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface Vendor {
  id: number
  userId?: number
  name: string
  category: string
  tag?: string
  city: string
  description: string
  emoji?: string
  bgColor?: string
  verified?: boolean
  contact: string
  startPrice: number
  rating?: number
  featured?: boolean
}

export interface Package {
  id: number
  vendorId: number
  name: string
  description: string
  price: number
  duration: string
  includes?: string[]
  availability?: string
}

export interface AuthResponse {
  user: {
    id: number
    name: string
    email: string
    role: 'USER' | 'VENDOR'
  }
  token: string
}

export interface VendorFilters {
  tag?: string
  city?: string
  search?: string
  sort?: 'rating' | 'price_asc' | 'price_desc' | 'reviews'
}