<template>
  <div
    class="relative flex items-center overflow-hidden rounded-md border border-gray-300 shadow-sm"
  >
    <img class="absolute left-3 h-5 w-5" src="/Vector.svg" />
    <input
      class="w-full py-2 pl-10 pr-4 focus:outline-none"
      type="text"
      :placeholder="placeholder"
      v-model="localValue"
      @input="$emit('update:modelValue', localValue)"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Filter by name...'
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
  }
)

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
