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
