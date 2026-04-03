<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">My Products</h1>
      <RouterLink to="/account/products/create" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Create Product</RouterLink>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg p-4">
      <p class="text-gray-600">This is your product list placeholder. Hook this to the API endpoint using your product controller.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>