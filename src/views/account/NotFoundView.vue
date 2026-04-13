<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700">
        <div class="text-center text-white p-8">
            <h1 class="text-9xl font-bold m-0 leading-none">404</h1>
            <p class="text-4xl my-4">Page Not Found</p>
            <p class="text-lg mb-8 opacity-90">Sorry, the requested page does not exist.</p>
            <router-link 
                :to="{ name: 'account.dashboard' }" 
                class="inline-block px-8 py-3 bg-white text-indigo-500 no-underline rounded font-semibold transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5"
            >
                Back to Dashboard
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
// 404 Not Found page component
</script>
