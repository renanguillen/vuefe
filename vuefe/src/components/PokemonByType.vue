<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    <router-link
      v-for="(pokemonData, index) in filteredPokemons"
      :key="pokemonData.pokemon.name"
      :to="`/pokemon/${pokemonData.pokemon.name}`"
      class="flex items-center border rounded p-2 transition-transform transform hover:scale-105"
    >
      <img :src="getPokemonImage(getPokemonId(pokemonData.pokemon.url))" alt="Imagem do Pokémon" class="w-16 h-16 mr-4" />

      <div>
        <p class="text-gray-700 font-bold">
          #{{ getPokemonId(pokemonData.pokemon.url) }} {{ capitalizeName(pokemonData.pokemon.name) }}
        </p>
      </div>
    </router-link>

    <div class="fixed bottom-16 right-4">
      <router-link to="/">
        <i class="fas fa-home text-red-500 text-2xl"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const filteredPokemons = ref([])

const fetchPokemonsByType = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${route.params.type}`)
    filteredPokemons.value = response.data.pokemon
  } catch (err) {
    console.error('Erro ao buscar os Pokémon do tipo selecionado.')
  }
}

const getPokemonImage = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

const getPokemonId = (url) => {
  return url.split('/')[6]
}

const capitalizeName = (name) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

watch(() => route.params.type, () => {
  fetchPokemonsByType()
})

onMounted(() => {
  fetchPokemonsByType()
})
</script>

<style scoped>
</style>
