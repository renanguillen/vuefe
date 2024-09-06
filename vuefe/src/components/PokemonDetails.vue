<template>
  <div class="p-4">
    <div v-if="loading">Carregando detalhes do Pokémon...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="pokemonDetails" class="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">
        #{{ pokemonDetails.id }} {{ capitalizeName(pokemonDetails.name) }}
      </h2>
      
      <img :src="pokemonDetails.sprites.front_default" alt="Imagem do Pokémon" class="w-32 h-32 my-4 mx-auto" />
      
      <p class="flex items-center"><strong>Types:</strong>
        <span class="flex space-x-4 ml-2">
          <router-link
            v-for="type in pokemonDetails.types"
            :key="type.slot"
            :to="`/type/${type.type.name}`"
            class="flex items-center space-x-2"
          >
            <img :src="getTypeIcon(type.type.name)" alt="Icone do tipo" class="w-6 h-6 cursor-pointer" />
          </router-link>
        </span>
      </p>

      <p class="mt-4"><strong>Abilities:</strong> {{ abilitiesList }}</p>
    </div>

    <div class="fixed bottom-16 right-4">
      <router-link to="/">
        <i class="fas fa-home text-red-500 text-2xl"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemonStore'

const route = useRoute()
const pokemonStore = usePokemonStore()

const pokemonDetails = computed(() => pokemonStore.pokemonDetails)
const loading = computed(() => pokemonStore.loading)
const error = computed(() => pokemonStore.error)

const capitalizeName = (name) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const abilitiesList = computed(() => {
  if (pokemonDetails.value && pokemonDetails.value.abilities) {
    return pokemonDetails.value.abilities
      .map(ability => capitalizeName(ability.ability.name))
      .join(', ')
  }
  return ''
})

const getTypeIcon = (type) => {
  return new URL(`../assets/${type}.png`, import.meta.url).href
}

onMounted(() => {
  pokemonStore.fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
})
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f7fafc;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.w-6 {
  width: 1.5rem;
  height: 1.5rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
