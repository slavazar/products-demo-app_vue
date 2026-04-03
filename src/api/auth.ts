import api from './axios'
import type { User } from '@/types/user'

interface LoginData {
    email: string
    password: string
}

interface RegisterData {
    name: string
    email: string
    password: string
    password_confirmation: string
}

interface AuthResponse {
    user: User | null,
    message: string
}

export const getCsrf = () => api.get('/sanctum/csrf-cookie')

export const login = (data: LoginData) =>
    api.post<AuthResponse>('/api/auth/login', data)

export const register = (data: RegisterData) =>
    api.post<AuthResponse>('/api/auth/register', data)

export const logout = () => api.post<AuthResponse>('/api/auth/logout')

export const getUser = () =>
    api.get<AuthResponse>('/api/auth/user')