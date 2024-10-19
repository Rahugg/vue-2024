<template>
  <div>
    <ul>
      <character-info-item
        v-for="(value, label) in props.characterInfo"
        :key="label"
        :label="label"
        :value="value"
      />
    </ul>
  </div>
</template>

<script setup>
import CharacterInfoItem from '@/components/CharacterInfoItem.vue'

const props = defineProps({
  characterInfo: {
    type: Object,
    default: () => ({})
  }
})
</script>
