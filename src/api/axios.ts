import axios from 'axios'
import { registerAxiosProgress } from '@/utils/progress'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})

registerAxiosProgress(api)

export default api
