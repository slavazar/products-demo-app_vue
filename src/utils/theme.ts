import { computed, readonly, ref } from 'vue'

export type ThemePreference = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'products-demo-theme'

const themePreference = ref<ThemePreference>('auto')
const resolvedTheme = ref<'light' | 'dark'>('light')

let mediaQuery: MediaQueryList | null = null
let initialized = false

function getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(preference: ThemePreference): void {
    const nextTheme = preference === 'auto' ? getSystemTheme() : preference
    const root = document.documentElement

    resolvedTheme.value = nextTheme
    root.classList.toggle('dark', nextTheme === 'dark')
    root.dataset.theme = nextTheme
}

function handleSystemThemeChange(): void {
    if (themePreference.value === 'auto') {
        applyTheme('auto')
    }
}

export function initializeTheme(): void {
    if (initialized || typeof window === 'undefined') {
        return
    }

    initialized = true

    const storedTheme = window.localStorage.getItem(STORAGE_KEY)

    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'auto') {
        themePreference.value = storedTheme
    }

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    applyTheme(themePreference.value)
}

export function setTheme(preference: ThemePreference): void {
    themePreference.value = preference
    window.localStorage.setItem(STORAGE_KEY, preference)
    applyTheme(preference)
}

export function useTheme() {
    return {
        themePreference: readonly(themePreference),
        resolvedTheme: readonly(resolvedTheme),
        isDarkTheme: computed(() => resolvedTheme.value === 'dark'),
        setTheme,
    }
}
