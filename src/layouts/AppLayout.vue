<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="relative bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo/Brand -->
                    <div class="flex items-center">
                        <img alt="Vue logo" class="h-8 w-8" src="@/assets/logo.svg" />
                        <span class="ml-2 text-xl font-semibold text-gray-900">{{ appTitle }}</span>
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

                    <!-- Navigation -->
                    <nav class="hidden md:flex items-center space-x-8">
                        <RouterLink to="/"
                            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Home
                        </RouterLink>
                        <RouterLink to="/about"
                            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            About
                        </RouterLink>
                        <RouterLink to="/test"
                            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Test
                        </RouterLink>
                        <div class="border-l border-gray-300 pl-8 flex space-x-4">
                            <!-- Show Dashboard link if authenticated -->
                            <RouterLink v-if="authStore.isAuthenticated" to="/account/dashboard"
                                class="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Dashboard
                            </RouterLink>
                            <!-- Show Login/Register if not authenticated -->
                            <template v-else>
                                <RouterLink to="/login"
                                    class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    active-class="text-blue-600 bg-blue-50">
                                    Login
                                </RouterLink>
                                <RouterLink to="/register"
                                    class="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                    Register
                                </RouterLink>
                            </template>
                        </div>
                    </nav>
                </div>

                <!-- Mobile Navigation -->
                <div v-if="isMobileMenuOpen" class="absolute top-full left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden transition-all duration-200 ease-in-out">
                    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <RouterLink to="/" @click="isMobileMenuOpen = false"
                            class="block text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Home
                        </RouterLink>
                        <RouterLink to="/about" @click="isMobileMenuOpen = false"
                            class="block text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            About
                        </RouterLink>
                        <RouterLink to="/test" @click="isMobileMenuOpen = false"
                            class="block text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            active-class="text-blue-600 bg-blue-50">
                            Test
                        </RouterLink>
                        <div class="border-t border-gray-200 mt-2 pt-2">
                            <!-- Show Dashboard link if authenticated -->
                            <RouterLink v-if="authStore.isAuthenticated" to="/account/dashboard" @click="isMobileMenuOpen = false"
                                class="block bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                                Dashboard
                            </RouterLink>
                            <!-- Show Login/Register if not authenticated -->
                            <template v-else>
                                <RouterLink to="/login" @click="isMobileMenuOpen = false"
                                    class="block text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                    active-class="text-blue-600 bg-blue-50">
                                    Login
                                </RouterLink>
                                <RouterLink to="/register" @click="isMobileMenuOpen = false"
                                    class="block bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                                    Register
                                </RouterLink>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <RouterView />
        </main>

        <!-- Footer -->
        <footer class="bg-white border-t border-gray-200 mt-auto">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <p class="text-center text-sm text-gray-500">
                    © 2024 Vue Test App. Built with Vue 3 and Tailwind CSS.
                </p>
            </div>
        </footer>
    </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUpdated } from 'vue'
import { useAuthStore } from '@/stores/auth'

const appTitle = import.meta.env.VITE_APP_TITLE || 'Products Demo App'

const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

onMounted(() => {
    console.log('AppLayout mounted')
})

onUpdated(() => {
    console.log('AppLayout updated')
})
</script>
