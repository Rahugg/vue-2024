<template>
  <li>
    <div class="flex justify-between border-b-2 py-2">
      <div>
        <div class="font-bold">Episode {{ props.film.episode_id }}: {{ props.film.title }}</div>
        <div>Director: {{ props.film.director }}</div>
        <div>Release Date: {{ props.film.release_date }}</div>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  film: {
    type: Object,
    required: true
  }
})
</script>
