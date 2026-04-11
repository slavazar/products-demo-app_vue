<template>
    <div class="space-y-6">
        <!-- Welcome Section -->
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-slate-100">
                        Welcome back, {{ authStore.user?.name }}!
                    </h1>
                    <p class="mt-1 text-gray-600 dark:text-slate-400">
                        Here's what's happening with your account today.
                    </p>
                </div>
                <div class="hidden md:block">
                    <div class="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                        <span class="text-white text-xl font-bold">
                            {{ userInitials }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Account Status Card -->
            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div class="flex items-center">
                    <div class="rounded-lg bg-green-100 p-2 dark:bg-green-950/40">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600 dark:text-slate-400">Account Status</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-slate-100">Active</p>
                    </div>
                </div>
            </div>

            <!-- Member Since Card -->
            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div class="flex items-center">
                    <div class="rounded-lg bg-blue-100 p-2 dark:bg-blue-950/40">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600 dark:text-slate-400">Member Since</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-slate-100">{{ memberSince }}</p>
                    </div>
                </div>
            </div>

            <!-- Email Status Card -->
            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div class="flex items-center">
                    <div class="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-950/40">
                        <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600 dark:text-slate-400">Email Status</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-slate-100">
                            {{ authStore.user?.email_verified_at ? 'Verified' : 'Unverified' }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Last Login Card -->
            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div class="flex items-center">
                    <div class="rounded-lg bg-violet-100 p-2 dark:bg-violet-950/40">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600 dark:text-slate-400">Last Login</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-slate-100">Today</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">Recent Activity</h2>
            <div class="space-y-4">
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900 dark:text-slate-100">Account created</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">{{ memberSince }}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900 dark:text-slate-100">Email verified</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">{{ authStore.user?.email_verified_at ? 'Verified' : 'Pending' }}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900 dark:text-slate-100">Last login</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">Today</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const userInitials = computed(() => {
    if (!authStore.user?.name) return 'U'
    return authStore.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
})

const memberSince = computed(() => {
    if (!authStore.user?.created_at) return 'Recently'
    const date = new Date(authStore.user.created_at)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
})
</script>
