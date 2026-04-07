<template>
    <div class="space-y-6">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-500">Product Maintenance</p>
                <h1 class="text-2xl font-semibold text-gray-900">Edit Product</h1>
            </div>

            <div class="flex flex-wrap gap-2">
                <RouterLink
                    :to="{ name: 'account.products.index' }"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Back to products
                </RouterLink>
                <RouterLink
                    :to="{ name: 'account.products.show', params: { id: route.params.id } }"
                    class="px-4 py-2 border border-blue-200 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                    View details
                </RouterLink>
            </div>
        </div>

        <div v-if="isLoading" class="bg-white border border-gray-200 rounded-lg p-6">
            <p class="text-gray-600">Loading product for editing...</p>
        </div>

        <div v-else-if="loadError" class="bg-red-50 border border-red-200 rounded-lg p-6 space-y-3">
            <p class="text-red-700">{{ loadError }}</p>
            <button
                type="button"
                class="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                @click="initializeForm"
            >
                Try again
            </button>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.95fr)]">
            <div class="space-y-6">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <form class="space-y-5" @submit.prevent="handleSubmit">
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    v-model.trim="form.name"
                                    type="text"
                                    class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    :class="errors.name ? 'border-red-500' : ''"
                                    placeholder="Example product"
                                />
                                <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    v-model.number="form.price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    :class="errors.price ? 'border-red-500' : ''"
                                    placeholder="99.99"
                                />
                                <p v-if="errors.price" class="text-xs text-red-600 mt-1">{{ errors.price }}</p>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                v-model="form.category_id"
                                class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                :class="errors.category_id ? 'border-red-500' : ''"
                            >
                                <option value="">Select a category</option>
                                <option v-for="category in categoryOptions" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                            <p v-if="errors.category_id" class="text-xs text-red-600 mt-1">{{ errors.category_id }}</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                v-model="form.description"
                                rows="5"
                                class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Describe the product..."
                            ></textarea>
                        </div>

                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Stock Quantity</label>
                                <input
                                    v-model.number="form.stock_quantity"
                                    type="number"
                                    min="0"
                                    class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    :class="errors.stock_quantity ? 'border-red-500' : ''"
                                />
                                <p v-if="errors.stock_quantity" class="text-xs text-red-600 mt-1">{{ errors.stock_quantity }}</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    v-model="form.status"
                                    class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    :class="errors.status ? 'border-red-500' : ''"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="draft">Draft</option>
                                </select>
                                <p v-if="errors.status" class="text-xs text-red-600 mt-1">{{ errors.status }}</p>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Add New Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                class="mt-1 w-full"
                                @change="handleFileChange"
                            />
                            <p class="mt-1 text-xs text-gray-500">
                                You can keep up to {{ MAX_PRODUCT_IMAGES }} images per product.
                                {{ remainingImageSlots > 0 ? `You can add ${remainingImageSlots} more.` : 'Delete an existing image before adding a new one.' }}
                            </p>
                            <p v-if="errors.images" class="text-xs text-red-600 mt-1">{{ errors.images }}</p>
                            <div v-if="newImageNames.length" class="mt-3 flex flex-wrap gap-2">
                                <span
                                    v-for="name in newImageNames"
                                    :key="name"
                                    class="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
                                >
                                    {{ name }}
                                </span>
                            </div>
                        </div>

                        <div v-if="submissionError" class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                            {{ submissionError }}
                        </div>

                        <div v-if="successMessage" class="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
                            {{ successMessage }}
                        </div>

                        <div class="flex items-center gap-3">
                            <button
                                type="submit"
                                :disabled="isSubmitting"
                                class="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                                {{ isSubmitting ? 'Saving...' : 'Save changes' }}
                            </button>
                            <button
                                type="button"
                                :disabled="isSubmitting"
                                class="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                @click="resetForm"
                            >
                                Reset form
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <div class="flex items-center justify-between gap-3">
                        <h2 class="text-lg font-semibold text-gray-900">Current Images</h2>
                        <span class="text-sm text-gray-500">{{ existingImages.length }} total</span>
                    </div>

                    <div v-if="!existingImages.length" class="mt-4 rounded-lg border border-dashed border-gray-300 p-6 text-center">
                        <p class="text-sm font-medium text-gray-700">No uploaded images yet</p>
                        <p class="text-sm text-gray-500 mt-1">Use the file picker to add images when saving.</p>
                    </div>

                    <div v-else class="mt-4 space-y-4">
                        <div
                            v-for="(image, index) in existingImages"
                            :key="image.id"
                            class="rounded-lg border border-gray-200 overflow-hidden"
                        >
                            <img
                                :src="getProductImageUrl(image)"
                                :alt="image.alt_text || image.image_name || form.name || 'Product image'"
                                class="h-40 w-full object-cover bg-gray-100"
                            />
                            <div class="p-4 space-y-3">
                                <div class="flex items-center justify-between gap-3">
                                    <div class="min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate">
                                            {{ image.image_name || `Image #${index + 1}` }}
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            Sort order: {{ image.sort_order }}
                                        </p>
                                    </div>
                                    <span
                                        v-if="image.is_primary"
                                        class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
                                    >
                                        Primary
                                    </span>
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        :disabled="isManagingImages || image.is_primary"
                                        class="px-3 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                        @click="handleSetPrimary(image.id)"
                                    >
                                        Make primary
                                    </button>
                                    <button
                                        type="button"
                                        :disabled="isManagingImages || index === 0"
                                        class="px-3 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                        @click="moveImage(index, -1)"
                                    >
                                        Move up
                                    </button>
                                    <button
                                        type="button"
                                        :disabled="isManagingImages || index === existingImages.length - 1"
                                        class="px-3 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                        @click="moveImage(index, 1)"
                                    >
                                        Move down
                                    </button>
                                    <button
                                        type="button"
                                        :disabled="isManagingImages"
                                        class="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                                        @click="handleDeleteImage(image.id)"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p v-if="imageError" class="mt-4 text-sm text-red-600">{{ imageError }}</p>
                </div>

                <div class="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                    <h2 class="text-lg font-semibold text-gray-900">Editing Notes</h2>
                    <p class="text-sm text-gray-600">Changes to text fields and newly selected images are saved together.</p>
                    <p class="text-sm text-gray-600">Existing images can be reordered, promoted to primary, or deleted immediately.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
    deleteProductImage,
    fetchProduct,
    orderProductImages,
    setPrimaryProductImage,
    updateProduct,
    type ProductUpdatePayload,
} from '@/api/products'
import { getProductCategoryList } from '@/api/productCategories'
import type { Product, ProductCategory, ProductImage } from '@/types/user/product'
import { getProductImageUrl } from '@/utils/productImages'

const MAX_PRODUCT_IMAGES = import.meta.env.VITE_MAX_PRODUCT_IMAGES || 3

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isSubmitting = ref(false)
const isManagingImages = ref(false)
const loadError = ref('')
const submissionError = ref('')
const successMessage = ref('')
const imageError = ref('')
const currentProduct = ref<Product | null>(null)
const categoryOptions = ref<ProductCategory[]>([])
const newFiles = ref<File[]>([])
const existingImages = ref<ProductImage[]>([])
const errors = reactive<Record<string, string>>({})

const form = reactive({
    name: '',
    description: '',
    price: 0,
    category_id: '',
    status: 'draft' as 'active' | 'inactive' | 'draft',
    stock_quantity: 0,
})

const newImageNames = computed(() => newFiles.value.map((file) => file.name))
const remainingImageSlots = computed(() => Math.max(MAX_PRODUCT_IMAGES - existingImages.value.length, 0))

function normalizeStatus(value: string): ProductUpdatePayload['status'] {
    if (value === 'active' || value === 'inactive' || value === 'draft') {
        return value
    }

    return 'draft'
}

function clearValidationErrors() {
    Object.keys(errors).forEach((key) => delete errors[key])
}

function applyProductToForm(product: Product) {
    form.name = product.name
    form.description = product.description || ''
    form.price = Number(product.price)
    form.category_id = product.category_id ? String(product.category_id) : ''
    form.status = product.status
    form.stock_quantity = product.stock_quantity
    existingImages.value = [...(product.images ?? [])].sort((a, b) => a.sort_order - b.sort_order)
}

async function loadCategoryOptions() {
    try {
        const response = await getProductCategoryList()
        categoryOptions.value = response.data.data ?? []
    } catch {
        categoryOptions.value = []
    }
}

async function loadProduct() {
    try {
        const response = await fetchProduct(route.params.id as string)
        const loadedProduct = response.data.data
        currentProduct.value = loadedProduct
        applyProductToForm(loadedProduct)
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to load product.')
    }
}

async function initializeForm() {
    isLoading.value = true
    loadError.value = ''
    submissionError.value = ''
    successMessage.value = ''
    imageError.value = ''
    clearValidationErrors()
    newFiles.value = []

    try {
        await Promise.all([loadCategoryOptions(), loadProduct()])
    } catch (error: any) {
        loadError.value = error.response?.data?.message || 'Failed to load product for editing.'
    } finally {
        isLoading.value = false
    }
}

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files) return

    clearValidationErrors()

    if (target.files.length > remainingImageSlots.value) {
        newFiles.value = []
        errors.images = remainingImageSlots.value > 0
            ? `You can add only ${remainingImageSlots.value} more image${remainingImageSlots.value === 1 ? '' : 's'} to this product.`
            : `You can upload up to ${MAX_PRODUCT_IMAGES} images per product. Delete an existing image before adding a new one.`
        target.value = ''
        return
    }

    newFiles.value = Array.from(target.files)
}

function resetForm() {
    submissionError.value = ''
    successMessage.value = ''
    imageError.value = ''
    clearValidationErrors()
    newFiles.value = []

    if (currentProduct.value) {
        applyProductToForm(currentProduct.value)
    }
}

async function refreshProduct() {
    const response = await fetchProduct(route.params.id as string)
    currentProduct.value = response.data.data
    existingImages.value = [...(currentProduct.value.images ?? [])].sort((a, b) => a.sort_order - b.sort_order)
}

function applyValidationErrors(validationErrors: Record<string, string | string[]>) {
    Object.entries(validationErrors).forEach(([key, value]) => {
        const normalizedKey = key.startsWith('images.') ? 'images' : key

        if (errors[normalizedKey]) {
            return
        }

        errors[normalizedKey] = Array.isArray(value) ? (value[0] ?? 'Invalid value.') : String(value)
    })
}

async function handleSubmit() {
    if (!currentProduct.value) return

    isSubmitting.value = true
    submissionError.value = ''
    successMessage.value = ''
    clearValidationErrors()

    const payload: ProductUpdatePayload = {
        name: form.name,
        description: form.description,
        category_id: form.category_id ? form.category_id : '',
        price: form.price,
        status: normalizeStatus(form.status),
        stock_quantity: form.stock_quantity,
        images: newFiles.value,
    }

    if (form.category_id) {
        payload.category_id = form.category_id
    }

    try {
        const response = await updateProduct(currentProduct.value.id, payload)
        const updatedProduct = response.data.data
        currentProduct.value = updatedProduct
        applyProductToForm(updatedProduct)
        newFiles.value = []
        successMessage.value = response.data.message || 'Product updated successfully.'
    } catch (error: any) {
        const data = error.response?.data

        if (data?.errors) {
            applyValidationErrors(data.errors)
        } else {
            submissionError.value = data?.message || 'Failed to update product.'
        }
    } finally {
        isSubmitting.value = false
    }
}

async function handleSetPrimary(imageId: number) {
    if (!currentProduct.value) return

    isManagingImages.value = true
    imageError.value = ''
    successMessage.value = ''

    try {
        await setPrimaryProductImage(currentProduct.value.id, imageId)
        await refreshProduct()
    } catch (error: any) {
        imageError.value = error.response?.data?.message || 'Failed to update the primary image.'
    } finally {
        isManagingImages.value = false
    }
}

async function moveImage(index: number, direction: -1 | 1) {
    if (!currentProduct.value) return

    const targetIndex = index + direction

    if (targetIndex < 0 || targetIndex >= existingImages.value.length) {
        return
    }

    isManagingImages.value = true
    imageError.value = ''
    successMessage.value = ''

    const reorderedImages = [...existingImages.value]
    const [movedImage] = reorderedImages.splice(index, 1)
    if (!movedImage) {
        isManagingImages.value = false
        return
    }
    reorderedImages.splice(targetIndex, 0, movedImage)

    try {
        await orderProductImages(
            currentProduct.value.id,
            reorderedImages.map((image, position) => ({
                id: image.id,
                sort_order: position + 1,
            })),
        )
        await refreshProduct()
    } catch (error: any) {
        imageError.value = error.response?.data?.message || 'Failed to reorder images.'
    } finally {
        isManagingImages.value = false
    }
}

async function handleDeleteImage(imageId: number) {
    if (!currentProduct.value || isManagingImages.value) return

    const confirmed = window.confirm('Delete this image? This action cannot be undone.')

    if (!confirmed) return

    isManagingImages.value = true
    imageError.value = ''
    successMessage.value = ''

    try {
        await deleteProductImage(currentProduct.value.id, imageId)
        await refreshProduct()
    } catch (error: any) {
        imageError.value = error.response?.data?.message || 'Failed to delete image.'
    } finally {
        isManagingImages.value = false
    }
}

watch(
    () => route.params.id,
    () => {
        initializeForm()
    },
    { immediate: true },
)
</script>
