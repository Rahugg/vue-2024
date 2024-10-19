import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    characters: [],
    films: [],
    planets: [],
    loading: false,
    nextPage: null,
    filters: {
      search: ''
    },
    characterDetails: {},
    filmDetails: {},
    planetDetails: {}
  },
  mutations: {
    SET_CHARACTERS(state, payload) {
      state.characters = payload
    },
    ADD_CHARACTERS(state, payload) {
      state.characters.push(...payload)
    },
    SET_FILMS(state, payload) {
      state.films = payload
    },
    SET_PLANETS(state, payload) {
      state.planets = payload
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_NEXT_PAGE(state, payload) {
      state.nextPage = payload
    },
    SET_FILTERS(state, payload) {
      state.filters = { ...state.filters, ...payload }
    },
    RESET_FILTERS(state) {
      state.filters = { search: '' }
    },
    SET_CHARACTER_DETAILS(state, payload) {
      state.characterDetails = payload
    },
    SET_FILM_DETAILS(state, payload) {
      state.filmDetails = payload
    },
    SET_PLANET_DETAILS(state, payload) {
      state.planetDetails = payload
    }
  },
  actions: {
    async fetchCharacters({ commit, state }, url = 'https://swapi.dev/api/people/') {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(url)
        if (state.nextPage && url !== 'https://swapi.dev/api/people/') {
          commit('ADD_CHARACTERS', response.data.results)
        } else {
          commit('SET_CHARACTERS', response.data.results)
        }
        commit('SET_NEXT_PAGE', response.data.next)
      } catch (error) {
        console.error(error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchCharacterDetails({ commit }, characterId) {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${characterId}/`)
        const character = response.data

        // Fetch homeworld name
        if (character.homeworld) {
          const homeworldResponse = await axios.get(character.homeworld)
          character.homeworld_name = homeworldResponse.data.name
        }

        // Fetch films
        const films = []
        for (const filmUrl of character.films) {
          const filmResponse = await axios.get(filmUrl)
          films.push(filmResponse.data)
        }
        character.films = films

        commit('SET_CHARACTER_DETAILS', character)
      } catch (error) {
        console.error(error)
      }
    }
    // Add similar actions for films and planets if needed
  },
  getters: {
    filteredCharacters(state) {
      if (state.filters.search) {
        return state.characters.filter((character) =>
          character.name.toLowerCase().includes(state.filters.search.toLowerCase())
        )
      }
      return state.characters
    }
    // Add other getters if needed
  }
})
