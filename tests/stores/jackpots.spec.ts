import { setActivePinia, createPinia } from 'pinia'
import { useJackpotsStore } from '@/stores/jackpots'
import type { Jackpot } from '@/types/index'

jest.useFakeTimers()

// Mock the API service
jest.mock('@/services/api', () => ({
  apiService: {
    fetchJackpots: jest.fn()
  }
}))

describe('Jackpots Store', () => {
  let store: ReturnType<typeof useJackpotsStore>
  const { apiService } = require('@/services/api')

  beforeAll(() => {
    jest.spyOn(global, 'setInterval')
    jest.spyOn(global, 'clearInterval')
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useJackpotsStore()
    jest.clearAllMocks()
  })

  it('starts with empty jackpots', () => {
    expect(store.jackpots).toEqual([])
    expect(store.jackpotsMap).toBeDefined()
    expect(store.getJackpotForGame('any')).toBeNull()
  })

  it('loads jackpots successfully', async () => {
    const mockJackpots: Jackpot[] = [
      { game: 'game-1', amount: 1000 },
      { game: 'game-2', amount: 5000 }
    ]
    apiService.fetchJackpots.mockResolvedValue(mockJackpots)
    await store.fetchJackpots()
    expect(store.jackpots).toEqual(mockJackpots)
    expect(store.jackpotsMap.get('game-1')).toBe(1000)
    expect(store.jackpotsMap.get('game-2')).toBe(5000)
    expect(store.getJackpotForGame('game-1')).toBe(1000)
    expect(store.getJackpotForGame('not-exist')).toBeNull()
  })

  it('handles fetch errors', async () => {
    apiService.fetchJackpots.mockRejectedValue(new Error('API error'))
    await store.fetchJackpots()
    expect(store.jackpots).toEqual([])
    expect(store.error).toBe('API error')
  })

  it('calculates total jackpot amount', async () => {
    store.jackpots = [
      { game: 'game-1', amount: 100 },
      { game: 'game-2', amount: 200 }
    ]
    expect(store.totalJackpotAmount).toBe(300)
  })

  it('counts jackpots correctly', async () => {
    store.jackpots = [
      { game: 'game-1', amount: 100 },
      { game: 'game-2', amount: 200 }
    ]
    expect(store.jackpotsCount).toBe(2)
  })

  it('manages real-time updates', async () => {
    apiService.fetchJackpots.mockResolvedValue([])
    store.startRealTimeUpdates()
    expect(setInterval).toHaveBeenCalled()
    jest.advanceTimersByTime(2000)
    store.stopRealTimeUpdates()
    expect(clearInterval).toHaveBeenCalled()
  })
}) 