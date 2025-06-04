import { createRouter, createWebHistory } from 'vue-router'
import { ROUTER_PATHS } from '@/constants'
import Home from '../pages/Home.vue'
import Board1 from '@/pages/Board-1.vue'
import Tread from '../pages/Tread.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTER_PATHS.HOME,
      name: 'home',
      component: Home,
    },
    {
      path: ROUTER_PATHS.BOARD1,
      name: 'board1',
      component: Board1,
    },
    {
      path: ROUTER_PATHS.TREAD,
      name: 'tread',
      component: Tread,
    },
  ],
})

export default router
