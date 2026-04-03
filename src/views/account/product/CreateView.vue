<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">Create Product</h1>
            <RouterLink to="/account/products" class="px-4 py-2 border rounded-md hover:bg-gray-100">Back to products
            </RouterLink>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-6">
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Product Name</label>
                        <input v-model="form.name" type="text"
                            class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            :class="errors.name ? 'border-red-500' : ''" placeholder="Example product" />
                        <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Price</label>
                        <input v-model.number="form.price" type="number" step="0.01" min="0"
                            class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            :class="errors.price ? 'border-red-500' : ''" placeholder="99.99" />
                        <p v-if="errors.price" class="text-xs text-red-600 mt-1">{{ errors.price }}</p>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <input v-model="form.category" type="text"
                        class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Electronics" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="form.description" rows="4"
                        class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe the product..."></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Stock Quantity</label>
                        <input v-model.number="form.stock_quantity" type="number" min="0"
                            class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Status</label>
                        <select v-model="form.status"
                            class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Images</label>
                    <input type="file" multiple accept="image/*" @change="handleFileChange" class="mt-1 w-full" />
                    <p v-if="errors.images" class="text-xs text-red-600 mt-1">{{ errors.images }}</p>
                    <div v-if="imageNames.length" class="mt-2 text-sm text-gray-600">
                        Selected: {{ imageNames.join(', ') }}
                    </div>
                </div>

                <div class="flex items-center space-x-2">
                    <button type="submit" :disabled="submitting"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                        {{ submitting ? 'Saving...' : 'Create Product' }}
                    </button>
                    <span v-if="successMessage" class="text-green-600">{{ successMessage }}</span>
                    <span v-if="errorMessage" class="text-red-600">{{ errorMessage }}</span>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as productsApi from '@/api/products' // adjust based on your api helper

const router = useRouter()

const form = reactive({
    name: '',
    description: '',
    price: 0,
    category: '',
    status: 'active',
    stock_quantity: 0,
})

const files = ref<File[]>([])
const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const errors = reactive<Record<string, string>>({})

const imageNames = computed(() => files.value.map(f => f.name))

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files) return
    files.value = Array.from(target.files)
}

async function handleSubmit() {
    submitting.value = true
    successMessage.value = ''
    errorMessage.value = ''
    Object.keys(errors).forEach(key => delete errors[key])

    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('description', form.description)
    payload.append('price', String(form.price))
    payload.append('category', form.category)
    payload.append('status', form.status)
    payload.append('stock_quantity', String(form.stock_quantity))

    files.value.forEach((file, index) => {
        payload.append(`images[${index}]`, file)
    })

    try {
        const response = await productsApi.createProduct(payload)

        if (response.data?.success) {
            successMessage.value = 'Product created successfully.'
            setTimeout(() => { router.push({ name: 'account.products.index' }) }, 800)
        } else {
            errorMessage.value = response.data?.message || 'Failed to create product.'
        }
    } catch (e: any) {
        const data = e.response?.data
        if (data?.errors) {
            Object.assign(errors, data.errors)
        } else {
            errorMessage.value = data?.message || 'An error occurred.'
        }
    } finally {
        submitting.value = false
    }
}
</script>