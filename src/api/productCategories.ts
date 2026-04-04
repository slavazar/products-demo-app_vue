import api from './axios'
import type { ProductCategory } from '@/types/user/product-category'

export interface ProductCategoryPayload {
    name: string
    description?: string
    sort_order: number
}

export interface ApiResponse<T = unknown> {
    data: T
    message?: string
    success?: boolean
    errors?: Record<string, string[]>
}

export interface LaravelPagination<T> {
    current_page: number
    data: T[]
    first_page_url: string
    from: number | null
    last_page: number
    last_page_url: string
    links: Array<{ url: string | null; label: string; active: boolean }>
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export const fetchProductCategories = (params = {}) =>
    api.get<ApiResponse<LaravelPagination<ProductCategory>>>('/api/product/categories', { params })

export const fetchProductCategory = (id: number | string) =>
    api.get<ApiResponse<ProductCategory>>(`/api/product/categories/${id}`)

export const createProductCategory = (payload: ProductCategoryPayload) =>
    api.post<ApiResponse<ProductCategory>>('/api/product/categories', payload)

export const updateProductCategory = (id: number | string, payload: Partial<ProductCategoryPayload>) =>
    api.put<ApiResponse<ProductCategory>>(`/api/product/categories/${id}`, payload)

export const deleteProductCategory = (id: number | string) =>
    api.delete<ApiResponse<null>>(`/api/product/categories/${id}`)
