<template>
    <div class="about-page">
        <!-- Hero Section -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div class="text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        About Our Vue App
                    </h1>
                    <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                        A modern web application built with Vue 3, TypeScript, and Tailwind CSS
                    </p>
                </div>
            </div>
        </div>

        <!-- Content Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <!-- Technology Stack -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-gray-800 p-6 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Modern Tech Stack</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                        Built with Vue 3 Composition API, TypeScript for type safety, and Vite for fast development.
                    </p>
                </div>

                <!-- Responsive Design -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-gray-800 p-6 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Responsive Design</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                        Fully responsive layout that works perfectly on desktop, tablet, and mobile devices.
                    </p>
                </div>

                <!-- Performance -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-gray-800 p-6 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">High Performance</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                        Optimized with lazy loading, code splitting, and modern build tools for lightning-fast
                        performance.
                    </p>
                </div>
            </div>

            <!-- Mission Section -->
            <div class="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                    <p class="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        We're passionate about creating exceptional web experiences using the latest technologies.
                        This application demonstrates modern web development practices with Vue 3, showcasing
                        component-based architecture, reactive data binding, and beautiful user interfaces.
                    </p>
                </div>
            </div>

            <!-- Features List -->
            <div class="mt-16">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Key Features</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-semibold text-sm">1</span>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Vue 3 Composition API</h3>
                            <p class="text-gray-600 dark:text-gray-400">Modern reactive programming with better TypeScript support</p>
                        </div>
                    </div>

                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-semibold text-sm">2</span>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Tailwind CSS</h3>
                            <p class="text-gray-600 dark:text-gray-400">Utility-first CSS framework for rapid UI development</p>
                        </div>
                    </div>

                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-semibold text-sm">3</span>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">TypeScript</h3>
                            <p class="text-gray-600 dark:text-gray-400">Type-safe development with better developer experience</p>
                        </div>
                    </div>

                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-semibold text-sm">4</span>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Vite Build Tool</h3>
                            <p class="text-gray-600 dark:text-gray-400">Lightning-fast development server and optimized production
                                builds</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
