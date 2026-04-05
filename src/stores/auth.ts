import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authApi from '@/api/auth'
import type { User } from '@/types/user'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref(false)
    const isLoading = ref(false)

    async function fetchUser() {
        try {
            isLoading.value = true
            const res = await authApi.getUser()
            user.value = res.data.user
            isAuthenticated.value = true
        } catch {
            user.value = null
            isAuthenticated.value = false
        } finally {
            isLoading.value = false
        }
    }

    async function login(form: { email: string; password: string }) {
        isLoading.value = true
        try {
            await authApi.getCsrf()
            await authApi.login(form)
            await fetchUser()
        } finally {
            isLoading.value = false
        }
    }

    async function register(form: {
        name: string
        email: string
        password: string
        password_confirmation: string
    }) {
        isLoading.value = true
        try {
            await authApi.getCsrf()
            await authApi.register(form)
            await fetchUser()
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        user.value = null
        isAuthenticated.value = false
        await authApi.logout()
    }

    return { user, isAuthenticated, isLoading, fetchUser, login, register, logout }
})
