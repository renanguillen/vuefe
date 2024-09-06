<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <img src="@/assets/pokeball.png" alt="Pokébola" class="w-24 h-24 mb-4" />
    <SearchBar />
  </div>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue'
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>
