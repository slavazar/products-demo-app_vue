<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow">
            <h1 class="text-2xl font-bold mb-6 text-center">Dashboard</h1>
            <p class="text-center text-gray-600 mb-4">Welcome to your dashboard!</p>
            <button @click="authStore.logout"
                class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                Logout
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>