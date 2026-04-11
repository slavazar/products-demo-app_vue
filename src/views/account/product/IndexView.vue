<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-slate-100">My Products</h1>
            <RouterLink to="/account/products/create"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Create Product</RouterLink>
        </div>

        <!-- Filter Form -->
        <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <!-- Search by Name -->
                <div>
                    <label for="search" class="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">Search</label>
                    <input
                        id="search"
                        v-model="filters.search"
                        type="text"
                        placeholder="Search products..."
                        class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                        @input="debouncedApplyFilters">
                </div>

                <!-- Filter by Category -->
                <div>
                    <label for="category_id" class="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">Category</label>
                    <select
                        id="category_id"
                        v-model="filters.category_id"
                        class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        @change="applyFilters">
                        <option value="">All Categories</option>
                        <option
                            v-for="category in categoryOptions"
                            :key="category.id"
                            :value="String(category.id)"
                        >
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <!-- Filter by Status -->
                <div>
                    <label for="status" class="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
                    <select
                        id="status"
                        v-model="filters.status"
                        class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        @change="applyFilters">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <!-- Sort -->
                <div>
                    <label for="sort" class="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">Sort</label>
                    <select
                        id="sort"
                        v-model="filters.sort"
                        class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        @change="applyFilters">
                        <option value="created_at:desc">Newest</option>
                        <option value="created_at:asc">Oldest</option>
                        <option value="updated_at:desc">Recently updated</option>
                        <option value="name:asc">Name (A-Z)</option>
                        <option value="name:desc">Name (Z-A)</option>
                        <option value="price:asc">Price (Low to High)</option>
                        <option value="price:desc">Price (High to Low)</option>
                        <option value="status:asc">Status (A-Z)</option>
                        <option value="status:desc">Status (Z-A)</option>
                    </select>
                </div>

                <!-- Filter Actions -->
                <div class="flex items-end gap-2">
                    <button
                        @click="clearFilters"
                        class="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                        Clear Filters
                    </button>
                    <button
                        @click="applyFilters"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Apply
                    </button>
                </div>
            </div>
        </div>

        <!-- loading State -->
        <div v-if="isLoading" class="rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p class="text-gray-600 dark:text-slate-400">Loading products...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600">{{ error }}</p>
        </div>

        <!-- Empty State -->
        <div v-if="!isLoading && !error && products.length === 0"
            class="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <p class="mb-4 text-gray-600 dark:text-slate-400">No products found.</p>
        </div>

        <!-- Products Table/Grid -->
        <div v-if="!isLoading && !error && products.length > 0"
            class="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="border-b bg-gray-50 dark:border-slate-700 dark:bg-slate-800">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Product Name</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Category</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Price</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Stock</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Status</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y dark:divide-slate-700">
                        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 dark:hover:bg-slate-800">
                            <td class="px-6 py-4">
                                <p class="font-medium text-gray-900 dark:text-slate-100">{{ product.name }}</p>
                            </td>
                            <td class="px-6 py-4 text-gray-600 dark:text-slate-400">{{ product.category ? product.category.name : '—' }}</td>
                            <td class="px-6 py-4 font-medium text-gray-900 dark:text-slate-100">${{ (product.price) }}</td>
                            <td class="px-6 py-4 text-gray-600 dark:text-slate-400">{{ product.stock_quantity }}</td>
                            <td class="px-6 py-4">
                                <span class="px-3 py-1 rounded-full text-sm font-medium" :class="{
                                    'bg-green-100 text-green-800': product.status === 'active',
                                    'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-200': product.status === 'inactive',
                                    'bg-yellow-100 text-yellow-800': product.status === 'draft'
                                }">
                                    {{ product.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <RouterLink :to="`/account/products/${product.id}`"
                                        class="text-blue-600 hover:text-blue-800 text-sm">View</RouterLink>
                                    <RouterLink :to="`/account/products/${product.id}/edit`"
                                        class="text-blue-600 hover:text-blue-800 text-sm">Edit</RouterLink>
                                    <button @click="deleteProductModal(product)"
                                        class="text-red-600 hover:text-red-800 text-sm">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Pagination -->
        <Pagination :paginationData="paginationData" />

        <!-- Delete Confirmation Modal -->
        <div v-if="deleteItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            @click="deleteItem = null">
            <div class="mx-4 max-w-sm rounded-lg bg-white p-6 dark:bg-slate-900" @click.stop>
                <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-slate-100">Delete Product</h2>
                <p class="mb-4 text-gray-600 dark:text-slate-400">Are you sure you want to delete "{{ deleteItem.name }}"? This action
                    cannot be undone.</p>
                <div class="flex justify-end gap-2">
                    <button @click="deleteItem = null"
                        class="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
                    <button @click="confirmDelete" :disabled="isDeleting"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50">
                        {{ isDeleting ? 'Deleting...' : 'Delete' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { fetchProducts, deleteProduct } from '@/api/products'
import { getProductCategoryList } from '@/api/productCategories'
import type { Product } from '@/types/user/product'
import type { ProductCategory } from '@/types/user/product'
import type { LaravelPagination } from '@/types/pagination'
import Pagination from '@/components/Pagination.vue'

const route = useRoute()
const router = useRouter()

const paginationData = ref<LaravelPagination<Product> | null>(null)
const products = ref<Product[] | []>([])
const categoryOptions = ref<ProductCategory[]>([])
const isLoading = ref(true)
const error = ref('')
const deleteItem = ref<Product | null>(null)
const isDeleting = ref(false)

// Filter state
const filters = ref({
    search: '',
    category_id: '',
    status: '',
    sort: 'created_at:desc'
})

// Debounce timer for search
let debounceTimer: number | null = null

async function loadProducts(page = 1, filterParams = {}) {
    isLoading.value = true
    error.value = ''

    try {
        const params = {
            page,
            ...filterParams
        }
        const response = await fetchProducts(params)
        paginationData.value = response.data.data ?? null
        products.value = paginationData.value.data ?? []
    } catch (e: any) {
        error.value = e.response?.data?.message || 'Failed to load products'
    } finally {
        isLoading.value = false
    }
}

async function loadProductCategoryOptions() {
    try {
        const response = await getProductCategoryList()

        categoryOptions.value = response.data.data ?? []
    } catch {
        categoryOptions.value = []
    }
}

function deleteProductModal(product: Product) {
    deleteItem.value = product
}

async function confirmDelete() {
    if (!deleteItem.value) return

    isDeleting.value = true

    try {
        await deleteProduct(deleteItem.value.id)
        if (products.value) {
            products.value = products.value.filter(p => p.id !== deleteItem.value!.id)
        }
        deleteItem.value = null
    } catch (e: any) {
        error.value = e.response?.data?.message || 'Failed to delete product'
    } finally {
        isDeleting.value = false
    }
}

// Filter functions
function debouncedApplyFilters() {
    if (debounceTimer) {
        clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
        applyFilters()
    }, 300)
}

function applyFilters() {
    const query = { ...route.query }
    const [sortBy, sortDirection] = filters.value.sort.split(':')
    
    // Update query with filter values
    if (filters.value.search) {
        query.search = filters.value.search
    } else {
        delete query.search
    }
    
    if (filters.value.category_id) {
        query.category_id = filters.value.category_id
    } else {
        delete query.category_id
    }
    
    if (filters.value.status) {
        query.status = filters.value.status
    } else {
        delete query.status
    }

    if (sortBy) {
        query.sort_by = sortBy
    } else {
        delete query.sort_by
    }

    if (sortDirection) {
        query.sort_direction = sortDirection
    } else {
        delete query.sort_direction
    }
    
    // Reset to page 1 when applying filters
    delete query.page
    
    router.push({ query })
}

function clearFilters() {
    filters.value = {
        search: '',
        category_id: '',
        status: '',
        sort: 'created_at:desc'
    }
    
    const query = { ...route.query }
    delete query.search
    delete query.category_id
    delete query.status
    delete query.sort_by
    delete query.sort_direction
    delete query.page
    
    router.push({ query })
}

onMounted(async () => {
    // Initialize filters from route query
    filters.value = {
        search: route.query.search as string || '',
        category_id: route.query.category_id as string || '',
        status: route.query.status as string || '',
        sort: `${route.query.sort_by as string || 'created_at'}:${route.query.sort_direction as string || 'desc'}`
    }
    
    const page = parseInt(route.query.page as string) || 1
    const filterParams = {
        search: filters.value.search,
        category_id: filters.value.category_id,
        status: filters.value.status,
        sort_by: route.query.sort_by as string || 'created_at',
        sort_direction: route.query.sort_direction as string || 'desc'
    }
    await loadProductCategoryOptions()
    await loadProducts(page, filterParams)
})

// Watch for route query changes (browser back/forward or filter changes)
watch(() => route.query, (newQuery) => {
    // Update filters from query
    filters.value = {
        search: newQuery.search as string || '',
        category_id: newQuery.category_id as string || '',
        status: newQuery.status as string || '',
        sort: `${newQuery.sort_by as string || 'created_at'}:${newQuery.sort_direction as string || 'desc'}`
    }
    
    const page = parseInt(newQuery.page as string) || 1
    const filterParams = {
        search: filters.value.search,
        category_id: filters.value.category_id,
        status: filters.value.status,
        sort_by: newQuery.sort_by as string || 'created_at',
        sort_direction: newQuery.sort_direction as string || 'desc'
    }
    loadProducts(page, filterParams)
})
</script>
