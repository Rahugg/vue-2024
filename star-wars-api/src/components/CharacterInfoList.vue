<template>
  <ul>
    <character-info-item
      v-for="(value, label) in props.info"
      :key="label"
      :label="label"
      :value="value"
    />
  </ul>
</template>
<script setup lang="ts">
import CharacterInfoItem from '@/components/CharacterInfoItem.vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})
</script>
