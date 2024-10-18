<template>
  <div
    class="relative flex items-center overflow-hidden rounded-md border border-gray-300 shadow-sm"
  >
    <select
      class="w-full appearance-none py-2 pl-4 pr-8 focus:outline-none"
      v-model="localValue"
      @change="$emit('update:modelValue', localValue)"
      :class="{ 'placeholder-style': localValue === '' }"
    >
      <option value="" class="placeholder-option" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option[keyName]" :value="option[keyName]">
        {{ option[keyName] }}
      </option>
    </select>
    <!--    <img class="absolute right-3 " src="/selectVector.svg"/>-->
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
    default: 'Select an option'
  },
  options: {
    type: Array,
    default: () => []
  },
  keyName: {
    type: String,
    required: true
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

<style scoped>
.placeholder-style {
  color: #8e8e8e;
}

.placeholder-option {
  color: #a0aec0;
}
</style>
