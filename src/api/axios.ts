import axios from 'axios'
import { registerAxiosProgress } from '@/utils/progress'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Catch ALL server errors here
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 401:
                    console.error("Unauthorized");
                    // Clear auth store and redirect to login
                    const authStore = useAuthStore()
                    authStore.user = null
                    authStore.isAuthenticated = false

                    if (router.currentRoute.value.name !== "login") {
                        router.push({ name: "login" });
                    }

                    break;

                case 403:
                    console.error("Forbidden");
                    break;

                case 404:
                    console.error("Not found");
                    break;

                case 500:
                    console.error("Server error");
                    break;
            }
        } else {
            console.error("Network error:", error.message);
        }

        return Promise.reject(error);
    }
);

registerAxiosProgress(api)

export default api
