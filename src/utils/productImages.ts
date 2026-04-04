import type { ProductImage } from '@/types/user/product'

const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '')

export function getProductImageUrl(image: ProductImage) {
    if (image.image_url) {
        return image.image_url
    }

    if (image.image_path.startsWith('http://') || image.image_path.startsWith('https://')) {
        return image.image_path
    }

    return `${apiBaseUrl}/storage/${image.image_path.replace(/^\/+/, '')}`
}
