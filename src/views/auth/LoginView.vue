<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow">
            <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block mb-1 text-sm">Email</label>
                    <input v-model="form.email" type="email" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" />
                </div>

                <div>
                    <label class="block mb-1 text-sm">Password</label>
                    <input v-model="form.password" type="password" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" />
                </div>

                <p v-if="error" class="text-red-500 text-sm">
                    {{ error }}
                </p>

                <button type="submit" :disabled="authStore.loading"
                    class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                    {{ authStore.loading ? 'Loading...' : 'Login' }}
                </button>
            </form>

            <p class="mt-4 text-sm text-center">
                Нет аккаунта?
                <router-link to="/register" class="text-blue-600 hover:underline">
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
