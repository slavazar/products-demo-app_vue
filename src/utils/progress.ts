import type { AxiosInstance } from 'axios'
import type { Router } from 'vue-router'
import { readonly, ref } from 'vue'

const progress = ref(0)
const isVisible = ref(false)

let activeCount = 0
let nextToken = 0
let trickleTimer: ReturnType<typeof setInterval> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const activeTokens = new Set<number>()

function clearTrickleTimer() {
    if (!trickleTimer) return
    clearInterval(trickleTimer)
    trickleTimer = null
}

function clearHideTimer() {
    if (!hideTimer) return
    clearTimeout(hideTimer)
    hideTimer = null
}

function startTrickling() {
    clearTrickleTimer()

    trickleTimer = setInterval(() => {
        if (!isVisible.value || progress.value >= 90) {
            return
        }

        progress.value = Math.min(progress.value + Math.max(2, (92 - progress.value) / 6), 90)
    }, 180)
}

function begin() {
    activeCount += 1

    if (activeCount > 1) {
        return
    }

    clearHideTimer()
    isVisible.value = true
    progress.value = 8
    startTrickling()
}

function complete() {
    activeCount = Math.max(0, activeCount - 1)

    if (activeCount > 0) {
        return
    }

    clearTrickleTimer()
    progress.value = 100

    clearHideTimer()
    hideTimer = setTimeout(() => {
        isVisible.value = false
        progress.value = 0
    }, 220)
}

export function startProgress() {
    const token = ++nextToken
    activeTokens.add(token)
    begin()
    return token
}

export function finishProgress(token: number) {
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

export function registerRouterProgress(router: Router) {
    let navigationToken: number | null = null

    router.beforeEach((_to, _from, next) => {
        navigationToken = startProgress()
        next()
    })

    router.afterEach(() => {
        if (navigationToken === null) {
            return
        }

        finishProgress(navigationToken)
        navigationToken = null
    })

    router.onError(() => {
        if (navigationToken === null) {
            return
        }

        finishProgress(navigationToken)
        navigationToken = null
    })
}

export function registerAxiosProgress(api: AxiosInstance) {
    api.interceptors.request.use((config) => {
        ;(config as typeof config & { progressToken?: number }).progressToken = startProgress()
        return config
    })

    api.interceptors.response.use(
        (response) => {
            finishProgress((response.config as typeof response.config & { progressToken?: number }).progressToken ?? -1)
            return response
        },
        (error) => {
            finishProgress((error.config as typeof error.config & { progressToken?: number }).progressToken ?? -1)
            return Promise.reject(error)
        },
    )
}
