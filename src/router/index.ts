import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

async function checkAuthUser() {
    const authStore = useAuthStore()

    if (authStore.user) {
        return { name: 'account.dashboard' }
    }

    await authStore.fetchUser()

    if (authStore.isAuthenticated) {
        return { name: 'account.dashboard' }
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/HomeView.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/TestView.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/LoginView.vue'),
        beforeEnter: [checkAuthUser]
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/RegisterView.vue'),
        beforeEnter: [checkAuthUser]
    },
    {
        path: '/account/dashboard',
        name: 'account.dashboard',
        component: () => import('../views/account/DashboardView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/account/profile',
        name: 'account.profile',
        component: () => import('../views/account/ProfileView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumb: 'Profile'
        }
    },
    {
        path: '/account/settings',
        name: 'account.settings',
        component: () => import('../views/account/SettingsView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumb: 'Settings'
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.beforeEach(async (to, _from) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth) {
        if (!authStore.user) {
            await authStore.fetchUser()
        }
        
        if (!authStore.isAuthenticated) {
            return { name: 'login' }
        }
    }
})

export default router
