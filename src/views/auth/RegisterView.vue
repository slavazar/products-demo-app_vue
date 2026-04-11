<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div class="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow dark:shadow-gray-800">
            <h1 class="text-2xl font-bold mb-6 text-center dark:text-white">Register</h1>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label class="block mb-1 text-sm dark:text-gray-300">Name</label>
                    <input v-model="form.name" type="text" required
                        class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-900" />
                </div>

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

                <div>
                    <label class="block mb-1 text-sm dark:text-gray-300">Confirm Password</label>
                    <input v-model="form.password_confirmation" type="password" required
                        class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-900" />
                </div>

                <p v-if="error" class="text-red-500 dark:text-red-400 text-sm">
                    {{ error }}
                </p>

                <button type="submit" :disabled="authStore.isLoading"
                    class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition disabled:opacity-50">
                    {{ authStore.isLoading ? 'Loading...' : 'Register' }}
                </button>
            </form>

            <p class="mt-4 text-sm text-center dark:text-gray-400">
                Уже есть аккаунт?
                <router-link to="/login" class="text-blue-600 dark:text-blue-400 hover:underline">
                    Войти
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
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const error = ref<string | null>(null)

const handleRegister = async () => {
    error.value = null

    if (form.password !== form.password_confirmation) {
        error.value = 'Passwords do not match'
        return
    }

    try {
        await authStore.register(form)
        router.push('/')
    } catch (e: any) {
        error.value = e?.response?.data?.message || 'Register failed'
    }
}
</script>
