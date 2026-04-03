<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Account Settings</h1>
                    <p class="text-gray-600 mt-1">Configure your account preferences and privacy settings</p>
                </div>
                <div class="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                    <span class="text-white text-xl font-bold">
                        {{ userInitials }}
                    </span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Settings -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Notification Settings -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900">Email Notifications</h3>
                                    <p class="text-sm text-gray-600">Receive email updates about your account</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        v-model="settings.emailNotifications"
                                        type="checkbox"
                                        class="sr-only peer"
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900">Marketing Emails</h3>
                                    <p class="text-sm text-gray-600">Receive promotional emails and newsletters</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        v-model="settings.marketingEmails"
                                        type="checkbox"
                                        class="sr-only peer"
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Appearance Settings -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
                        <div class="space-y-4">
                            <div>
                                <label for="theme" class="block text-sm font-medium text-gray-700 mb-2">
                                    Theme
                                </label>
                                <select
                                    id="theme"
                                    v-model="settings.theme"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="auto">Auto (System)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Security Settings -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Security</h2>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                                    <p class="text-sm text-gray-600">Add an extra layer of security to your account</p>
                                </div>
                                <button
                                    @click="toggle2FA"
                                    class="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                                    :class="settings.twoFactorEnabled ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'"
                                >
                                    {{ settings.twoFactorEnabled ? 'Disable' : 'Enable' }}
                                </button>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900">Login Alerts</h3>
                                    <p class="text-sm text-gray-600">Get notified of new login attempts</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        v-model="settings.loginAlerts"
                                        type="checkbox"
                                        class="sr-only peer"
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <div class="flex justify-end">
                    <button
                        @click="saveSettings"
                        :disabled="saving"
                        class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        <span v-if="saving">Saving...</span>
                        <span v-else>Save Settings</span>
                    </button>
                </div>
            </div>

            <!-- Sidebar -->
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
                            <span class="text-sm text-gray-600">Two-Factor Auth</span>
                            <span :class="settings.twoFactorEnabled ? 'text-green-600' : 'text-gray-600'" class="text-sm font-medium">
                                {{ settings.twoFactorEnabled ? 'Enabled' : 'Disabled' }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">Last Updated</span>
                            <span class="text-sm font-medium text-gray-900">{{ lastUpdated }}</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div class="space-y-2">
                        <RouterLink to="/account/dashboard"
                            class="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                            ← Back to Dashboard
                        </RouterLink>
                        <RouterLink to="/account/profile"
                            class="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                            Update Profile
                        </RouterLink>
                        <button @click="exportData"
                            class="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                            Export Data
                        </button>
                    </div>
                </div>

                <!-- Danger Zone -->
                <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
                    <div class="space-y-3">
                        <button @click="showResetModal = true"
                            class="block w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-100 rounded-md transition-colors">
                            Reset All Settings
                        </button>
                        <button @click="showDeleteModal = true"
                            class="block w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-100 rounded-md transition-colors">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-md p-4">
            <div class="flex">
                <div class="shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
                </div>
            </div>
        </div>

        <!-- Reset Settings Modal -->
        <div v-if="showResetModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="showResetModal = false">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Reset All Settings</h3>
                    <p class="text-sm text-gray-600 mb-4">
                        This will reset all your settings to default values. This action cannot be undone.
                    </p>
                    <div class="flex justify-end space-x-3">
                        <button @click="showResetModal = false"
                            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                            Cancel
                        </button>
                        <button @click="resetSettings"
                            class="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                            Reset Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Account Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="showDeleteModal = false">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-red-900 mb-4">Delete Account</h3>
                    <p class="text-sm text-red-600 mb-4">
                        Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                    </p>
                    <div class="flex justify-end space-x-3">
                        <button @click="showDeleteModal = false"
                            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                            Cancel
                        </button>
                        <button @click="deleteAccount"
                            class="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
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
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()

// Settings state
const settings = ref({
    emailNotifications: true,
    marketingEmails: false,
    pushNotifications: true,
    profileVisibility: true,
    activityStatus: true,
    dataCollection: true,
    theme: 'light',
    language: 'en',
    twoFactorEnabled: false,
    loginAlerts: true
})

// UI state
const saving = ref(false)
const successMessage = ref('')
const showResetModal = ref(false)
const showDeleteModal = ref(false)

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

const lastUpdated = computed(() => {
    return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
})

// Methods
const saveSettings = async () => {
    saving.value = true

    try {
        // TODO: Implement settings save API call
        // For now, just show success message
        successMessage.value = 'Settings saved successfully!'
        setTimeout(() => {
            successMessage.value = ''
        }, 3000)
    } catch (error) {
        console.error('Failed to save settings:', error)
    } finally {
        saving.value = false
    }
}

const toggle2FA = async () => {
    // TODO: Implement 2FA toggle
    settings.value.twoFactorEnabled = !settings.value.twoFactorEnabled
    successMessage.value = `Two-factor authentication ${settings.value.twoFactorEnabled ? 'enabled' : 'disabled'}!`
    setTimeout(() => {
        successMessage.value = ''
    }, 3000)
}

const resetSettings = async () => {
    settings.value = {
        emailNotifications: true,
        marketingEmails: false,
        pushNotifications: true,
        profileVisibility: true,
        activityStatus: true,
        dataCollection: true,
        theme: 'light',
        language: 'en',
        twoFactorEnabled: false,
        loginAlerts: true
    }
    showResetModal.value = false
    successMessage.value = 'Settings reset to defaults!'
    setTimeout(() => {
        successMessage.value = ''
    }, 3000)
}

const exportData = async () => {
    // TODO: Implement data export
    alert('Data export feature coming soon!')
}

const deleteAccount = async () => {
    // TODO: Implement account deletion
    alert('Account deletion not implemented yet')
    showDeleteModal.value = false
}

// Load settings on mount
onMounted(() => {
    // TODO: Load user settings from API
    // For now, using default values
})
</script>