<template>
  <div class="full-screen-center">
    <div class="grid-layout">
      <div class="flex-column">
        <item-card />
        <item-card />
      </div>
      <div class="relative-container">
        <button id="travel" class="overlay-button">Travel</button>
        <button class="overlay-button">Food</button>
        <item-card class="full-height" />
      </div>
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

.relative-container {
  position: relative;
}

.overlay-button {
  position: absolute;
  top: 410px;
  left: 10px;
  z-index: 1;
  padding: 0.5rem 1rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace;
}

.overlay-button:nth-child(2) {
  left: 95px;
  background-color: blue;
}

.overlay-button:hover {
  background-color: darkred;
}

.overlay-button:nth-child(2):hover {
  background-color: darkblue;
}
</style>