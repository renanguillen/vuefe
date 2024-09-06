<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    <router-link
      v-for="(pokemon, index) in pokemons"
      :key="pokemon.name"
      :to="`/pokemon/${pokemon.name}`"
      class="flex items-center border rounded p-2 transition-transform transform hover:scale-105"
    >
      <img :src="getPokemonImage(index + 1)" alt="Imagem do Pokémon" class="w-16 h-16 mr-4" />

      <div>
        <p class="text-gray-700 font-bold">
          #{{ index + 1 }} {{ capitalizeName(pokemon.name) }}
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
import { ref, onMounted } from 'vue'
import axios from 'axios'

const pokemons = ref([])

const fetchPokemons = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    pokemons.value = response.data.results
  } catch (error) {
    console.error('Erro ao buscar Pokémons:', error)
  }
}

const getPokemonImage = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

onMounted(() => {
  fetchPokemons()
})
</script>
