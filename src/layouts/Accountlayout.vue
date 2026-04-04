<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="relative bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo/Brand -->
                    <div class="flex items-center">
                        <RouterLink :to="{name: 'home'}" class="flex items-center hover:opacity-80 transition-opacity">
                            <img alt="Vue logo" class="h-8 w-8" src="@/assets/logo.svg" />
                            <span class="ml-2 text-xl font-semibold text-gray-900">Vue App</span>
                        </RouterLink>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path v-if="!isMobileMenuOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 0 0-2H4a1 1 0 0 0 0 2zm0 6h16a1 1 0 0 0 0-2H4a1 1 0 0 0 0 2z"/>
                                <path v-else fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.829z"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Desktop Navigation -->
                    <nav class="hidden md:flex items-center space-x-8">
                        <RouterLink :to="{name: 'account.dashboard'}"
                            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Dashboard
                        </RouterLink>
                        <RouterLink :to="{name: 'account.profile'}"
                            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Profile
                        </RouterLink>
                        <RouterLink :to="{name: 'account.settings'}"
                            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Settings
                        </RouterLink>
                        <RouterLink :to="{name: 'account.products.index'}"
                            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Products
                        </RouterLink>
                        <RouterLink :to="{name: 'account.product.categories.index'}"
                            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Categories
                        </RouterLink>

                        <!-- User Menu -->
                        <div class="border-l border-gray-300 pl-8 flex items-center space-x-4">
                            <div class="flex items-center space-x-3">
                                <!-- User Avatar -->
                                <div class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span class="text-white text-sm font-medium">
                                        {{ userInitials }}
                                    </span>
                                </div>
                                <!-- User Name -->
                                <span class="text-sm font-medium text-gray-700">
                                    {{ authStore.user?.name }}
                                </span>
                            </div>
                            <button @click="handleLogout"
                                class="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>

                <!-- Mobile Navigation -->
                <div v-if="isMobileMenuOpen" class="absolute top-full left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden transition-all duration-200 ease-in-out">
                    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <RouterLink :to="{name: 'account.dashboard'}" @click="isMobileMenuOpen = false"
                            class="block text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Dashboard
                        </RouterLink>
                        <RouterLink :to="{name: 'account.profile'}" @click="isMobileMenuOpen = false"
                            class="block text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Profile
                        </RouterLink>
                        <RouterLink :to="{name: 'account.settings'}" @click="isMobileMenuOpen = false"
                            class="block text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Settings
                        </RouterLink>
                        <RouterLink :to="{name: 'account.products.index'}" @click="isMobileMenuOpen = false"
                            class="block text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Products
                        </RouterLink>
                        <RouterLink :to="{name: 'account.product.categories.index'}" @click="isMobileMenuOpen = false"
                            class="block text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Categories
                        </RouterLink>

                        <!-- User Info in Mobile -->
                        <div class="border-t border-gray-200 mt-2 pt-2">
                            <div class="flex items-center space-x-3 px-3 py-2">
                                <div class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span class="text-white text-sm font-medium">
                                        {{ userInitials }}
                                    </span>
                                </div>
                                <span class="text-sm font-medium text-gray-700">
                                    {{ authStore.user?.name }}
                                </span>
                            </div>
                            <button @click="handleLogout"
                                class="block w-full text-left bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <!-- Breadcrumb -->
            <nav class="flex mb-4" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <RouterLink :to="{name: 'account.dashboard'}" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2A1 1 0 0 0 1 10h2v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 1-1h2a1 1 0 0 0 1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-8h2a1 1 0 0 0 .707-1.707Z"/>
                            </svg>
                            Dashboard
                        </RouterLink>
                    </li>
                    <li v-if="$route.meta.breadcrumb" aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{{ $route.meta.breadcrumb }}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <RouterView />
        </main>

        <!-- Footer -->
        <footer class="bg-white border-t border-gray-200 mt-auto">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center">
                    <p class="text-sm text-gray-500">
                        © {{ currentYear }} Vue Test App.
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted, onUpdated } from 'vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const userInitials = computed(() => {
    if (!authStore.user?.name) return 'U'
    return authStore.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
})

const currentYear = computed(() => new Date().getFullYear())

const handleLogout = async () => {
    try {
        await authStore.logout()
        router.push({ name: 'login' })
    } catch (error) {
        console.error('Logout failed:', error)
    }
}

onMounted(() => {
    // Ensure user is authenticated
    if (!authStore.isAuthenticated) {
        router.push({ name: 'login' })
    }
})

onMounted(() => {
    console.log('AccountLayout mounted')
})

onUpdated(() => {
    console.log('AccountLayout updated')
})

</script>
