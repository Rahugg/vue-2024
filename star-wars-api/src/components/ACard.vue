<template>
  <div class="flex w-60 cursor-pointer flex-col rounded border shadow-lg" @click="handleClick">
    <div class="flex flex-col px-4 py-3">
      <span class="mb-0.5 text-lg font-bold">{{ character.name }}</span>
      <span class="text-sm">Gender: {{ character.gender }}</span>
      <span class="text-sm">Birth Year: {{ character.birth_year }}</span>
      <span class="text-sm">Height: {{ character.height }} cm</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const handleClick = () => {
  emit('navigate', props.character.url)
}
</script>
