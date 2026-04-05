<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-semibold">Product Category Details</h1>
                <p class="text-sm text-gray-600 mt-1">Review how this category is named, ordered, and used.</p>
            </div>

            <div class="flex gap-2">
                <RouterLink :to="{ name: 'account.product.categories.index' }" class="px-4 py-2 border rounded-md hover:bg-gray-100">
                    Back
                </RouterLink>
                <RouterLink
                    :to="{ name: 'account.product.categories.edit', params: { id: route.params.id } }"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Edit
                </RouterLink>
            </div>
        </div>

        <div v-if="isLoading" class="bg-white border border-gray-200 rounded-lg p-4">
            <p class="text-gray-600">Loading category...</p>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600">{{ error }}</p>
        </div>

        <div v-else-if="category" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                <div>
                    <p class="text-sm font-medium text-gray-500">Name</p>
                    <h2 class="text-xl font-semibold text-gray-900 mt-1">{{ category.name }}</h2>
                </div>

                <div>
                    <p class="text-sm font-medium text-gray-500">Description</p>
                    <p class="text-gray-700 mt-1">{{ category.description || 'No description provided.' }}</p>
                </div>

                <div class="rounded-lg bg-blue-50 border border-blue-100 p-4">
                    <p class="text-sm text-blue-900">
                        Deleting this category will leave existing products intact and simply clear their category assignment.
                    </p>
                </div>
            </div>

            <div class="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                <div>
                    <p class="text-sm font-medium text-gray-500">Sort Order</p>
                    <p class="text-lg font-semibold text-gray-900 mt-1">{{ category.sort_order }}</p>
                </div>

                <div>
                    <p class="text-sm font-medium text-gray-500">Products Assigned</p>
                    <p class="text-lg font-semibold text-gray-900 mt-1">{{ category.products_count ?? 0 }}</p>
                </div>

                <div>
                    <p class="text-sm font-medium text-gray-500">Created</p>
                    <p class="text-gray-700 mt-1">{{ formatDate(category.created_at) }}</p>
                </div>

                <div>
                    <p class="text-sm font-medium text-gray-500">Updated</p>
                    <p class="text-gray-700 mt-1">{{ formatDate(category.updated_at) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { fetchProductCategory } from '@/api/productCategories'
import type { ProductCategory } from '@/types/user/product'
import { formatDate } from '@/utils'

const route = useRoute()

const category = ref<ProductCategory | null>(null)
const isLoading = ref(true)
const error = ref('')

async function loadCategory() {
    isLoading.value = true
    error.value = ''

    try {
        const response = await fetchProductCategory(route.params.id as string)
        category.value = response.data.data
    } catch (e: any) {
        error.value = e.response?.data?.message || 'Failed to load category.'
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadCategory()
})
</script>
