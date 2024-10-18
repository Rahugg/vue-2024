<template>
  <li>
    <div class="flex flex-col border-b-2">
      <span class="font-bold">{{ props.label }}</span>
      <span>{{ props.value }}</span>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})
</script>
