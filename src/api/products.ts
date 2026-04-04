import api from './axios'
import type { Product } from '@/types/user/product'

export interface ProductCreatePayload {
    name: string
    description?: string
    price: number
    category?: string
    status: 'active' | 'inactive' | 'draft'
    stock_quantity: number
    images?: File[]
}

export interface ProductUpdatePayload {
    name?: string
    description?: string
    price?: number
    category?: string
    status?: 'active' | 'inactive' | 'draft'
    stock_quantity?: number
    images?: File[]
}

export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success?: boolean;
    errors?: Record<string, string[]>;
}

export interface LaravelPagination<T> {
    current_page: number;
    data: T[]; // The actual array of items (e.g., User[], Post[])
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export const fetchProducts_1 = (params = {}) =>
    api.get<{ data: Product[] }>('/api/products', { params })

export const fetchProducts = (params = {}) => {
    return api.get<ApiResponse<LaravelPagination<Product>>>('/api/products', { params })
}

export const createProduct = (payload: ProductCreatePayload) => {
    const formData = new FormData()
    formData.append('name', payload.name)
    formData.append('price', payload.price.toString())
    formData.append('status', payload.status)
    formData.append('stock_quantity', payload.stock_quantity.toString())

    if (payload.description) {
        formData.append('description', payload.description)
    }

    if (payload.category) {
        formData.append('category', payload.category)
    }

    if (payload.images) {
        payload.images.forEach((image) => {
            formData.append('images[]', image)
        })
    }

    return api.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const updateProduct = (id: number | string, payload: ProductUpdatePayload) => {
    const formData = new FormData()

    if (payload.name) formData.append('name', payload.name)
    if (payload.description) formData.append('description', payload.description)
    if (payload.price !== undefined) formData.append('price', payload.price.toString())
    if (payload.category) formData.append('category', payload.category)
    if (payload.status) formData.append('status', payload.status)
    if (payload.stock_quantity !== undefined) formData.append('stock_quantity', payload.stock_quantity.toString())

    if (payload.images) {
        payload.images.forEach((image) => {
            formData.append('images[]', image)
        })
    }

    return api.post(`/api/products/${id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const deleteProduct = (id: number | string) =>
    api.delete(`/api/products/${id}`)

export const deleteProductImage = (productId: number | string, imageId: number | string) =>
    api.delete(`/api/products/${productId}/images/${imageId}`)

export const orderProductImages = (productId: number | string, images: Array<{ id: number | string; sort_order: number }>) =>
    api.patch(`/api/products/${productId}/images/order`, { images })

export const setPrimaryProductImage = (productId: number | string, imageId: number | string) =>
    api.patch(`/api/products/${productId}/images/primary`, { image_id: imageId })
