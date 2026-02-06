import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import CocktailView from '../views/CocktailView.vue'
import IngredientView from '../views/IngredientView.vue'

const router =createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',
      name: 'home',
      component: HomeView 
    },
    {
      path: '/cocktail/:id',
      name: 'cocktail',
      component: CocktailView
    },
    {
      path: '/ingredient/:name',
      name: 'ingredient',
      component: IngredientView
    }
  ]
})

export default router
