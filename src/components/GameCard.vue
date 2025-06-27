<template>
  <div class="game-card" :class="{ 'has-jackpot': jackpotAmount }">
    <div class="game-image-container">
      <div v-if="jackpotAmount" class="jackpot-overlay">
        €{{ formatJackpot(jackpotAmount) }}
      </div>
      <img :src="game.image" :alt="game.name" class="game-image" />
      <div v-if="showNewRibbon" class="ribbon ribbon-new">NEW</div>
      <div v-if="showTopRibbon" class="ribbon ribbon-top">TOP</div>
      <div class="hover-overlay">
        <div class="play-button">
          <span class="play-icon">▶</span>
        </div>
        <div class="game-name">{{ game.name }}</div>
      </div>
    </div>
    <div class="game-info">
      <h3 class="game-title">{{ game.name }}</h3>
      <p class="game-category">{{ formatCategories(game.categories) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Game } from '@/types'
import { formatJackpot, capitalize } from '@/utils'

interface Props {
  game: Game
  jackpotAmount?: number | null
  currentCategory?: string
}

const props = defineProps<Props>()

const showNewRibbon = computed(() => {
  return props.currentCategory === 'new' || props.game.categories.includes('new')
})

const showTopRibbon = computed(() => {
  return props.currentCategory === 'top' || props.game.categories.includes('top')
})

const formatCategories = (categories: string[]): string => {
  return categories.map(cat => capitalize(cat)).join(', ')
}
</script>

<style scoped>
.game-card {
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: none;
  border: none;
  transition: transform 0.2s;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.game-card:hover {
  transform: translateY(-2px) scale(1.01);
}
.game-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  min-height: 0;
  background: #222;
  overflow: hidden;
  flex: 1 1 auto;
}
.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}
.game-card:hover .game-image {
  transform: scale(1.04);
}
.game-info {
  padding: 10px 8px 8px 8px;
  background: transparent;
  text-align: left;
}
.game-title {
  font-size: 1rem;
  font-weight: 600;
  color: #373737;
  margin-bottom: 2px;
  line-height: 1.2;
}
.game-category {
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 0;
  text-transform: capitalize;
}

.jackpot-overlay {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #fff;
  color: #373737;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 16px;
  padding: 6px 16px 6px 12px;
  box-shadow: 0 2px 8px rgba(55,55,55,0.10);
  z-index: 4;
  min-width: 90px;
  text-align: center;
  letter-spacing: 0.5px;
  border: 1.5px solid #eee;
}
@media (max-width: 900px) {
  .jackpot-overlay {
    font-size: 0.95rem;
    padding: 5px 10px 5px 8px;
    min-width: 70px;
  }
}
@media (max-width: 600px) {
  .jackpot-overlay {
    font-size: 0.9rem;
    padding: 4px 8px 4px 6px;
    min-width: 60px;
  }
}

.ribbon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 5;
  pointer-events: none;
}

.ribbon-new {
  position: absolute;
  top: 14px;
  right: -38px;
  width: 110px;
  height: 32px;
  background: #8DC63F;
  color: #fff;
  font-size: 1rem;
  font-weight: 800;
  text-align: center;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(55,55,55,0.18);
  transform: rotate(45deg);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  pointer-events: none;
}
.ribbon-new::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 32px;
  height: 32px;
  background: #8DC63F;
  border-radius: 0 16px 16px 0;
  z-index: -1;
}
@media (max-width: 900px) {
  .ribbon-new {
    width: 80px;
    height: 22px;
    font-size: 0.8rem;
    top: 8px;
    right: -28px;
    line-height: 22px;
    border-radius: 11px;
  }
  .ribbon-new::after {
    width: 22px;
    height: 22px;
    border-radius: 0 11px 11px 0;
  }
}
@media (max-width: 600px) {
  .ribbon-new {
    width: 60px;
    height: 16px;
    font-size: 0.65rem;
    top: 4px;
    right: -18px;
    line-height: 16px;
    border-radius: 8px;
  }
  .ribbon-new::after {
    width: 16px;
    height: 16px;
    border-radius: 0 8px 8px 0;
  }
}

.ribbon-top {
  left: 16px;
  top: 16px;
  background: #373737;
  color: #fff;
  border-radius: 16px 24px 24px 16px;
  opacity: 0.85;
  transform: rotate(-25deg);
  font-size: 0.8rem;
  font-weight: 600;
  width: 80px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 900px) {
  .ribbon-top {
    width: 60px;
    height: 18px;
    font-size: 0.7rem;
    left: 10px;
    top: 10px;
  }
}
@media (max-width: 600px) {
  .ribbon-top {
    width: 40px;
    height: 12px;
    font-size: 0.6rem;
    left: 6px;
    top: 6px;
  }
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(55, 55, 55, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 3;
}
.game-card:hover .hover-overlay {
  opacity: 1;
}
.play-button {
  width: 60px;
  height: 60px;
  background: #8DC63F;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 0.3s;
}
.play-button:hover {
  background: #7AB32E;
  transform: scale(1.1);
}
.play-icon {
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: bold;
}
.game-name {
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  max-width: 90%;
  line-height: 1.3;
}

@media (max-width: 900px) {
  .game-info {
    padding: 8px 4px 6px 4px;
  }
  .game-title {
    font-size: 0.95rem;
  }
}
@media (max-width: 600px) {
  .game-info {
    padding: 6px 2px 4px 2px;
  }
  .game-title {
    font-size: 0.9rem;
  }
}
</style> 