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
      </div>
    </header>

    <main class="p-4 mt-16">
      <router-view />
    </main>

    <footer class="p-4 bg-red-600 text-white text-center fixed bottom-0 left-0 w-full">
      <p>Feito com ❤️ usando Vue.js e PokeAPI</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
header {
  background-color: #b61d1d;
}

footer {
  background-color: #b61d1d;
}
</style>
