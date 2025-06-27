<template>
  <div class="games-page">
    <CategoryFilter
      :categories="categoryList"
      :selected-category="selectedCategory"
      @category-change="handleCategoryChange"
    />
    <div class="container">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading games...</p>
      </div>
      <div v-else-if="error" class="error-container">
        <div class="error-icon">⚠️</div>
        <h2 class="error-title">Oops! Something went wrong</h2>
        <p class="error-message">{{ error }}</p>
        <button @click="retryLoading" class="retry-button">
          Try Again
        </button>
      </div>
      <div v-else class="games-grid">
        <GameCard
          v-for="game in filteredGames"
          :key="game.id"
          :game="game"
          :jackpot-amount="getJackpotForGame(game.id)"
          :current-category="selectedCategory"
        />
      </div>
      <div v-if="!loading && !error && filteredGames.length === 0" class="no-games">
        <div class="no-games-icon">🎮</div>
        <h2 class="no-games-title">No games found</h2>
        <p class="no-games-message">
          No games available for the selected category. Try selecting a different category.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGamesStore } from '@/stores/games'
import { useJackpotsStore } from '@/stores/jackpots'
import { CATEGORY_CONFIG } from '@/constants'
import GameCard from '@/components/GameCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'

const categoryList = CATEGORY_CONFIG.DISPLAY_ORDER.map(value => {
  const baseLabel = value.charAt(0).toUpperCase() + value.slice(1)
  
  if (value === 'jackpots') {
    return { value, label: 'Jackpots' }
  }
  
  if (value === 'new' || value === 'top') {
    return { value, label: `${baseLabel} Games` }
  }
  
  return { value, label: baseLabel }
})

const gamesStore = useGamesStore()
const jackpotsStore = useJackpotsStore()
const selectedCategory = ref('top')
const loading = ref(false)
const error = ref<string | null>(null)

const filteredGames = computed(() => {
  if (selectedCategory.value === 'all') {
    return gamesStore.games
  }
  
  if (selectedCategory.value === 'jackpots') {
    const jackpotGameIds = jackpotsStore.jackpots.map(j => j.game)
    return gamesStore.games.filter((game: any) => jackpotGameIds.includes(game.id))
  }
  
  const OTHER_CATEGORIES = CATEGORY_CONFIG.OTHER_CATEGORIES
  const isOtherCategory = (category: string) => OTHER_CATEGORIES.includes(category.toLowerCase() as any)
  const gameBelongsToCategory = (game: any, category: string) => {
    if (category === 'other') {
      return game.categories.some((cat: string) => isOtherCategory(cat))
    }
    return game.categories.includes(category)
  }
  
  return gamesStore.games.filter((game: any) => gameBelongsToCategory(game, selectedCategory.value))
})

const handleCategoryChange = (category: string) => {
  selectedCategory.value = category
}

const getJackpotForGame = (gameId: string) => {
  return jackpotsStore.getJackpotForGame(gameId)
}

const loadData = async () => {
  loading.value = true
  error.value = null
  
  try {
    await Promise.all([
      gamesStore.fetchGames(),
      jackpotsStore.fetchJackpots()
    ])
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load games'
  } finally {
    loading.value = false
  }
}

const retryLoading = () => {
  loadData()
}

const startRealTimeUpdates = () => {
  jackpotsStore.startRealTimeUpdates()
}

const stopRealTimeUpdates = () => {
  jackpotsStore.stopRealTimeUpdates()
}

onMounted(() => {
  loadData()
  startRealTimeUpdates()
})

onUnmounted(() => {
  stopRealTimeUpdates()
})
</script>

<style scoped>
.games-page {
  min-height: 100vh;
  background: #FCFCFC;
  padding: 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #FCFCFC;
  border-top: 4px solid #8DC63F;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.1rem;
  color: #373737;
  font-weight: 500;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 1.5rem;
  color: #373737;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 2rem;
  max-width: 500px;
}

.retry-button {
  background: #8DC63F;
  color: #FFFFFF;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: #7AB32E;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(141, 198, 63, 0.3);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(230px, 1fr));
  gap: 4px 1px;
  margin-top: 24px;
  margin-bottom: 1.5rem;
  justify-items: center;
}

.games-grid .game-card {
  width: 100%;
  max-width: 260px;
  min-width: 210px;
  height: 213px;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.games-grid .game-image-container {
  aspect-ratio: 3/2;
  height: 133px;
  min-height: 0;
}

@media (max-width: 1400px) {
  .games-grid {
    grid-template-columns: repeat(4, minmax(220px, 1fr));
  }
}

@media (max-width: 1100px) {
  .games-grid {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
}

@media (max-width: 800px) {
  .games-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2px 1px;
  }
  .games-grid .game-card {
    max-width: 100%;
    min-width: 0;
    height: auto;
  }
  .games-grid .game-image-container {
    aspect-ratio: 16/9;
    height: auto;
    min-height: 0;
  }
}

@media (max-width: 500px) {
  .games-grid {
    grid-template-columns: 1fr;
    gap: 1px 0;
  }
  .games-grid .game-card {
    max-width: 100%;
    min-width: 0;
    height: auto;
  }
  .games-grid .game-image-container {
    aspect-ratio: 16/9;
    height: auto;
    min-height: 0;
  }
}

.no-games {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
}

.no-games-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-games-title {
  font-size: 1.5rem;
  color: #373737;
  margin-bottom: 1rem;
}

.no-games-message {
  font-size: 1rem;
  color: #6c757d;
  max-width: 500px;
}

@media (max-width: 768px) {
  .games-page {
    padding: 1.5rem 0;
  }
  .container {
    padding: 0 15px;
  }
  .loading-container,
  .error-container,
  .no-games {
    padding: 3rem 0;
  }
}

@media (max-width: 480px) {
  .games-page {
    padding: 1rem 0;
  }
  .container {
    padding: 0 10px;
  }
  .loading-container,
  .error-container,
  .no-games {
    padding: 2rem 0;
  }
  .error-icon {
    font-size: 2.5rem;
  }
  .no-games-icon {
    font-size: 3rem;
  }
}
</style> 