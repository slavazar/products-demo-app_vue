<template>
    <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <!-- Header Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Test View Component
                </h1>
                <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Welcome to the test page! This component demonstrates Tailwind CSS styling.
                </p>
            </div>

            <!-- Content Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <!-- Card 1 -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-800 p-6 hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-300">
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Development</h3>
                    <p class="text-gray-600 dark:text-gray-400">Build modern web applications quickly with Vue 3 and Tailwind CSS.</p>
                </div>

                <!-- Card 2 -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-800 p-6 hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-300">
                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reliable</h3>
                    <p class="text-gray-600 dark:text-gray-400">TypeScript ensures type safety and better development experience.</p>
                </div>

                <!-- Card 3 -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-800 p-6 hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-300">
                    <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautiful Design</h3>
                    <p class="text-gray-600 dark:text-gray-400">Create stunning interfaces with Tailwind's utility-first approach.</p>
                </div>
            </div>

            <!-- Interactive Section -->
            <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-800 p-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Interactive Demo</h2>

                <div class="flex flex-col items-center space-y-6">
                    <!-- Modal Demo -->
                    <div class="flex flex-col items-center">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Modal Window</h3>
                        <button
                            @click="isModalOpen = true"
                            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 focus:ring-offset-2 transition-colors duration-200">
                            More info
                            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        <!-- Modal Backdrop and Dialog -->
                        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                            @click.self="isModalOpen = false">
                            <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl dark:shadow-gray-800 max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
                                <!-- Modal Header -->
                                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">More Information</h2>
                                    <button
                                        @click="isModalOpen = false"
                                        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>

                                <!-- Modal Body -->
                                <div class="px-6 py-4">
                                    <p class="text-sm text-gray-700 dark:text-gray-300">
                                        <strong>Some more info...</strong><br><br>
                                        This is a modal window built with pure Tailwind CSS and Vue 3. It demonstrates interactive elements in your application with a clean, modern design.
                                    </p>
                                </div>

                                <!-- Modal Footer -->
                                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                    <button
                                        @click="isModalOpen = false"
                                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Buttons Demo -->
                    <div class="flex flex-col items-center">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Button Variants</h3>
                        <div class="flex flex-wrap gap-4">
                            <button
                                class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 focus:ring-offset-2 transition-colors duration-200">
                                Primary
                            </button>
                            <button
                                class="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 focus:ring-offset-2 transition-colors duration-200">
                                Secondary
                            </button>
                            <button
                                class="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-offset-gray-900 focus:ring-offset-2 transition-colors duration-200">
                                Success
                            </button>
                            <button
                                class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 focus:ring-offset-2 transition-colors duration-200">
                                Outline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)
</script>
