import { createRouter, createWebHistory } from 'vue-router'
import { ROUTER_PATHS } from '@/constants'
import Home from '../pages/Home.vue'
import Tread from '../pages/Tread.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/board/:id',
      name: 'board',
      component: Home,
      meta: {
        title: `Доска`,
      },
    },
    {
      path: ROUTER_PATHS.TREAD,
      name: 'tread',
      component: Tread,
      meta: {
        title: 'Создание треда',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  document.title = title
  next()
})

export default router
