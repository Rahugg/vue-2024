<template>
  <div class="flex items-center justify-center">
    <div class="mt-8 flex justify-center">
      <div class="flex w-8/12 justify-between">
        <div>
          <span class="text-3xl">Episodes</span>
          <episode-list class="mt-6 pl-4" :episodes="neededEpisodes" />
        </div>
      </div>
    </div>

    <div>
      <span class="">Somethind</span>
    </div>
  </div>
</template>
<script setup>
import EpisodeList from '@/components/FilmList.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const character = ref({})

const filteredEpisodes = ref([])

const characterId = 1

const episodes = ref([])

const neededEpisodes = ref([])

const getCharacter = async () => {
  const response = await axios.get(`https://swapi.dev/api/people/${characterId}`)
  character.value = response.data

  filteredEpisodes.value = character.value.episode.map((episodeUrl) => {
    return episodeUrl.split('/').pop()
  })
}

const getEpisodes = async () => {
  const response = await axios.get(`https://swapi.dev/api/films/${filteredEpisodes.value}`)
  episodes.value = response.data
}

const getRelatedEpisodes = async () => {
  const response = await axios.get(`https://swapi.dev/api/films/${episodes}`)
  neededEpisodes.value = response.data
}

const getCharacterAndEpisodes = async () => {
  try {
    const characterResponse = await axios.get(`https://swapi.dev/api/people/${characterId}`)
    character.value = characterResponse.data

    filteredEpisodes.value = character.value.episode.map((episodeUrl) =>
      episodeUrl.split('/').pop()
    )

    const episodesResponse = await axios.get(
      `https://swapi.dev/api/films//${filteredEpisodes.value.join(',')}`
    )

    neededEpisodes.value = Array.isArray(episodesResponse.data)
      ? episodesResponse.data
      : [episodesResponse.data]
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getCharacterAndEpisodes()
})
</script>
