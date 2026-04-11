import type { AxiosInstance } from 'axios'
import type { Router } from 'vue-router'
import { readonly, ref } from 'vue'

// ============================================================================
// Constants
// ============================================================================

const TRICKLE_INTERVAL = 180
const TRICKLE_MAX_PROGRESS = 90
const INITIAL_PROGRESS = 8
const AUTO_COMPLETE_TIMEOUT = 5000
const HIDE_DELAY = 420

// ============================================================================
// State
// ============================================================================

const progress = ref(0)
const isVisible = ref(false)

let activeCount = 0
let nextToken = 0
let trickleTimer: ReturnType<typeof setInterval> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
let timeoutTimer: ReturnType<typeof setTimeout> | null = null

const activeTokens = new Set<number>()

// ============================================================================
// Timer Management
// ============================================================================

function clearTimer(timer: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout> | null, clearFn: (id: any) => void): void {
    if (!timer) return
    clearFn(timer)
}

function clearTrickleTimer(): void {
    if (trickleTimer !== null) {
        clearInterval(trickleTimer)
        trickleTimer = null
    }
}

function clearHideTimer(): void {
    if (hideTimer !== null) {
        clearTimeout(hideTimer)
        hideTimer = null
    }
}

function clearTimeoutTimer(): void {
    if (timeoutTimer !== null) {
        clearTimeout(timeoutTimer)
        timeoutTimer = null
    }
}

function clearAllTimers(): void {
    clearTrickleTimer()
    clearHideTimer()
    clearTimeoutTimer()
}

// ============================================================================
// Progress Animation
// ============================================================================

function startTrickling(): void {
    clearTrickleTimer()

    trickleTimer = setInterval(() => {
        // Stop trickling if progress bar is hidden or reached max
        if (!isVisible.value || progress.value >= TRICKLE_MAX_PROGRESS) {
            return
        }

        // Increment progress with diminishing speed
        const increment = Math.max(2, (92 - progress.value) / 6)
        progress.value = Math.min(progress.value + increment, TRICKLE_MAX_PROGRESS)
    }, TRICKLE_INTERVAL)
}

function begin(): void {
    activeCount++

    // Only initialize on first call
    if (activeCount > 1) {
        return
    }

    clearHideTimer()
    clearTimeoutTimer()

    isVisible.value = true
    progress.value = INITIAL_PROGRESS

    startTrickling()

    // Safety net: complete progress if not finished within timeout
    timeoutTimer = setTimeout(() => {
        activeCount = 0
        complete()
    }, AUTO_COMPLETE_TIMEOUT)
}

function complete(): void {
    activeCount = Math.max(0, activeCount - 1)

    // Wait for all operations to complete
    if (activeCount > 0) {
        return
    }

    clearTrickleTimer()
    clearTimeoutTimer()

    progress.value = 100

    clearHideTimer()
    hideTimer = setTimeout(() => {
        isVisible.value = false
        progress.value = 0
    }, HIDE_DELAY)
}

// ============================================================================
// Public API
// ============================================================================

export function startProgress(): number {
    const token = ++nextToken
    activeTokens.add(token)
    begin()
    return token
}

export function finishProgress(token: number): void {
    if (!activeTokens.has(token)) {
        return
    }

    activeTokens.delete(token)
    complete()
}

export function useProgressState() {
    return {
        progress: readonly(progress),
        isVisible: readonly(isVisible),
    }
}

// ============================================================================
// Integration
// ============================================================================

export function registerRouterProgress(router: Router): void {
    let navigationToken: number | null = null

    router.beforeEach(() => {
        navigationToken = startProgress()
    })

    router.afterEach(() => {
        if (navigationToken !== null) {
            finishProgress(navigationToken)
            navigationToken = null
        }
    })

    router.onError(() => {
        if (navigationToken !== null) {
            finishProgress(navigationToken)
            navigationToken = null
        }
    })
}

export function registerAxiosProgress(api: AxiosInstance): void {
    api.interceptors.request.use((config) => {
        const token = startProgress();
        (config as typeof config & { progressToken?: number }).progressToken = token
        return config
    })

    api.interceptors.response.use(
        (response) => {
            const token = (response.config as typeof response.config & { progressToken?: number }).progressToken ?? -1
            finishProgress(token)
            return response
        },
        (error) => {
            const token = (error.config as typeof error.config & { progressToken?: number }).progressToken ?? -1
            finishProgress(token)
            return Promise.reject(error)
        },
    )
}
