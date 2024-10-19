<template>
  <ul>
    <film-item v-for="film in props.films" :key="film.url" :film="film" />
  </ul>
</template>

<script setup>
import FilmItem from '@/components/FilmItem.vue'

const props = defineProps({
  films: {
    type: Array,
    default: () => []
  }
})
</script>
