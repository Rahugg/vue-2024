<template>
  <div class="relative mt-6">
    <div class="absolute left-0 top-0 flex cursor-pointer items-center gap-2" @click="goBack">
      <img src="/arrow_back_24px.svg" />
      <span class="font-bold"> Back </span>
    </div>

    <div class="flex justify-center">
      <div class="flex w-4/5 flex-col">
        <div class="text-center text-4xl">{{ episode.title }}</div>
        <div class="mt-6 flex justify-around pl-2">
          <div class="flex flex-col">
            <span class="font-bold">Episode</span>
            <span>{{ episode.episode_id }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-bold">Release Date</span>
            <span>{{ episode.release_date }}</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div>Characters</div>
      <div class="mt-6 grid grid-cols-4 gap-5">
        <a-card
          v-for="character in neededCharacters"
          :key="character.url"
          :character="character"
          @navigate="navigateToCharacter"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ACard from '@/components/ACard.vue'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const route = useRoute()
const episodeId = route.params.id

const episode = ref({})
const neededCharacters = ref([])

const getEpisode = async () => {
  try {
    const response = await axios.get(`https://swapi.dev/api/films/${episodeId}/`)
    episode.value = response.data
    await fetchCharacters()
  } catch (e) {
    console.log(e)
  }
}

const fetchCharacters = async () => {
  const characterUrls = episode.value.characters
  neededCharacters.value = []

  for (const url of characterUrls) {
    try {
      const response = await axios.get(url)
      neededCharacters.value.push(response.data)
    } catch (e) {
      console.log(e)
    }
  }
}

onMounted(() => {
  getEpisode()
})

const goBack = () => {
  router.back()
}

const navigateToCharacter = (url) => {
  const id = url.match(/\/people\/(\d+)\//)[1]
  router.push(`/characters/${id}`)
}
</script>
