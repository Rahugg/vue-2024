<template>
  <div class="relative mt-6">
    <div class="absolute left-0 top-0 flex cursor-pointer items-center gap-2" @click="goBack">
      <img src="/arrow_back_24px.svg" />
      <span class="font-bold"> Back </span>
    </div>

    <div class="flex justify-center">
      <div class="flex flex-col">
        <div class="text-center text-4xl">{{ planet.name }}</div>
        <div class="mt-6 flex justify-around gap-32">
          <div class="flex flex-col">
            <span class="font-bold">Climate</span>
            <span>{{ planet.climate }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-bold">Terrain</span>
            <span>{{ planet.terrain }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-bold">Population</span>
            <span>{{ planet.population }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col px-4">
      <div>Residents</div>
      <div class="mt-6 grid grid-cols-4 gap-5">
        <a-card
          v-for="character in residents"
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
const planetId = route.params.id

const planet = ref({})
const residents = ref([])

const getPlanet = async () => {
  try {
    const response = await axios.get(`https://swapi.dev/api/planets/${planetId}/`)
    planet.value = response.data
    await fetchResidents()
  } catch (e) {
    console.log(e)
  }
}

const fetchResidents = async () => {
  residents.value = []
  for (const residentUrl of planet.value.residents) {
    try {
      const response = await axios.get(residentUrl)
      residents.value.push(response.data)
    } catch (e) {
      console.log(e)
    }
  }
}

onMounted(() => {
  getPlanet()
})

const goBack = () => {
  router.back()
}

const navigateToCharacter = (url) => {
  const id = url.match(/\/people\/(\d+)\//)[1]
  router.push(`/characters/${id}`)
}
</script>
