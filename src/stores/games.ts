import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService, type Game } from '@/services/api'
import { CATEGORY_CONFIG } from '@/constants'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Game[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedCategory = ref<string>('all')

  const isOtherCategory = (category: string): boolean => {
    return CATEGORY_CONFIG.OTHER_CATEGORIES.includes(category.toLowerCase() as any)
  }

  const getDisplayCategoryName = (category: string): string => {
    return isOtherCategory(category) ? CATEGORY_CONFIG.OTHER_CATEGORY_NAME : category
  }

  const gameBelongsToCategory = (game: Game, category: string): boolean => {
    if (category === CATEGORY_CONFIG.OTHER_CATEGORY_NAME) {
      return game.categories.some(cat => isOtherCategory(cat))
    }
    return game.categories.includes(category)
  }

  const filteredGames = computed(() => {
    if (selectedCategory.value === 'all') {
      return games.value
    }
    return games.value.filter((game) => gameBelongsToCategory(game, selectedCategory.value))
  })

  const categories = computed(() => {
    const allCategories = new Set<string>()
    
    games.value.forEach((game) => {
      game.categories.forEach((category) => {
        const displayCategory = getDisplayCategoryName(category)
        allCategories.add(displayCategory)
      })
    })
    
    const categoryArray = Array.from(allCategories)
    return categoryArray.sort((a, b) => {
      if (a === CATEGORY_CONFIG.OTHER_CATEGORY_NAME) return 1
      if (b === CATEGORY_CONFIG.OTHER_CATEGORY_NAME) return -1
      return a.localeCompare(b)
    })
  })

  const gamesCount = computed(() => filteredGames.value.length)

  const fetchGames = async () => {
    loading.value = true
    error.value = null

    try {
      const gamesData = await apiService.fetchGames()
      games.value = gamesData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch games'
    } finally {
      loading.value = false
    }
  }

  const setSelectedCategory = (category: string) => {
    selectedCategory.value = category
  }

  const clearError = () => {
    error.value = null
  }

  return {
    games,
    loading,
    error,
    selectedCategory,
    filteredGames,
    categories,
    gamesCount,
    fetchGames,
    setSelectedCategory,
    clearError,
  }
}) 