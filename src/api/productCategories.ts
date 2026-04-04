import api from './axios'
import type { ProductCategory } from '@/types/user/product-category'
import type { LaravelPagination } from '@/types/pagination'
import type { ApiResponse } from '@/types/api'

export interface ProductCategoryPayload {
    name: string
    description?: string
    sort_order: number
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
