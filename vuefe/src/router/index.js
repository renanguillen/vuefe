import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import PokemonList from '../components/PokemonList.vue'
import PokemonDetails from '../components/PokemonDetails.vue'
import PokemonByType from '../components/PokemonByType.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/pokemons', name: 'pokemon-list', component: PokemonList },
  { path: '/pokemon/:name', name: 'pokemon-details', component: PokemonDetails },
  { path: '/type/:type', name: 'pokemon-by-type', component: PokemonByType }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
