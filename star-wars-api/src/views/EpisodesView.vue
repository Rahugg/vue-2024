<template>
  <div>
    <div class="flex">
      <img
        class="mx-auto mt-6"
        height="75"
        width="75"
        src="/darth-vader.svg"
        alt="Star Wars Logo"
      />
      <img class="mx-auto mt-6" height="75" width="75" src="/chewbacca.svg" alt="Star Wars Logo" />
      <img
        class="mx-auto mt-6"
        height="75"
        width="75"
        src="/stormtrooper.svg"
        alt="Star Wars Logo"
      />
    </div>

    <div class="mt-4 flex gap-5">
      <div class="relative flex-1">
        <a-input class="flex-1" v-model="filters.search" placeholder="Search for a film..." />
        <button
          v-if="filters.search"
          @click="resetSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
        >
          ✕
        </button>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="mt-16 grid grid-cols-4 gap-5">
        <a-card-episode
          v-for="episode in episodes"
          :key="episode.url"
          :episode="episode"
          @navigate="navigateToEpisode"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AInput from '@/components/AInput.vue'
import ACardEpisode from '@/components/ACardEpisode.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import router from '@/router/index.js'

const episodes = ref([])

const filters = ref({
  search: ''
})

const buildFilterQuery = () => {
  const query = new URLSearchParams()
  if (filters.value.search) query.append('search', filters.value.search)
  return query.toString()
}

watch(
  filters,
  () => {
    const query = buildFilterQuery()
    fetchEpisodes(`https://swapi.dev/api/films/?${query}`)
  },
  { deep: true }
)

const fetchEpisodes = async (url = 'https://swapi.dev/api/films/') => {
  try {
    const response = await axios.get(url)
    episodes.value = response.data.results
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  fetchEpisodes()
})

const navigateToEpisode = (url) => {
  const id = url.match(/\/films\/(\d+)\//)[1]
  router.push(`/films/${id}`)
}

const resetSearch = () => {
  filters.value.search = ''
}
</script>
