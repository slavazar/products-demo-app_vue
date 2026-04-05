<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">My Products</h1>
            <RouterLink to="/account/products/create"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Create Product</RouterLink>
        </div>

        <!-- Filter Form -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Search by Name -->
                <div>
                    <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <input
                        id="search"
                        v-model="filters.search"
                        type="text"
                        placeholder="Search products..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        @input="debouncedApplyFilters">
                </div>

                <!-- Filter by Category -->
                <div>
                    <label for="category_id" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        id="category_id"
                        v-model="filters.category_id"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        id="status"
                        v-model="filters.status"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        @change="applyFilters">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <!-- Filter Actions -->
                <div class="flex items-end gap-2">
                    <button
                        @click="clearFilters"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
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
        <div v-if="isLoading" class="bg-white border border-gray-200 rounded-lg p-4">
            <p class="text-gray-600">Loading products...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600">{{ error }}</p>
        </div>

        <!-- Empty State -->
        <div v-if="!isLoading && !error && products.length === 0"
            class="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p class="text-gray-600 mb-4">No products found.</p>
        </div>

        <!-- Products Table/Grid -->
        <div v-if="!isLoading && !error && products.length > 0"
            class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product Name</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stock</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4">
                                <p class="font-medium text-gray-900">{{ product.name }}</p>
                            </td>
                            <td class="px-6 py-4 text-gray-600">{{ product.category ? product.category.name : '—' }}</td>
                            <td class="px-6 py-4 text-gray-900 font-medium">${{ (product.price) }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ product.stock_quantity }}</td>
                            <td class="px-6 py-4">
                                <span class="px-3 py-1 rounded-full text-sm font-medium" :class="{
                                    'bg-green-100 text-green-800': product.status === 'active',
                                    'bg-gray-100 text-gray-800': product.status === 'inactive',
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
        <div v-if="paginationData && paginationData.last_page > 1"
            class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-700">
                    Showing {{ paginationData.from || 0 }} to {{ paginationData.to || 0 }} of {{ paginationData.total }} results
                </div>
                <div class="flex items-center space-x-2">
                    <!-- Previous Button -->
                    <RouterLink
                        v-if="paginationData.prev_page_url"
                        :to="{ query: { ...$route.query, page: (paginationData.current_page - 1).toString() } }"
                        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Previous
                    </RouterLink>
                    <span
                        v-else
                        class="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
                        Previous
                    </span>

                    <!-- Page Numbers -->
                    <div class="flex items-center space-x-1">
                        <template v-for="page in visiblePages" :key="page">
                            <span v-if="page < 0" class="px-2 py-2 text-sm text-gray-400">...</span>
                            <span
                                v-else-if="page === paginationData.current_page"
                                class="px-3 py-2 text-sm font-medium rounded-md bg-blue-600 text-white">
                                {{ page }}
                            </span>
                            <RouterLink
                                v-else
                                :to="{ query: { ...$route.query, page: page.toString() } }"
                                class="px-3 py-2 text-sm font-medium rounded-md text-gray-500 bg-white border border-gray-300 hover:bg-gray-50">
                                {{ page }}
                            </RouterLink>
                        </template>
                    </div>

                    <!-- Next Button -->
                    <RouterLink
                        v-if="paginationData.next_page_url"
                        :to="{ query: { ...$route.query, page: (paginationData.current_page + 1).toString() } }"
                        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Next
                    </RouterLink>
                    <span
                        v-else
                        class="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
                        Next
                    </span>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="deleteItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click="deleteItem = null">
            <div class="bg-white rounded-lg p-6 max-w-sm mx-4" @click.stop>
                <h2 class="text-lg font-semibold mb-2">Delete Product</h2>
                <p class="text-gray-600 mb-4">Are you sure you want to delete "{{ deleteItem.name }}"? This action
                    cannot be undone.</p>
                <div class="flex justify-end gap-2">
                    <button @click="deleteItem = null"
                        class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
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
    status: ''
})

// Debounce timer for search
let debounceTimer: number | null = null

const visiblePages = computed(() => {
    if (!paginationData.value) return []

    const current = paginationData.value.current_page
    const last = paginationData.value.last_page
    const pages: number[] = []

    // Always show first page
    if (last > 1) pages.push(1)

    // Calculate range around current page
    const start = Math.max(2, current - 2)
    const end = Math.min(last - 1, current + 2)

    // Add ellipsis if there's a gap after first page
    if (start > 2) pages.push(-1) // -1 represents ellipsis

    // Add pages in range
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    // Add ellipsis if there's a gap before last page
    if (end < last - 1) pages.push(-2) // -2 represents ellipsis

    // Always show last page if more than 1 page
    if (last > 1) pages.push(last)

    return pages
})

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
    
    // Reset to page 1 when applying filters
    delete query.page
    
    router.push({ query })
}

function clearFilters() {
    filters.value = {
        search: '',
        category_id: '',
        status: ''
    }
    
    const query = { ...route.query }
    delete query.search
    delete query.category_id
    delete query.status
    delete query.page
    
    router.push({ query })
}

onMounted(async () => {
    // Initialize filters from route query
    filters.value = {
        search: route.query.search as string || '',
        category_id: route.query.category_id as string || '',
        status: route.query.status as string || ''
    }
    
    const page = parseInt(route.query.page as string) || 1
    const filterParams = {
        search: filters.value.search,
        category_id: filters.value.category_id,
        status: filters.value.status
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
        status: newQuery.status as string || ''
    }
    
    const page = parseInt(newQuery.page as string) || 1
    const filterParams = {
        search: filters.value.search,
        category_id: filters.value.category_id,
        status: filters.value.status
    }
    loadProducts(page, filterParams)
})
</script>
