<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    <router-link
      v-for="(pokemon, index) in pokemons"
      :key="pokemon.name"
      :to="`/pokemon/${pokemon.name}`"
      class="flex items-center border rounded p-2 transition-transform transform hover:scale-105"
    >
      <img :src="getPokemonImage(getPokemonId(pokemon.url))" alt="Imagem do Pokémon" class="w-16 h-16 mr-4" />

      <div>
        <p class="text-gray-700 font-bold">
          #{{ getPokemonId(pokemon.url) }} {{ capitalizeName(pokemon.name) }}
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
import { ref, computed, onMounted } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'

const pokemonStore = usePokemonStore()

const pokemons = computed(() => pokemonStore.pokemons)

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

onMounted(() => {
  if (pokemonStore.pokemons.length === 0) {
    pokemonStore.fetchPokemons()
  }
})
</script>

<style scoped>
</style>
