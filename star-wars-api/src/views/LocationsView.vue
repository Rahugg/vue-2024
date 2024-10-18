<template>
  <div>
    <div class="flex">
      <img
        src="/death-star-1.svg"
        height="75"
        width="75"
        alt="Star Wars Logo"
        class="mx-auto mt-6"
      />
      <img
        src="/death-star-2.svg"
        height="75"
        width="75"
        alt="Star Wars Logo"
        class="mx-auto mt-6"
      />
    </div>

    <div class="mt-4 flex gap-5">
      <div class="relative flex-1">
        <a-input class="pr-3" v-model="filters.search" placeholder="Search for a planet..." />
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
        <a-card-location
          v-for="planet in planets"
          :key="planet.url"
          :planet="planet"
          @navigate="navigateToPlanet"
        />
      </div>
    </div>

    <div class="mt-12 flex justify-center">
      <a-button class="font-bold text-[#2196F3]" v-if="nextPage" @click="loadMore">
        LOAD MORE
      </a-button>
    </div>
  </div>
</template>

<script setup>
import AInput from '@/components/AInput.vue'
import ACardLocation from '@/components/ACardLocation.vue'
import AButton from '@/components/AButton.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import router from '@/router/index.js'

const planets = ref([])
const nextPage = ref(null)
const filters = ref({
  search: ''
})

const isLoading = ref(false)

const fetchPlanets = async (url = 'https://swapi.dev/api/planets/') => {
  try {
    isLoading.value = true
    const response = await axios.get(url)
    planets.value.push(...response.data.results)
    nextPage.value = response.data.next
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

const buildFilterQuery = () => {
  const query = new URLSearchParams()
  if (filters.value.search) query.append('search', filters.value.search)
  return query.toString()
}

watch(
  filters,
  () => {
    planets.value = []
    nextPage.value = null
    const query = buildFilterQuery()
    fetchPlanets(`https://swapi.dev/api/planets/?${query}`)
  },
  { deep: true }
)

onMounted(() => {
  fetchPlanets()
})

const navigateToPlanet = (url) => {
  const id = url.match(/\/planets\/(\d+)\//)[1]
  router.push(`/planets/${id}`)
}

const resetSearch = () => {
  filters.value.search = ''
}

const loadMore = () => {
  if (nextPage.value) {
    fetchPlanets(nextPage.value)
  }
}
</script>
