<template>
  <div>
    <header class="p-4 bg-red-600 text-white fixed top-0 left-0 w-full z-10 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <router-link to="/" class="flex items-center text-3xl font-bold hover:underline">
          Pokédex
        </router-link>
        <span class="text-white text-xl">|</span>
        <router-link to="/pokemons" class="text-lg font-medium hover:underline" style="padding-top: 6.5px;">
          Todos
        </router-link>
        <span class="text-white text-xl">|</span>
        
        <div class="flex space-x-4">
          <router-link v-for="type in types" :key="type" :to="`/type/${type}`">
            <img :src="getTypeIcon(type)" alt="Icone do tipo" class="w-8 h-8" />
          </router-link>
        </div>
      </div>
    </header>

    <main class="p-4 mt-16">
      <router-view />
    </main>

    <footer class="p-4 bg-red-600 text-white text-center fixed bottom-0 left-0 w-full">
      <p>Feito utilizando Vue.js, Tailwind, Pinia e PokeAPI</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy']

const getTypeIcon = (type) => {
  return new URL(`./assets/${type}.png`, import.meta.url).href
}
</script>

<style scoped>
header {
  background-color: #b61d1d;
}

footer {
  background-color: #b61d1d;
}

.w-8 {
  width: 2rem;
  height: 2rem;
}
</style>
