<template>
  <div>
    <div class="relative mt-6">
      <div class="absolute left-0 top-0 flex cursor-pointer items-center gap-2" @click="goBack">
        <img src="/arrow_back_24px.svg" />
        <span class="font-bold"> Back </span>
      </div>

      <div class="flex justify-center">
        <h1 class="text-4xl font-bold">{{ character.name }}</h1>
      </div>

      <div class="mt-8 flex justify-center">
        <div class="flex w-8/12 justify-between">
          <div>
            <span class="text-3xl">Informations</span>
            <character-details class="mt-6 pl-4" :character-info="characterInfo" />
          </div>
          <div>
            <span class="text-3xl">Films</span>
            <film-list class="mt-6 pl-4" :films="films" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import CharacterDetails from '@/components/CharacterDetails.vue'
import FilmList from '@/components/FilmList.vue'
import { useRoute } from 'vue-router'
import router from '@/router/index.js'

const route = useRoute()
const characterId = route.params.id

const character = ref({})
const films = ref([])

const fetchCharacter = async () => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${characterId}/`)
    character.value = response.data
    await fetchHomeworld()
    // await fetchSpecies() // Uncomment if you want to fetch species
    await fetchFilms()
  } catch (e) {
    console.log(e)
  }
}

const characterInfo = computed(() => ({
  Name: character.value.name,
  'Birth Year': character.value.birth_year,
  Gender: character.value.gender,
  Height: character.value.height,
  Mass: character.value.mass,
  'Hair Color': character.value.hair_color,
  'Skin Color': character.value.skin_color,
  'Eye Color': character.value.eye_color,
  Homeworld: character.value.homeworld_name || ''
  // 'Species': character.value.species_name || '' // Uncomment if you fetch species
}))

const fetchHomeworld = async () => {
  if (character.value.homeworld) {
    try {
      const response = await axios.get(character.value.homeworld)
      character.value.homeworld_name = response.data.name
    } catch (e) {
      console.log(e)
    }
  }
}

// const fetchSpecies = async () => {
//   if (character.value.species.length > 0) {
//     try {
//       const response = await axios.get(character.value.species[0])
//       character.value.species_name = response.data.name
//     } catch (e) {
//       console.log(e)
//     }
//   } else {
//     character.value.species_name = 'Human' // Default species if none specified
//   }
// }

const fetchFilms = async () => {
  films.value = []
  for (const filmUrl of character.value.films) {
    try {
      const response = await axios.get(filmUrl)
      films.value.push(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  // Sort films by episode_id
  films.value.sort((a, b) => a.episode_id - b.episode_id)
}

onMounted(() => {
  fetchCharacter()
})

const goBack = () => {
  router.back()
}
</script>
