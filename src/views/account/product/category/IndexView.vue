<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-semibold">Product Categories</h1>
                <p class="text-sm text-gray-600 mt-1">Organize your catalog before products pile up.</p>
            </div>

            <RouterLink
                :to="{ name: 'account.product.categories.create' }"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Create Category
            </RouterLink>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <input
                        id="search"
                        v-model="filters.search"
                        type="text"
                        placeholder="Search categories..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        @input="debouncedApplyFilters"
                    >
                </div>

                <div>
                    <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">Sort</label>
                    <select
                        id="sort"
                        v-model="filters.sort"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        @change="applyFilters"
                    >
                        <option value="sort_order">Sort order</option>
                        <option value="name">Name</option>
                        <option value="created_at">Newest</option>
                        <option value="updated_at">Recently updated</option>
                    </select>
                </div>

                <div class="flex items-end gap-2">
                    <button
                        @click="clearFilters"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                    >
                        Clear
                    </button>
                    <button
                        @click="applyFilters"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="bg-white border border-gray-200 rounded-lg p-4">
            <p class="text-gray-600">Loading categories...</p>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600">{{ error }}</p>
        </div>

        <div v-if="!isLoading && !error && categories.length === 0" class="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p class="text-gray-600 mb-4">No categories found.</p>
            <RouterLink
                :to="{ name: 'account.product.categories.create' }"
                class="inline-flex px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Create your first category
            </RouterLink>
        </div>

        <div v-if="!isLoading && !error && categories.length > 0" class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sort Order</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Products</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4">
                                <p class="font-medium text-gray-900">{{ category.name }}</p>
                            </td>
                            <td class="px-6 py-4 text-gray-600">{{ category.description || '—' }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ category.sort_order }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ category.products_count ?? 0 }}</td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <RouterLink
                                        :to="{ name: 'account.product.categories.show', params: { id: category.id } }"
                                        class="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        View
                                    </RouterLink>
                                    <RouterLink
                                        :to="{ name: 'account.product.categories.edit', params: { id: category.id } }"
                                        class="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Edit
                                    </RouterLink>
                                    <button
                                        @click="deleteItem = category"
                                        class="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="paginationData && paginationData.last_page > 1" class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-700">
                    Showing {{ paginationData.from || 0 }} to {{ paginationData.to || 0 }} of {{ paginationData.total }} results
                </div>

                <div class="flex items-center space-x-2">
                    <RouterLink
                        v-if="paginationData.prev_page_url"
                        :to="{ query: { ...$route.query, page: String(paginationData.current_page - 1) } }"
                        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Previous
                    </RouterLink>
                    <span
                        v-else
                        class="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed"
                    >
                        Previous
                    </span>

                    <div class="flex items-center space-x-1">
                        <template v-for="page in visiblePages" :key="page">
                            <span v-if="page < 0" class="px-2 py-2 text-sm text-gray-400">...</span>
                            <span
                                v-else-if="page === paginationData.current_page"
                                class="px-3 py-2 text-sm font-medium rounded-md bg-blue-600 text-white"
                            >
                                {{ page }}
                            </span>
                            <RouterLink
                                v-else
                                :to="{ query: { ...$route.query, page: String(page) } }"
                                class="px-3 py-2 text-sm font-medium rounded-md text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                            >
                                {{ page }}
                            </RouterLink>
                        </template>
                    </div>

                    <RouterLink
                        v-if="paginationData.next_page_url"
                        :to="{ query: { ...$route.query, page: String(paginationData.current_page + 1) } }"
                        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Next
                    </RouterLink>
                    <span
                        v-else
                        class="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed"
                    >
                        Next
                    </span>
                </div>
            </div>
        </div>

        <div v-if="deleteItem" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="deleteItem = null">
            <div class="bg-white rounded-lg p-6 max-w-sm mx-4" @click.stop>
                <h2 class="text-lg font-semibold mb-2">Delete Category</h2>
                <p class="text-gray-600 mb-4">
                    Are you sure you want to delete "{{ deleteItem.name }}"? This action cannot be undone.
                </p>
                <div class="flex justify-end gap-2">
                    <button @click="deleteItem = null" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
                    <button
                        @click="confirmDelete"
                        :disabled="isDeleting"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                    >
                        {{ isDeleting ? 'Deleting...' : 'Delete' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { deleteProductCategory, fetchProductCategories } from '@/api/productCategories'
import type { ProductCategory } from '@/types/user/productCategory'
import type { LaravelPagination } from '@/types/pagination'

const route = useRoute()
const router = useRouter()

const paginationData = ref<LaravelPagination<ProductCategory> | null>(null)
const categories = ref<ProductCategory[]>([])
const isLoading = ref(true)
const error = ref('')
const deleteItem = ref<ProductCategory | null>(null)
const isDeleting = ref(false)

const filters = ref({
    search: '',
    sort: 'sort_order',
})

let debounceTimer: number | null = null

const visiblePages = computed(() => {
    if (!paginationData.value) return []

    const current = paginationData.value.current_page
    const last = paginationData.value.last_page
    const pages: number[] = []

    if (last > 1) pages.push(1)

    const start = Math.max(2, current - 2)
    const end = Math.min(last - 1, current + 2)

    if (start > 2) pages.push(-1)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (end < last - 1) pages.push(-2)
    if (last > 1) pages.push(last)

    return pages
})

function syncFiltersFromRoute() {
    filters.value = {
        search: (route.query.search as string) || '',
        sort: (route.query.sort_by as string) || 'sort_order',
    }
}

async function loadCategories(page = 1) {
    isLoading.value = true
    error.value = ''

    try {
        const response = await fetchProductCategories({
            page,
            search: filters.value.search || undefined,
            sort_by: filters.value.sort || undefined,
        })

        paginationData.value = response.data.data
        categories.value = paginationData.value?.data ?? []
    } catch (e: any) {
        error.value = e.response?.data?.message || 'Failed to load categories.'
    } finally {
        isLoading.value = false
    }
}

function applyFilters() {
    router.push({
        query: {
            ...route.query,
            page: '1',
            search: filters.value.search || undefined,
            sort_by: filters.value.sort || undefined,
        },
    })
}

function debouncedApplyFilters() {
    if (debounceTimer) window.clearTimeout(debounceTimer)
    debounceTimer = window.setTimeout(() => applyFilters(), 350)
}

function clearFilters() {
    filters.value = {
        search: '',
        sort: 'sort_order',
    }

    router.push({ query: { page: '1' } })
}

async function confirmDelete() {
    if (!deleteItem.value) return

    isDeleting.value = true

    try {
        await deleteProductCategory(deleteItem.value.id)
        categories.value = categories.value.filter(category => category.id !== deleteItem.value?.id)
        deleteItem.value = null
        await loadCategories(Number(route.query.page || 1))
    } catch (e: any) {
        error.value = e.response?.data?.message || 'Failed to delete category.'
    } finally {
        isDeleting.value = false
    }
}

watch(
    () => route.query,
    (query) => {
        syncFiltersFromRoute()
        loadCategories(Number(query.page || 1))
    },
)

onMounted(() => {
    syncFiltersFromRoute()
    loadCategories(Number(route.query.page || 1))
})
</script>
