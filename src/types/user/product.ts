
export interface Product {
    id: number
    user_id: number
    name: string
    description?: string
    price: number
    category_id?: number
    status: 'active' | 'inactive' | 'draft'
    stock_quantity: number
    created_at: string
    updated_at: string
    category?: ProductCategory
    images?: ProductImage[]
}

export interface ProductCategory {
    id: number
    user_id: number
    name: string
    description?: string
    sort_order: number
    products_count?: number
    created_at: string
    updated_at: string
}

export interface ProductImage {
    id: number
    product_id: number
    image_path: string
    image_url?: string
    image_name?: string
    alt_text?: string
    sort_order: number
    is_primary: boolean
    mime_type?: string
    file_size?: number
    metadata?: Record<string, unknown>
    created_at: string
    updated_at: string
}
