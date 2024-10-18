<template>
  <div class="flex w-60 cursor-pointer flex-col rounded border shadow-lg" @click="handleClick">
    <div class="flex flex-col px-4 py-3">
      <span class="mb-0.5 text-lg font-bold">{{ episode.title }}</span>
      <span class="text-sm">Episode {{ episode.episode_id }}</span>
      <span class="text-sm">Released: {{ episode.release_date }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  episode: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const handleClick = () => {
  emit('navigate', props.episode.url)
}
</script>
