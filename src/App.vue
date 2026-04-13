<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import AccountLayout from './layouts/Accountlayout.vue'
import GlobalProgressBar from '@/components/GlobalProgressBar.vue'

const route = useRoute()

const currentLayout = computed(() => {
    //return route.path.startsWith('/account') ? AccountLayout : AppLayout
    return route.name?.toString().startsWith('account') ? AccountLayout : AppLayout
})
</script>

<template>
    <GlobalProgressBar />
    <component :is="currentLayout" />
</template>
