<script setup lang="ts">
import { computed } from 'vue'
import { useProgressState } from '@/utils/progress'

const { progress, isVisible } = useProgressState()

const progressStyle = computed(() => ({
    transform: `scaleX(${progress.value / 100})`,
    opacity: isVisible.value ? 1 : 0,
}))
</script>

<template>
    <div class="pointer-events-none fixed inset-x-0 top-0 z-100 h-1 overflow-hidden">
        <div
            class="h-full origin-left bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400 shadow-[0_0_18px_rgba(14,165,233,0.55)] transition-[transform,opacity] duration-200 ease-out"
            :style="progressStyle"
        />
    </div>
</template>
