<template>
    <div class="flex items-center justify-between py-3">
        <div>
            <span class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ pagination.from }}</span>
                to
                <span class="font-medium">{{ pagination.to }}</span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
            </span>
        </div>
        <div>
            <button
                @click="$emit('previous')"
                :disabled="!pagination.prev_page_url"
                class="mr-2 rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>
            <button
                @click="$emit('next')"
                :disabled="!pagination.next_page_url"
                class="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">

defineProps<{
    pagination: {
        from: number
        to: number
        total: number
        prev_page_url: string | null
        next_page_url: string | null
    }
}>()
</script>