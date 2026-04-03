export interface ProductImage {
  id: number
  product_id: number
  image_path: string
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

export interface Product {
  id: number
  user_id: number
  name: string
  description?: string
  price: number
  category?: string
  status: 'active' | 'inactive' | 'draft'
  stock_quantity: number
  created_at: string
  updated_at: string
  images?: ProductImage[]
}