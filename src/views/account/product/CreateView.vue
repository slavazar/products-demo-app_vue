<template>
    <div class="space-y-6">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-500">Product Setup</p>
                <h1 class="text-2xl font-semibold text-gray-900">Create Product</h1>
            </div>

            <div class="flex flex-wrap gap-2">
                <RouterLink
                    :to="{ name: 'account.products.index' }"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Back to products
                </RouterLink>
            </div>
        </div>

        <div v-if="isLoading" class="bg-white border border-gray-200 rounded-lg p-6">
            <p class="text-gray-600">Loading categories...</p>
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
                            <label class="block text-sm font-medium text-gray-700">Add Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                class="mt-1 w-full"
                                @change="handleFileChange"
                            />
                            <p v-if="errors.images" class="text-xs text-red-600 mt-1">{{ errors.images }}</p>
                            <div v-if="selectedImageNames.length" class="mt-3 flex flex-wrap gap-2">
                                <span
                                    v-for="name in selectedImageNames"
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
                                {{ isSubmitting ? 'Creating...' : 'Create product' }}
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
                        <h2 class="text-lg font-semibold text-gray-900">Selected Images</h2>
                        <span class="text-sm text-gray-500">{{ selectedFiles.length }} total</span>
                    </div>

                    <div v-if="!selectedFiles.length" class="mt-4 rounded-lg border border-dashed border-gray-300 p-6 text-center">
                        <p class="text-sm font-medium text-gray-700">No images selected yet</p>
                        <p class="text-sm text-gray-500 mt-1">Choose one or more files and they’ll be uploaded when the product is created.</p>
                    </div>

                    <div v-else class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div
                            v-for="(file, index) in selectedFiles"
                            :key="file.name + file.size + index"
                            class="rounded-lg border border-gray-200 overflow-hidden"
                        >
                            <div class="h-40 w-full bg-gray-100">
                                <img
                                    :src="previewUrls[index]"
                                    :alt="file.name"
                                    class="h-full w-full object-cover"
                                />
                            </div>
                            <div class="p-4 space-y-2">
                                <p class="text-sm font-medium text-gray-900 break-all">{{ file.name }}</p>
                                <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                    <h2 class="text-lg font-semibold text-gray-900">Creation Notes</h2>
                    <p class="text-sm text-gray-600">Images are uploaded together with the initial product details.</p>
                    <p class="text-sm text-gray-600">After creation, you can manage image order and choose a primary image from the edit screen.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { createProduct, type ProductCreatePayload } from '@/api/products'
import { getProductCategoryList } from '@/api/productCategories'
import { formatFileSize } from '@/utils'
import type { ProductCategory } from '@/types/user/product'

const router = useRouter()

const isLoading = ref(true)
const isSubmitting = ref(false)
const loadError = ref('')
const submissionError = ref('')
const successMessage = ref('')
const categoryOptions = ref<ProductCategory[]>([])
const selectedFiles = ref<File[]>([])
const previewUrls = ref<string[]>([])
const errors = reactive<Record<string, string>>({})

const form = reactive({
    name: '',
    description: '',
    price: 0,
    category_id: '',
    status: 'active' as 'active' | 'inactive' | 'draft',
    stock_quantity: 0,
})

const selectedImageNames = computed(() => selectedFiles.value.map((file) => file.name))

function normalizeStatus(value: string): ProductCreatePayload['status'] {
    if (value === 'active' || value === 'inactive' || value === 'draft') {
        return value
    }

    return 'draft'
}

function clearValidationErrors() {
    Object.keys(errors).forEach((key) => delete errors[key])
}

function revokePreviewUrls() {
    previewUrls.value.forEach((url) => URL.revokeObjectURL(url))
    previewUrls.value = []
}

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files) return

    revokePreviewUrls()
    selectedFiles.value = Array.from(target.files)
    previewUrls.value = selectedFiles.value.map((file) => URL.createObjectURL(file))
}

function resetForm() {
    form.name = ''
    form.description = ''
    form.price = 0
    form.category_id = ''
    form.status = 'active'
    form.stock_quantity = 0
    selectedFiles.value = []
    revokePreviewUrls()
    submissionError.value = ''
    successMessage.value = ''
    clearValidationErrors()
}

async function loadCategoryOptions() {
    try {
        const response = await getProductCategoryList()
        categoryOptions.value = response.data.data ?? []
    } catch {
        categoryOptions.value = []
        throw new Error('Failed to load categories.')
    }
}

async function initializeForm() {
    isLoading.value = true
    loadError.value = ''

    try {
        await loadCategoryOptions()
    } catch {
        loadError.value = 'Failed to load product categories.'
    } finally {
        isLoading.value = false
    }
}

async function handleSubmit() {
    isSubmitting.value = true
    submissionError.value = ''
    successMessage.value = ''
    clearValidationErrors()

    const payload: ProductCreatePayload = {
        name: form.name,
        description: form.description,
        category_id: form.category_id ? form.category_id : '',
        price: form.price,
        status: normalizeStatus(form.status),
        stock_quantity: form.stock_quantity,
        images: selectedFiles.value,
    }

    /*
    if (form.category_id) {
        payload.category_id = form.category_id
    }
    */

    try {
        const response = await createProduct(payload)
        successMessage.value = response.data.message || 'Product created successfully.'
        //router.push({ name: 'account.products.index' })
        router.push({ name: 'account.products.edit', params: { id: response.data.data.id } })
    } catch (error: any) {
        const data = error.response?.data

        if (data?.errors) {
            Object.entries(data.errors).forEach(([key, value]) => {
                errors[key] = Array.isArray(value) ? value[0] : String(value)
            })
        } else {
            submissionError.value = data?.message || 'Failed to create product.'
        }
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => {
    initializeForm()
})

onBeforeUnmount(() => {
    revokePreviewUrls()
})
</script>
