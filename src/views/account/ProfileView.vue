<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Profile Settings</h1>
                    <p class="text-gray-600 mt-1">Manage your account information and preferences</p>
                </div>
                <div class="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                    <span class="text-white text-xl font-bold">
                        {{ userInitials }}
                    </span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Profile Information Form -->
            <div class="lg:col-span-2">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>

                        <form @submit.prevent="updateProfile" class="space-y-4">
                            <!-- Name Field -->
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    v-model="profileForm.name"
                                    type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    :class="{ 'border-red-500': errors.name }"
                                    placeholder="Enter your full name"
                                />
                                <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                                    {{ errors.name }}
                                </p>
                            </div>

                            <!-- Email Field -->
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    v-model="profileForm.email"
                                    type="email"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    :class="{ 'border-red-500': errors.email }"
                                    placeholder="Enter your email address"
                                />
                                <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                                    {{ errors.email }}
                                </p>
                                <p class="mt-1 text-sm text-gray-500">
                                    Email verification status:
                                    <span :class="authStore.user?.email_verified_at ? 'text-green-600' : 'text-yellow-600'">
                                        {{ authStore.user?.email_verified_at ? 'Verified' : 'Unverified' }}
                                    </span>
                                </p>
                            </div>

                            <!-- Submit Button -->
                            <div class="flex justify-end">
                                <button
                                    type="submit"
                                    :disabled="loading"
                                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <span v-if="loading">Updating...</span>
                                    <span v-else>Update Profile</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Change Password Section -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
                    <div class="p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>

                        <form @submit.prevent="changePassword" class="space-y-4">
                            <!-- Current Password -->
                            <div>
                                <label for="current_password" class="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password
                                </label>
                                <input
                                    id="current_password"
                                    v-model="passwordForm.current_password"
                                    type="password"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    :class="{ 'border-red-500': passwordErrors.current_password }"
                                    placeholder="Enter your current password"
                                />
                                <p v-if="passwordErrors.current_password" class="mt-1 text-sm text-red-600">
                                    {{ passwordErrors.current_password }}
                                </p>
                            </div>

                            <!-- New Password -->
                            <div>
                                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    v-model="passwordForm.password"
                                    type="password"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    :class="{ 'border-red-500': passwordErrors.password }"
                                    placeholder="Enter your new password"
                                />
                                <p v-if="passwordErrors.password" class="mt-1 text-sm text-red-600">
                                    {{ passwordErrors.password }}
                                </p>
                            </div>

                            <!-- Confirm New Password -->
                            <div>
                                <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    v-model="passwordForm.password_confirmation"
                                    type="password"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    :class="{ 'border-red-500': passwordErrors.password_confirmation }"
                                    placeholder="Confirm your new password"
                                />
                                <p v-if="passwordErrors.password_confirmation" class="mt-1 text-sm text-red-600">
                                    {{ passwordErrors.password_confirmation }}
                                </p>
                            </div>

                            <!-- Submit Button -->
                            <div class="flex justify-end">
                                <button
                                    type="submit"
                                    :disabled="passwordLoading"
                                    class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <span v-if="passwordLoading">Changing...</span>
                                    <span v-else>Change Password</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Profile Summary Sidebar -->
            <div class="space-y-6">
                <!-- Account Summary -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">Account Status</span>
                            <span class="text-sm font-medium text-green-600">Active</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">Member Since</span>
                            <span class="text-sm font-medium text-gray-900">{{ memberSince }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">Email Verified</span>
                            <span :class="authStore.user?.email_verified_at ? 'text-green-600' : 'text-yellow-600'" class="text-sm font-medium">
                                {{ authStore.user?.email_verified_at ? 'Yes' : 'No' }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div class="space-y-2">
                        <RouterLink to="/account/dashboard"
                            class="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
                            ← Back to Dashboard
                        </RouterLink>
                        <button @click="showDeleteModal = true"
                            class="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success/Error Messages -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-md p-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
                </div>
            </div>
        </div>

        <!-- Delete Account Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="showDeleteModal = false">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Delete Account</h3>
                    <p class="text-sm text-gray-600 mb-4">
                        Are you sure you want to delete your account? This action cannot be undone.
                    </p>
                    <div class="flex justify-end space-x-3">
                        <button @click="showDeleteModal = false"
                            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
                            Cancel
                        </button>
                        <button @click="deleteAccount"
                            class="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-200">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Form data
const profileForm = ref({
    name: '',
    email: ''
})

const passwordForm = ref({
    current_password: '',
    password: '',
    password_confirmation: ''
})

// State
const loading = ref(false)
const passwordLoading = ref(false)
const successMessage = ref('')
const showDeleteModal = ref(false)

// Errors
const errors = ref<Record<string, string>>({})
const passwordErrors = ref<Record<string, string>>({})

// Computed
const userInitials = computed(() => {
    if (!authStore.user?.name) return 'U'
    return authStore.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
})

const memberSince = computed(() => {
    if (!authStore.user?.created_at) return 'Recently'
    const date = new Date(authStore.user.created_at)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
})

// Methods
const updateProfile = async () => {
    loading.value = true
    errors.value = {}

    try {
        // TODO: Implement profile update API call
        // For now, just show success message
        successMessage.value = 'Profile updated successfully!'
        setTimeout(() => {
            successMessage.value = ''
        }, 3000)
    } catch (error: any) {
        if (error.response?.data?.errors) {
            errors.value = error.response.data.errors
        } else {
            errors.value = { general: 'Failed to update profile' }
        }
    } finally {
        loading.value = false
    }
}

const changePassword = async () => {
    passwordLoading.value = true
    passwordErrors.value = {}

    // Basic validation
    if (passwordForm.value.password !== passwordForm.value.password_confirmation) {
        passwordErrors.value.password_confirmation = 'Passwords do not match'
        passwordLoading.value = false
        return
    }

    try {
        // TODO: Implement password change API call
        // For now, just show success message
        successMessage.value = 'Password changed successfully!'
        passwordForm.value = {
            current_password: '',
            password: '',
            password_confirmation: ''
        }
        setTimeout(() => {
            successMessage.value = ''
        }, 3000)
    } catch (error: any) {
        if (error.response?.data?.errors) {
            passwordErrors.value = error.response.data.errors
        } else {
            passwordErrors.value = { general: 'Failed to change password' }
        }
    } finally {
        passwordLoading.value = false
    }
}

const deleteAccount = async () => {
    // TODO: Implement account deletion
    alert('Account deletion not implemented yet')
    showDeleteModal.value = false
}

// Initialize form data
onMounted(() => {
    if (authStore.user) {
        profileForm.value = {
            name: authStore.user.name,
            email: authStore.user.email
        }
    }
})
</script>