<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-semibold">Edit Product Category</h1>
                <p class="text-sm text-gray-600 mt-1">Tune the structure without losing clarity for the catalog.</p>
            </div>

            <RouterLink :to="{ name: 'account.product.categories.index' }" class="px-4 py-2 border rounded-md hover:bg-gray-100">
                Back to categories
            </RouterLink>
        </div>

        <div v-if="isLoading" class="bg-white border border-gray-200 rounded-lg p-4">
            <p class="text-gray-600">Loading category...</p>
        </div>

        <div v-else class="bg-white border border-gray-200 rounded-lg p-6">
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Category Name</label>
                    <input
                        v-model="form.name"
                        type="text"
                        class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        :class="errors.name ? 'border-red-500' : ''"
                    >
                    <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        v-model="form.description"
                        rows="4"
                        class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        :class="errors.description ? 'border-red-500' : ''"
                    />
                    <p v-if="errors.description" class="text-xs text-red-600 mt-1">{{ errors.description }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Sort Order</label>
                    <input
                        v-model.number="form.sort_order"
                        type="number"
                        min="0"
                        class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        :class="errors.sort_order ? 'border-red-500' : ''"
                    >
                    <p v-if="errors.sort_order" class="text-xs text-red-600 mt-1">{{ errors.sort_order }}</p>
                </div>

                <div class="flex items-center space-x-2">
                    <button
                        type="submit"
                        :disabled="submitting"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {{ submitting ? 'Saving...' : 'Update Category' }}
                    </button>
                    <span v-if="successMessage" class="text-green-600">{{ successMessage }}</span>
                    <span v-if="errorMessage" class="text-red-600">{{ errorMessage }}</span>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { fetchProductCategory, updateProductCategory } from '@/api/productCategories'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const errors = reactive<Record<string, string>>({})

const form = reactive({
    name: '',
    description: '',
    sort_order: 0,
})

function assignErrors(serverErrors?: Record<string, string[]>) {
    Object.keys(errors).forEach(key => delete errors[key])

    if (!serverErrors) return

    Object.entries(serverErrors).forEach(([key, messages]) => {
        errors[key] = messages[0] ?? 'Invalid value.'
    })
}

async function loadCategory() {
    isLoading.value = true
    errorMessage.value = ''

    try {
        const response = await fetchProductCategory(route.params.id as string)
        const category = response.data.data

        form.name = category.name
        form.description = category.description || ''
        form.sort_order = category.sort_order
    } catch (e: any) {
        errorMessage.value = e.response?.data?.message || 'Failed to load category.'
    } finally {
        isLoading.value = false
    }
}

async function handleSubmit() {
    submitting.value = true
    successMessage.value = ''
    errorMessage.value = ''
    assignErrors()

    try {
        const response = await updateProductCategory(route.params.id as string, form)

        if (response.data?.success) {
            successMessage.value = 'Category updated successfully.'
            router.push({ name: 'account.product.categories.index' })
            return
        }

        errorMessage.value = response.data?.message || 'Failed to update category.'
    } catch (e: any) {
        assignErrors(e.response?.data?.errors)
        errorMessage.value = e.response?.data?.message || 'An error occurred.'
    } finally {
        submitting.value = false
    }
}

onMounted(() => {
    loadCategory()
})
</script>
