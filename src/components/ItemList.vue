<template>
  <div class="full-screen-center">
    <div class="grid-layout">
      <div class="flex-column">
        <item-card />
        <item-card />
      </div>
      <item-card class="full-height"/>
      <div class="flex-column">
        <item-card />
        <item-card />
      </div>
    </div>
  </div>
</template>

<script setup>
import ItemCard from '@/components/ItemCard.vue'
</script>

<style scoped>
.full-screen-center {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 7rem;
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.full-height {
  height: 100%;
}

</style>