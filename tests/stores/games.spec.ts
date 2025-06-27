import { setActivePinia, createPinia } from 'pinia'
import { useGamesStore } from '@/stores/games'
import type { Game, Jackpot } from '@/types/index'

// Mock the API service
jest.mock('@/services/api', () => ({
  apiService: {
    fetchGames: jest.fn()
  }
}))

describe('Games Store', () => {
  let store: any

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGamesStore()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('starts with empty state', () => {
    expect(store.games).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('loads games successfully', async () => {
    const mockGames: Game[] = [
      {
        id: 'game-1',
        name: 'Test Game 1',
        image: 'https://example.com/game1.jpg',
        categories: ['slot', 'new']
      },
      {
        id: 'game-2',
        name: 'Test Game 2',
        image: 'https://example.com/game2.jpg',
        categories: ['ball', 'top']
      }
    ]

    const { apiService } = require('@/services/api')
    apiService.fetchGames.mockResolvedValue(mockGames)

    await store.fetchGames()

    expect(store.games).toEqual(mockGames)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('handles fetch errors', async () => {
    const errorMessage = 'Failed to fetch games'
    const { apiService } = require('@/services/api')
    apiService.fetchGames.mockRejectedValue(new Error(errorMessage))

    await store.fetchGames()

    expect(store.games).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe(errorMessage)
  })

  it('groups special categories into other', () => {
    const mockGames: Game[] = [
      {
        id: 'game-1',
        name: 'Slot Game',
        image: 'https://example.com/game1.jpg',
        categories: ['slot']
      },
      {
        id: 'game-2',
        name: 'Ball Game',
        image: 'https://example.com/game2.jpg',
        categories: ['ball']
      },
      {
        id: 'game-3',
        name: 'Virtual Game',
        image: 'https://example.com/game3.jpg',
        categories: ['virtual']
      },
      {
        id: 'game-4',
        name: 'Fun Game',
        image: 'https://example.com/game4.jpg',
        categories: ['fun']
      }
    ]

    store.games = mockGames

    const categories = store.categories
    expect(categories).toContain('slot')
    expect(categories).toContain('other')
    expect(categories).not.toContain('ball')
    expect(categories).not.toContain('virtual')
    expect(categories).not.toContain('fun')
  })

  it('filters games by category', () => {
    const mockGames: Game[] = [
      {
        id: 'game-1',
        name: 'Slot Game',
        image: 'https://example.com/game1.jpg',
        categories: ['slot']
      },
      {
        id: 'game-2',
        name: 'Ball Game',
        image: 'https://example.com/game2.jpg',
        categories: ['ball']
      },
      {
        id: 'game-3',
        name: 'New Game',
        image: 'https://example.com/game3.jpg',
        categories: ['new']
      }
    ]

    store.games = mockGames

    expect(store.games).toHaveLength(3)

    const slotGames = store.games.filter((g: Game) => g.categories.includes('slot'))
    expect(slotGames).toHaveLength(1)
    expect(slotGames[0].name).toBe('Slot Game')

    const OTHER_CATEGORIES = ['ball', 'virtual', 'fun']
    const otherGames = store.games.filter((g: Game) => g.categories.some((cat) => OTHER_CATEGORIES.includes(cat)))
    expect(otherGames).toHaveLength(1)
    expect(otherGames[0].name).toBe('Ball Game')

    const newGames = store.games.filter((g: Game) => g.categories.includes('new'))
    expect(newGames).toHaveLength(1)
    expect(newGames[0].name).toBe('New Game')
  })

  it('returns empty for non-existent category', () => {
    store.games = [
      {
        id: 'game-1',
        name: 'Slot Game',
        image: 'https://example.com/game1.jpg',
        categories: ['slot']
      }
    ]

    const nonExistentGames = store.games.filter((g: Game) => g.categories.includes('non-existent'))
    expect(nonExistentGames).toEqual([])
  })

  it('handles multi-category games', () => {
    const mockGames: Game[] = [
      {
        id: 'game-1',
        name: 'Multi Category Game',
        image: 'https://example.com/game1.jpg',
        categories: ['slot', 'new', 'top']
      }
    ]

    store.games = mockGames

    const slotGames = store.games.filter((g: Game) => g.categories.includes('slot'))
    expect(slotGames).toHaveLength(1)

    const newGames = store.games.filter((g: Game) => g.categories.includes('new'))
    expect(newGames).toHaveLength(1)

    const topGames = store.games.filter((g: Game) => g.categories.includes('top'))
    expect(topGames).toHaveLength(1)
  })
}) 