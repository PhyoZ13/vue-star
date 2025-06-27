import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService, type Jackpot } from '@/services/api'
import { REAL_TIME_CONFIG } from '@/constants'

export const useJackpotsStore = defineStore('jackpots', () => {
  const jackpots = ref<Jackpot[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const updateInterval = ref<number | null>(null)

  const jackpotsMap = computed(() => {
    const map = new Map<string, number>()
    jackpots.value.forEach(jackpot => {
      map.set(jackpot.game, jackpot.amount)
    })
    return map
  })

  const totalJackpotAmount = computed(() => {
    return jackpots.value.reduce((total, jackpot) => total + jackpot.amount, 0)
  })

  const jackpotsCount = computed(() => {
    return jackpots.value.length
  })

  const getJackpotForGame = (gameId: string): number | null => {
    return jackpotsMap.value.get(gameId) || null
  }

  const fetchJackpots = async () => {
    loading.value = true
    error.value = null

    try {
      const jackpotsData = await apiService.fetchJackpots()
      jackpots.value = jackpotsData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch jackpots'
    } finally {
      loading.value = false
    }
  }

  const startRealTimeUpdates = () => {
    if (updateInterval.value) {
      clearInterval(updateInterval.value)
    }

    updateInterval.value = window.setInterval(() => {
      fetchJackpots()
    }, REAL_TIME_CONFIG.JACKPOT_UPDATE_INTERVAL)
  }

  const stopRealTimeUpdates = () => {
    if (updateInterval.value) {
      clearInterval(updateInterval.value)
      updateInterval.value = null
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    jackpots,
    loading,
    error,
    jackpotsMap,
    totalJackpotAmount,
    jackpotsCount,
    getJackpotForGame,
    fetchJackpots,
    startRealTimeUpdates,
    stopRealTimeUpdates,
    clearError,
  }
}) 