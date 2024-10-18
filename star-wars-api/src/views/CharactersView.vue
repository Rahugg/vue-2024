<template>
  <div>
    <div>
      <img
        class="mx-auto mt-6"
        height="75"
        width="75"
        src="/public/star-wars-logo.svg.svg"
        alt="Star Wars logo"
      />
    </div>

    <div class="mt-4 flex gap-5">
      <div class="relative flex-1">
        <a-input v-focus v-model="filters.search" class="pr-3" placeholder="Search by name..." />
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
        <a-card
          v-for="character in characters"
          :key="character.url"
          :character="character"
          @navigate="navigateToCharacter"
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
import ACard from '@/components/ACard.vue'
import AButton from '@/components/AButton.vue'
import { useStore } from 'vuex'
import { computed, onMounted, watch } from 'vue'
import router from '@/router/index.js'

const store = useStore()

const characters = computed(() => store.getters.filteredCharacters)
const nextPage = computed(() => store.state.nextPage)
const filters = computed({
  get: () => store.state.filters,
  set: (value) => store.commit('SET_FILTERS', value)
})

const loadMore = () => {
  if (nextPage.value) {
    store.dispatch('fetchCharacters', nextPage.value)
  }
}

onMounted(() => {
  store.dispatch('fetchCharacters')
})

const navigateToCharacter = (url) => {
  const id = url.match(/\/people\/(\d+)\//)[1]
  router.push(`/characters/${id}`)
}

const resetSearch = () => {
  store.commit('RESET_FILTERS')
}

watch(
  filters,
  () => {
    store.dispatch('fetchCharacters', buildFilterUrl())
  },
  { deep: true }
)

const buildFilterUrl = () => {
  const baseUrl = 'https://swapi.dev/api/people/'
  const query = new URLSearchParams()
  if (filters.value.search) query.append('search', filters.value.search)
  return `${baseUrl}?${query.toString()}`
}
</script>
