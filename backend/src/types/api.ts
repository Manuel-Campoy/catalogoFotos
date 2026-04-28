export interface ApiResponse<T = any> {
    succes: boolean;
    data?: T,
    error?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
        role: 'USER' | 'VENDOR';
    };
    token: string;
}

export interface VendorFilterQuery {
    tag?: string;
    city?: string;
    search?: string;
    sort?: 'rating' | 'price_asc' | 'price_desc' | 'reviews';
}

export interface CreateVendorRequest {
    name: string;
    category: string;
    tag: string;
    city: string;
    description: string;
    emoji?: string;
    bgColor?: string;
    contact: string;
    startPrice: number;
}

export interface CreateReviewRequest {
    vendorId: number;
    packageName: string;
    rating: number;
    text: string;
}

export interface CreateReservationRequest {
    vendorId: number;
    packageId: number;
    contactEmail: string;
    notes?: string;
}

export interface ApiError {
    message: string;
    status: number;
    code?: string;
}