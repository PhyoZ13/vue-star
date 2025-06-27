import { createRouter, createWebHistory } from 'vue-router'
import GamesPage from '../views/GamesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'games',
      component: GamesPage,
    },
  ],
})

export default router
