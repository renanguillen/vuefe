import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    pokemonDetails: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPokemons() {
      this.loading = true
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        this.pokemons = response.data.results
      } catch (error) {
        this.error = 'Erro ao buscar os Pokémons'
      } finally {
        this.loading = false
      }
    },
    async fetchPokemonDetails(pokemonUrl) {
      this.loading = true
      try {
        const response = await axios.get(pokemonUrl)
        this.pokemonDetails = response.data
      } catch (error) {
        this.error = 'Erro ao buscar os detalhes do Pokémon'
      } finally {
        this.loading = false
      }
    },
    clearPokemonDetails() {
      this.pokemonDetails = null
    },
  },
})
