<template>
    <div v-if="paginationData && paginationData.last_page > 1" class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
                Showing {{ paginationData.from || 0 }} to {{ paginationData.to || 0 }} of {{ paginationData.total }}
                results
            </div>
            <div class="flex items-center space-x-2">
                <!-- Previous Button -->
                <RouterLink v-if="paginationData.prev_page_url"
                    :to="{ query: { ...route.query, page: (paginationData.current_page - 1).toString() } }"
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Previous
                </RouterLink>
                <span v-else
                    class="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
                    Previous
                </span>

                <!-- Page Numbers -->
                <div class="flex items-center space-x-1">
                    <template v-for="page in visiblePages" :key="page">
                        <span v-if="page < 0" class="px-2 py-2 text-sm text-gray-400">...</span>
                        <span v-else-if="page === paginationData.current_page"
                            class="px-3 py-2 text-sm font-medium rounded-md bg-blue-600 text-white">
                            {{ page }}
                        </span>
                        <RouterLink v-else :to="{ query: { ...route.query, page: page.toString() } }"
                            class="px-3 py-2 text-sm font-medium rounded-md text-gray-500 bg-white border border-gray-300 hover:bg-gray-50">
                            {{ page }}
                        </RouterLink>
                    </template>
                </div>

                <!-- Next Button -->
                <RouterLink v-if="paginationData.next_page_url"
                    :to="{ query: { ...route.query, page: (paginationData.current_page + 1).toString() } }"
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Next
                </RouterLink>
                <span v-else
                    class="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
                    Next
                </span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import type { LaravelPagination } from '@/types/pagination'
import type { Product } from '@/types/user/product'

const props = defineProps<{
    paginationData: LaravelPagination<any> | null
}>()

const route = useRoute()

const visiblePages = computed(() => {
    if (!props.paginationData) return []

    const current = props.paginationData.current_page
    const last = props.paginationData.last_page
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
</script>