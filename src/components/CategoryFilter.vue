<template>
  <div>
    <div class="top-black-bar"></div>
    <nav class="category-bar">
      <ul class="category-list">
        <li v-for="category in categories" :key="category.value">
          <button
            class="category-btn"
            :class="{ 'active': selectedCategory === category.value }"
            @click="$emit('category-change', category.value)"
          >
            {{ category.label }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface Category {
  value: string
  label: string
}

interface Props {
  categories: Category[]
  selectedCategory: string
}

defineProps<Props>()
defineEmits(['category-change'])
</script>

<style scoped>
.top-black-bar {
  width: 100vw;
  height: 32px;
  background: #111;
  margin-left: 50%;
  transform: translateX(-50%);
}

.category-bar {
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
  background: #444;
  padding: 0;
  box-shadow: 0 2px 8px rgba(55, 55, 55, 0.05);
  position: relative;
  z-index: 10;
  overflow-x: unset;
}

.category-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  overflow-x: unset;
  white-space: normal;
}

.category-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0 36px;
  height: 56px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-radius: 0;
  outline: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-btn.active {
  background: #A6CE39;
  color: #fff;
}

.category-btn:not(.active):hover {
  background: rgba(255,255,255,0.08);
  color: #A6CE39;
}

@media (max-width: 900px) {
  .category-btn {
    padding: 0 18px;
    font-size: 1rem;
    height: 48px;
  }
}
@media (max-width: 600px) {
  .category-list {
    flex-wrap: wrap;
    overflow-x: unset;
  }
  .category-btn {
    padding: 0 12px;
    font-size: 0.95rem;
    height: 40px;
  }
}
</style>
