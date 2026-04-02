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

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow">
            <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label class="block mb-1 text-sm">Name</label>
                    <input v-model="form.name" type="text" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" />
                </div>

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

                <div>
                    <label class="block mb-1 text-sm">Confirm Password</label>
                    <input v-model="form.password_confirmation" type="password" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200" />
                </div>

                <p v-if="error" class="text-red-500 text-sm">
                    {{ error }}
                </p>

                <button type="submit" :disabled="authStore.loading"
                    class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50">
                    {{ authStore.loading ? 'Loading...' : 'Register' }}
                </button>
            </form>

            <p class="mt-4 text-sm text-center">
                Уже есть аккаунт?
                <router-link to="/login" class="text-blue-600 hover:underline">
                    Войти
                </router-link>
            </p>
        </div>
    </div>
</template>