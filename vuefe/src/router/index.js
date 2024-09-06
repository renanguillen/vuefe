import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import PokemonList from '../components/PokemonList.vue'
import PokemonDetails from '../components/PokemonDetails.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/pokemons', name: 'pokemon-list', component: PokemonList },
  { path: '/pokemon/:name', name: 'pokemon-details', component: PokemonDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
