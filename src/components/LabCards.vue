<template>
  <div class="h-screen flex items-center justify-center">
    <div class="grid grid-cols-3 gap-4 m-28">
      <div class="flex flex-col space-y-4">
        <lab-card />
        <lab-card />
      </div>
      <lab-card class="h-full"/>
      <div class="flex flex-col space-y-4">
        <lab-card />
        <lab-card />
      </div>
    </div>
  </div>
</template>
<script setup>
import LabCard from '@/components/LabCard.vue'
</script>