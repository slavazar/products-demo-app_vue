import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

async function checkAuthUser() {
    const authStore = useAuthStore()

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
        path: '/account',
        name: 'account',
        redirect: { name: 'account.dashboard' },
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
            breadcrumbs: [
                {
                    label: 'Profile'
                }
            ]
        }
    },
    {
        path: '/account/settings',
        name: 'account.settings',
        component: () => import('../views/account/SettingsView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    label: 'Settings'
                }
            ]
        }
    },
    {
        path: '/account/products',
        name: 'account.products.index',
        component: () => import('../views/account/product/IndexView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    label: 'Products'
                }
            ]
        }
    },
    {
        path: '/account/products/create',
        name: 'account.products.create',
        component: () => import('../views/account/product/CreateView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    label: 'Products',
                    to: { name: 'account.products.index' }
                },
                {
                    label: 'Create Product'
                }
            ]
        }
    },
    {
        path: '/account/products/:id',
        name: 'account.products.show',
        component: () => import('../views/account/product/ShowView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    label: 'Products',
                    to: { name: 'account.products.index' }
                },
                {
                    label: 'Product Details'
                }
            ]
        }
    },
    {
        path: '/account/products/:id/edit',
        name: 'account.products.edit',
        component: () => import('../views/account/product/EditView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    label: 'Products',
                    to: { name: 'account.products.index' }
                },
                {
                    label: 'Edit Product'
                }
            ]
        }
    },
    {
        path: '/account/product/categories',
        name: 'account.product.categories.index',
        component: () => import('../views/account/product/category/IndexView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    label: 'Product Categories'
                }
            ]
        }
    },
    {
        path: '/account/product/categories/create',
        name: 'account.product.categories.create',
        component: () => import('../views/account/product/category/CreateView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    label: 'Product Categories',
                    to: { name: 'account.product.categories.index' }
                },
                {
                    label: 'Create Category'
                }
            ]
        }
    },
    {
        path: '/account/product/categories/:id',
        name: 'account.product.categories.show',
        component: () => import('../views/account/product/category/ShowView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    label: 'Product Categories',
                    to: { name: 'account.product.categories.index' }
                },
                {
                    label: 'Category Details'
                }
            ]
        }
    },
    {
        path: '/account/product/categories/:id/edit',
        name: 'account.product.categories.edit',
        component: () => import('../views/account/product/category/EditView.vue'),
        meta: {
            requiresAuth: true,
            breadcrumbs: [
                {
                    label: 'Product Categories',
                    to: { name: 'account.product.categories.index' }
                },
                {
                    label: 'Edit Category'
                }
            ]
        }
    },
    {
        path: '/account/:pathMatch(.*)*',
        name: 'account.notFound',
        component: () => import('../views/account/NotFoundView.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('../views/NotFoundView.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.beforeEach(async (to, _from) => {
    if (to.meta.requiresAuth) {
        const authStore = useAuthStore()
        try {
            await authStore.fetchUser()
        } catch (error) {
            console.error('Failed to fetch user:', error)
        }
        
        if (!authStore.isAuthenticated) {
            return { name: 'login' }
        }
    }
})

export default router
