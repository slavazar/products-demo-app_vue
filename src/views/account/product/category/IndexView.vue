<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-semibold text-gray-900 dark:text-slate-100">Product Categories</h1>
                <p class="mt-1 text-sm text-gray-600 dark:text-slate-400">Organize your catalog before products pile up, with user-scoped categories and reusable product assignments.</p>
            </div>

            <RouterLink
                :to="{ name: 'account.product.categories.create' }"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Create Category
            </RouterLink>
        </div>

        <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label for="search" class="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">Search</label>
                    <input
                        id="search"
                        v-model="filters.search"
                        type="text"
                        placeholder="Search categories..."
                        class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                        @input="debouncedApplyFilters"
                    >
                </div>

                <div>
                    <label for="sort" class="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">Sort</label>
                    <select
                        id="sort"
                        v-model="filters.sort"
                        class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        @change="applyFilters"
                    >
                        <option value="sort_order:asc">Sort order</option>
                        <option value="created_at:desc">Newest</option>
                        <option value="created_at:asc">Oldest</option>
                        <option value="updated_at:desc">Recently updated</option>
                        <option value="name:asc">Name (A-Z)</option>
                        <option value="name:desc">Name (Z-A)</option>
                    </select>
                </div>

                <div class="flex items-end gap-2">
                    <button
                        @click="clearFilters"
                        class="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
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

        <div v-if="isLoading" class="rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p class="text-gray-600 dark:text-slate-400">Loading categories...</p>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600">{{ error }}</p>
        </div>

        <div v-if="!isLoading && !error && categories.length === 0" class="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <p class="mb-4 text-gray-600 dark:text-slate-400">No categories found.</p>
            <RouterLink
                :to="{ name: 'account.product.categories.create' }"
                class="inline-flex px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Create your first category
            </RouterLink>
        </div>

        <div v-if="!isLoading && !error && categories.length > 0" class="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="border-b bg-gray-50 dark:border-slate-700 dark:bg-slate-800">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Name</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Description</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Sort Order</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Products</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y dark:divide-slate-700">
                        <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50 dark:hover:bg-slate-800">
                            <td class="px-6 py-4">
                                <p class="font-medium text-gray-900 dark:text-slate-100">{{ category.name }}</p>
                            </td>
                            <td class="px-6 py-4 text-gray-600 dark:text-slate-400">{{ category.description || '—' }}</td>
                            <td class="px-6 py-4 text-gray-600 dark:text-slate-400">{{ category.sort_order }}</td>
                            <td class="px-6 py-4 text-gray-600 dark:text-slate-400">{{ category.products_count ?? 0 }}</td>
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
        <!-- Pagination -->
        <Pagination :paginationData="paginationData" />

        <div v-if="deleteItem" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="deleteItem = null">
            <div class="mx-4 max-w-sm rounded-lg bg-white p-6 dark:bg-slate-900" @click.stop>
                <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-slate-100">Delete Category</h2>
                <p class="mb-4 text-gray-600 dark:text-slate-400">
                    Are you sure you want to delete "{{ deleteItem.name }}"? Products in this category will be unassigned, not deleted.
                </p>
                <div class="flex justify-end gap-2">
                    <button @click="deleteItem = null" class="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
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
import type { ProductCategory } from '@/types/user/product'
import type { LaravelPagination } from '@/types/pagination'
import Pagination from '@/components/Pagination.vue'

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
    sort: 'sort_order:asc',
})

function syncFiltersFromRoute() {
    filters.value = {
        search: (route.query.search as string) || '',
        sort: `${(route.query.sort_by as string) || 'sort_order'}:${(route.query.sort_direction as string) || 'asc'}`,
    }
}

async function loadCategories(page = 1) {
    isLoading.value = true
    error.value = ''

    try {
        const [sortBy, sortDirection] = filters.value.sort.split(':')

        const response = await fetchProductCategories({
            page,
            search: filters.value.search || undefined,
            sort_by: sortBy || undefined,
            sort_direction: sortDirection || undefined,
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
    const [sortBy, sortDirection] = filters.value.sort.split(':')

    router.push({
        query: {
            ...route.query,
            page: '1',
            search: filters.value.search || undefined,
            sort_by: sortBy || undefined,
            sort_direction: sortDirection || undefined,
        },
    })
}

let debounceTimer: number | null = null

function debouncedApplyFilters() {
    if (debounceTimer) window.clearTimeout(debounceTimer)
    debounceTimer = window.setTimeout(() => applyFilters(), 350)
}

function clearFilters() {
    filters.value = {
        search: '',
        sort: 'sort_order:asc',
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
