<template>
  <div class="flex w-60 cursor-pointer flex-col rounded border shadow-lg" @click="handleClick">
    <div class="flex flex-col px-4 py-3">
      <span class="mb-0.5 text-lg font-bold"> {{ planet.name }} </span>
      <span class="text-sm"> Climate: {{ planet.climate }} </span>
      <span class="text-sm"> Terrain: {{ planet.terrain }} </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  planet: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const handleClick = () => {
  emit('navigate', props.planet.url)
}
</script>
