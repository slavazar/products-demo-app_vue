<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-slate-100">Account Settings</h1>
                    <p class="mt-1 text-gray-600 dark:text-slate-400">Configure your account preferences and privacy settings</p>
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
                <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div class="p-6">
                        <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">Notifications</h2>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-slate-100">Email Notifications</h3>
                                    <p class="text-sm text-gray-600 dark:text-slate-400">Receive email updates about your account</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        v-model="settings.emailNotifications"
                                        type="checkbox"
                                        class="sr-only peer"
                                    />
                                    <div class="h-6 w-11 rounded-full bg-gray-200 peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700 dark:peer-focus:ring-blue-900 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] dark:after:bg-slate-200"></div>
                                </label>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-slate-100">Marketing Emails</h3>
                                    <p class="text-sm text-gray-600 dark:text-slate-400">Receive promotional emails and newsletters</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        v-model="settings.marketingEmails"
                                        type="checkbox"
                                        class="sr-only peer"
                                    />
                                    <div class="h-6 w-11 rounded-full bg-gray-200 peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700 dark:peer-focus:ring-blue-900 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] dark:after:bg-slate-200"></div>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Appearance Settings -->
                <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div class="p-6">
                        <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">Appearance</h2>
                        <div class="space-y-4">
                            <div>
                                <label for="theme" class="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                                    Theme
                                </label>
                                <select
                                    id="theme"
                                    v-model="settings.theme"
                                    class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
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
                <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div class="p-6">
                        <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">Security</h2>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-slate-100">Two-Factor Authentication</h3>
                                    <p class="text-sm text-gray-600 dark:text-slate-400">Add an extra layer of security to your account</p>
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
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-slate-100">Login Alerts</h3>
                                    <p class="text-sm text-gray-600 dark:text-slate-400">Get notified of new login attempts</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        v-model="settings.loginAlerts"
                                        type="checkbox"
                                        class="sr-only peer"
                                    />
                                    <div class="h-6 w-11 rounded-full bg-gray-200 peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700 dark:peer-focus:ring-blue-900 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] dark:after:bg-slate-200"></div>
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
                        class="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-slate-950"
                    >
                        <span v-if="saving">Saving...</span>
                        <span v-else>Save Settings</span>
                    </button>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
                <!-- Account Summary -->
                <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">Account Summary</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600 dark:text-slate-400">Account Status</span>
                            <span class="text-sm font-medium text-green-600">Active</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600 dark:text-slate-400">Two-Factor Auth</span>
                            <span :class="settings.twoFactorEnabled ? 'text-green-600' : 'text-gray-600 dark:text-slate-400'" class="text-sm font-medium">
                                {{ settings.twoFactorEnabled ? 'Enabled' : 'Disabled' }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600 dark:text-slate-400">Last Updated</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-slate-100">{{ lastUpdated }}</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">Quick Actions</h3>
                    <div class="space-y-2">
                        <RouterLink to="/account/dashboard"
                            class="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800">
                            ← Back to Dashboard
                        </RouterLink>
                        <RouterLink to="/account/profile"
                            class="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800">
                            Update Profile
                        </RouterLink>
                        <button @click="exportData"
                            class="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800">
                            Export Data
                        </button>
                    </div>
                </div>

                <!-- Danger Zone -->
                <div class="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900/60 dark:bg-red-950/30">
                    <h3 class="mb-4 text-lg font-semibold text-red-900 dark:text-red-200">Danger Zone</h3>
                    <div class="space-y-3">
                        <button @click="showResetModal = true"
                            class="block w-full rounded-md px-3 py-2 text-left text-sm text-red-700 transition-colors hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900/40">
                            Reset All Settings
                        </button>
                        <button @click="showDeleteModal = true"
                            class="block w-full rounded-md px-3 py-2 text-left text-sm text-red-700 transition-colors hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900/40">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-900/60 dark:bg-green-950/30">
            <div class="flex">
                <div class="shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-green-800 dark:text-green-200">{{ successMessage }}</p>
                </div>
            </div>
        </div>

        <!-- Reset Settings Modal -->
        <div v-if="showResetModal" class="fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-600/50 dark:bg-slate-950/70" @click="showResetModal = false">
            <div class="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-900" @click.stop>
                <div class="mt-3">
                    <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-slate-100">Reset All Settings</h3>
                    <p class="mb-4 text-sm text-gray-600 dark:text-slate-400">
                        This will reset all your settings to default values. This action cannot be undone.
                    </p>
                    <div class="flex justify-end space-x-3">
                        <button @click="showResetModal = false"
                            class="px-4 py-2 text-sm text-gray-600 transition-colors hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200">
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
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-600/50 dark:bg-slate-950/70" @click="showDeleteModal = false">
            <div class="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-900" @click.stop>
                <div class="mt-3">
                    <h3 class="mb-4 text-lg font-medium text-red-900 dark:text-red-200">Delete Account</h3>
                    <p class="mb-4 text-sm text-red-600 dark:text-red-300">
                        Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                    </p>
                    <div class="flex justify-end space-x-3">
                        <button @click="showDeleteModal = false"
                            class="px-4 py-2 text-sm text-gray-600 transition-colors hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200">
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
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'
import { setTheme, useTheme } from '@/utils/theme'

const authStore = useAuthStore()
const { themePreference } = useTheme()

// Settings state
const settings = ref({
    emailNotifications: true,
    marketingEmails: false,
    pushNotifications: true,
    profileVisibility: true,
    activityStatus: true,
    dataCollection: true,
    theme: themePreference.value,
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
        theme: themePreference.value,
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
    settings.value.theme = themePreference.value
})

watch(
    () => settings.value.theme,
    (theme) => {
        setTheme(theme)
    },
)
</script>
