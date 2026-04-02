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

export const getCsrf = () => api.get('/sanctum/csrf-cookie')

export const login = (data: LoginData) =>
    api.post<{ user: User }>('/api/auth/login', data)

export const register = (data: RegisterData) =>
    api.post<{ user: User }>('/api/auth/register', data)

export const logout = () => api.post('/api/auth/logout')

export const getUser = () =>
    api.get<User>('/api/auth/user')