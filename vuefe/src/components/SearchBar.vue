<template>
  <div class="flex flex-col items-center w-full max-w-xl relative">
    <input
      v-model="searchQuery"
      @input="searchPokemons"
      @keydown.down.prevent="moveDown"
      @keydown.up.prevent="moveUp"
      @keydown.enter.prevent="selectPokemon"
      placeholder="Digite o nome do Pokémon"
      class="border rounded-md px-4 py-3 text-lg"
      style="width: 26ch;"
    />

    <ul v-if="filteredPokemons.length > 0" class="absolute top-14 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-10" style="width: 26ch;">
      <li
        v-for="(pokemon, index) in filteredPokemons"
        :key="pokemon.name"
        @click="goToPokemon(pokemon.name)"
        :class="{'bg-gray-200': index === selectedIndex}"
        class="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ capitalizeName(pokemon.name) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const searchQuery = ref('')
const filteredPokemons = ref([])
const allPokemons = ref([])

const selectedIndex = ref(-1)
const router = useRouter()

const fetchAllPokemons = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    allPokemons.value = response.data.results
  } catch (error) {
    console.error('Erro ao buscar Pokémons:', error)
  }
}

const searchPokemons = () => {
  const query = searchQuery.value.toLowerCase()
  filteredPokemons.value = allPokemons.value.filter(pokemon =>
    pokemon.name.includes(query)
  )
  selectedIndex.value = -1
}

const moveDown = () => {
  if (selectedIndex.value < filteredPokemons.value.length - 1) {
    selectedIndex.value++
  }
}

const moveUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const selectPokemon = () => {
  if (selectedIndex.value >= 0) {
    goToPokemon(filteredPokemons.value[selectedIndex.value].name)
  }
}

const goToPokemon = (name) => {
  router.push(`/pokemon/${name}`)
}

const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

onMounted(() => {
  fetchAllPokemons()
})
</script>

<style scoped>
input {
  height: 3.5rem;
  font-size: 1.25rem;
}

.bg-gray-200 {
  background-color: #e2e8f0;
}

ul {
  max-height: 15rem;
  overflow-y: auto;
}
</style>
