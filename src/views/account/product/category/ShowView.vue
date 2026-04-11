<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-semibold text-gray-900 dark:text-slate-100">Product Category Details</h1>
                <p class="mt-1 text-sm text-gray-600 dark:text-slate-400">Review how this category is named, ordered, and used.</p>
            </div>

            <div class="flex gap-2">
                <RouterLink :to="{ name: 'account.product.categories.index' }" class="rounded-md border px-4 py-2 hover:bg-gray-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
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

        <div v-if="isLoading" class="rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p class="text-gray-600 dark:text-slate-400">Loading category...</p>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600">{{ error }}</p>
        </div>

        <div v-else-if="category" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-slate-400">Name</p>
                    <h2 class="mt-1 text-xl font-semibold text-gray-900 dark:text-slate-100">{{ category.name }}</h2>
                </div>

                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-slate-400">Description</p>
                    <p class="mt-1 text-gray-700 dark:text-slate-300">{{ category.description || 'No description provided.' }}</p>
                </div>

                <div class="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
                    <p class="text-sm text-blue-900 dark:text-blue-200">
                        Deleting this category will leave existing products intact and simply clear their category assignment.
                    </p>
                </div>
            </div>

            <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-slate-400">Sort Order</p>
                    <p class="mt-1 text-lg font-semibold text-gray-900 dark:text-slate-100">{{ category.sort_order }}</p>
                </div>

                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-slate-400">Products Assigned</p>
                    <p class="mt-1 text-lg font-semibold text-gray-900 dark:text-slate-100">{{ category.products_count ?? 0 }}</p>
                </div>

                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-slate-400">Created</p>
                    <p class="mt-1 text-gray-700 dark:text-slate-300">{{ formatDate(category.created_at) }}</p>
                </div>

                <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-slate-400">Updated</p>
                    <p class="mt-1 text-gray-700 dark:text-slate-300">{{ formatDate(category.updated_at) }}</p>
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
