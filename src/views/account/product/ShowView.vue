<template>
    <div class="space-y-6">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-500">Product Overview</p>
                <h1 class="text-2xl font-semibold text-gray-900">Product Details</h1>
            </div>

            <div class="flex flex-wrap gap-2">
                <RouterLink
                    :to="{ name: 'account.products.index' }"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Back to products
                </RouterLink>
                <RouterLink
                    v-if="product"
                    :to="{ name: 'account.products.edit', params: { id: product.id } }"
                    class="px-4 py-2 border border-blue-200 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                    Edit product
                </RouterLink>
                <button
                    v-if="product"
                    type="button"
                    :disabled="isDeleting"
                    class="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    @click="handleDelete"
                >
                    {{ isDeleting ? 'Deleting...' : 'Delete product' }}
                </button>
            </div>
        </div>

        <div v-if="isLoading" class="bg-white border border-gray-200 rounded-lg p-6">
            <p class="text-gray-600">Loading product details...</p>
        </div>

        <div v-else-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-6 space-y-3">
            <p class="text-red-700">{{ errorMessage }}</p>
            <button
                type="button"
                class="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                @click="loadProduct"
            >
                Try again
            </button>
        </div>

        <div v-else-if="product" class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
            <div class="space-y-6">
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div
                        class="aspect-4/3 bg-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-200"
                    >
                        <img
                            v-if="selectedImageUrl"
                            :src="selectedImageUrl"
                            :alt="selectedImageAlt"
                            class="h-full w-full object-cover"
                        />
                        <div v-else class="text-center px-6">
                            <p class="text-sm font-medium text-gray-700">No images uploaded</p>
                            <p class="text-sm text-gray-500 mt-1">Add images when editing this product.</p>
                        </div>
                    </div>

                    <div v-if="product.images?.length" class="p-4 border-t border-gray-200">
                        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <button
                                v-for="image in product.images"
                                :key="image.id"
                                type="button"
                                class="relative rounded-lg overflow-hidden border-2 bg-gray-100 transition"
                                :class="selectedImage?.id === image.id ? 'border-blue-500' : 'border-transparent hover:border-gray-300'"
                                @click="selectedImage = image"
                            >
                                <img
                                    :src="getImageUrl(image)"
                                    :alt="image.alt_text || image.image_name || product.name"
                                    class="h-24 w-full object-cover"
                                />
                                <span
                                    v-if="image.is_primary"
                                    class="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700"
                                >
                                    Primary
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                    <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                            <div class="flex items-center gap-3 flex-wrap">
                                <h2 class="text-xl font-semibold text-gray-900">{{ product.name }}</h2>
                                <span class="px-3 py-1 rounded-full text-sm font-medium capitalize" :class="statusClasses">
                                    {{ product.status }}
                                </span>
                            </div>
                            <p class="text-sm text-gray-500 mt-2">Product ID: {{ product.id }}</p>
                        </div>

                        <div class="text-left md:text-right">
                            <p class="text-sm text-gray-500">Price</p>
                            <p class="text-2xl font-semibold text-gray-900">{{ formattedPrice }}</p>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-sm font-medium text-gray-700 mb-2">Description</h3>
                        <p class="text-gray-600 whitespace-pre-line">
                            {{ product.description?.trim() || 'No description provided for this product yet.' }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Details</h2>
                    <dl class="space-y-4">
                        <div class="flex items-start justify-between gap-4">
                            <dt class="text-sm text-gray-500">Category</dt>
                            <dd class="text-sm font-medium text-gray-900 text-right">
                                {{ product.category?.name || 'Uncategorized' }}
                            </dd>
                        </div>
                        <div class="flex items-start justify-between gap-4">
                            <dt class="text-sm text-gray-500">Stock quantity</dt>
                            <dd class="text-sm font-medium text-gray-900 text-right">
                                {{ product.stock_quantity }}
                            </dd>
                        </div>
                        <div class="flex items-start justify-between gap-4">
                            <dt class="text-sm text-gray-500">Availability</dt>
                            <dd class="text-sm font-medium text-right" :class="product.stock_quantity > 0 ? 'text-green-700' : 'text-red-700'">
                                {{ product.stock_quantity > 0 ? 'In stock' : 'Out of stock' }}
                            </dd>
                        </div>
                        <div class="flex items-start justify-between gap-4">
                            <dt class="text-sm text-gray-500">Images</dt>
                            <dd class="text-sm font-medium text-gray-900 text-right">
                                {{ product.images?.length ?? 0 }}
                            </dd>
                        </div>
                        <div class="flex items-start justify-between gap-4">
                            <dt class="text-sm text-gray-500">Created</dt>
                            <dd class="text-sm font-medium text-gray-900 text-right">
                                {{ formatDate(product.created_at) }}
                            </dd>
                        </div>
                        <div class="flex items-start justify-between gap-4">
                            <dt class="text-sm text-gray-500">Last updated</dt>
                            <dd class="text-sm font-medium text-gray-900 text-right">
                                {{ formatDate(product.updated_at) }}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p class="text-green-700">{{ successMessage }}</p>
                </div>
            </div>
        </div>

        <div v-else class="bg-white border border-gray-200 rounded-lg p-6">
            <p class="text-gray-600">This product could not be found.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { deleteProduct, fetchProduct } from '@/api/products'
import type { Product, ProductImage } from '@/types/user/product'
import { getProductImageUrl } from '@/utils/productImages'

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)
const selectedImage = ref<ProductImage | null>(null)
const isLoading = ref(true)
const isDeleting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const statusClasses = computed(() => {
    if (!product.value) return ''

    if (product.value.status === 'active') {
        return 'bg-green-100 text-green-800'
    }

    if (product.value.status === 'inactive') {
        return 'bg-gray-100 text-gray-800'
    }

    return 'bg-yellow-100 text-yellow-800'
})

const formattedPrice = computed(() => {
    if (!product.value) return '$0.00'

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(product.value.price))
})

const selectedImageUrl = computed(() => {
    if (!selectedImage.value) return ''

    return getImageUrl(selectedImage.value)
})

const selectedImageAlt = computed(() => {
    if (!selectedImage.value || !product.value) return 'Product image'

    return selectedImage.value.alt_text || selectedImage.value.image_name || product.value.name
})

function getImageUrl(image: ProductImage) {
    return getProductImageUrl(image)
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value))
}

async function loadProduct() {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    try {
        const response = await fetchProduct(route.params.id as string)
        product.value = response.data.data

        const primaryImage =
            product.value.images?.find((image) => image.is_primary) ||
            product.value.images?.[0] ||
            null

        selectedImage.value = primaryImage
    } catch (error: any) {
        product.value = null
        selectedImage.value = null
        errorMessage.value = error.response?.data?.message || 'Failed to load product details.'
    } finally {
        isLoading.value = false
    }
}

async function handleDelete() {
    if (!product.value || isDeleting.value) return

    const confirmed = window.confirm(`Delete "${product.value.name}"? This action cannot be undone.`)

    if (!confirmed) return

    isDeleting.value = true
    errorMessage.value = ''
    successMessage.value = ''

    try {
        await deleteProduct(product.value.id)
        successMessage.value = 'Product deleted successfully.'
        router.push({ name: 'account.products.index' })
    } catch (error: any) {
        errorMessage.value = error.response?.data?.message || 'Failed to delete product.'
    } finally {
        isDeleting.value = false
    }
}

watch(
    () => route.params.id,
    () => {
        loadProduct()
    },
    { immediate: true },
)
</script>
