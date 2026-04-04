import api from './axios'
import type { Product } from '@/types/user/product'
import type { LaravelPagination } from '@/types/pagination'
import type { ApiResponse } from '@/types/api'

export interface ProductCreatePayload {
    name: string
    description?: string
    price: number
    category_id: number | string
    status: 'active' | 'inactive' | 'draft'
    stock_quantity: number
    images?: File[]
}

export interface ProductUpdatePayload {
    name?: string
    description?: string
    price?: number
    category_id: number | string
    status?: 'active' | 'inactive' | 'draft'
    stock_quantity?: number
    images?: File[]
}

export const fetchProducts_1 = (params = {}) =>
    api.get<{ data: Product[] }>('/api/products', { params })

export const fetchProducts = (params = {}) => {
    return api.get<ApiResponse<LaravelPagination<Product>>>('/api/products', { params })
}

export const fetchProduct = (id: number | string) => {
    return api.get<ApiResponse<Product>>(`/api/products/${id}`)
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

    if (payload.category_id) {
        formData.append('category_id', payload.category_id.toString())
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
    if (payload.category_id) formData.append('category_id', payload.category_id.toString())
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
