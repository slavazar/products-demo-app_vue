import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authApi from '@/api/auth'
import type { User } from '@/types/user'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref(false)
    const loading = ref(false)

    async function fetchUser() {
        try {
            loading.value = true
            const res = await authApi.getUser()
            user.value = res.data
            isAuthenticated.value = true
        } catch {
            user.value = null
            isAuthenticated.value = false
        } finally {
            loading.value = false
        }
    }

    async function login(form: { email: string; password: string }) {
        loading.value = true
        try {
            await authApi.getCsrf()
            await authApi.login(form)
            await fetchUser()
        } finally {
            loading.value = false
        }
    }

    async function register(form: {
        name: string
        email: string
        password: string
        password_confirmation: string
    }) {
        loading.value = true
        try {
            await authApi.getCsrf()
            await authApi.register(form)
            await fetchUser()
        } finally {
            loading.value = false
        }
    }

    async function logout() {
        await authApi.logout()
        user.value = null
        isAuthenticated.value = false
    }

    return { user, isAuthenticated, loading, fetchUser, login, register, logout }
})
