<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div class="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow dark:shadow-gray-800">
            <h1 class="text-2xl font-bold mb-6 text-center dark:text-white">Login</h1>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block mb-1 text-sm dark:text-gray-300">Email</label>
                    <input v-model="form.email" type="email" required
                        class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-900" />
                </div>

                <div>
                    <label class="block mb-1 text-sm dark:text-gray-300">Password</label>
                    <input v-model="form.password" type="password" required
                        class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-900" />
                </div>

                <p v-if="error" class="text-red-500 dark:text-red-400 text-sm">
                    {{ error }}
                </p>

                <button type="submit" :disabled="authStore.isLoading"
                    class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition disabled:opacity-50">
                    {{ authStore.isLoading ? 'Loading...' : 'Login' }}
                </button>
            </form>

            <p class="mt-4 text-sm text-center dark:text-gray-400">
                Нет аккаунта?
                <router-link to="/register" class="text-blue-600 dark:text-blue-400 hover:underline">
                    Зарегистрироваться
                </router-link>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
    email: '',
    password: ''
})

const error = ref<string | null>(null)

const handleLogin = async () => {
    error.value = null

    try {
        await authStore.login(form)
        router.push('/account/dashboard')
    } catch (e: any) {
        error.value = e?.response?.data?.message || 'Login failed'
    }
}
</script>
