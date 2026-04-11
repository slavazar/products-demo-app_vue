<script setup lang="ts">
import { useTheme } from '@/utils/theme'

const { themePreference, setTheme } = useTheme()
</script>

<template>
    <label class="inline-flex items-center gap-2 text-sm text-gray-600">
        <span class="hidden sm:inline">Theme</span>
        <select
            :value="themePreference"
            class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="setTheme(($event.target as HTMLSelectElement).value as 'light' | 'dark' | 'auto')"
        >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
        </select>
    </label>
</template>
