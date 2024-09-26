<template>
  <div class="relative-container">
    <img class="full-size-img" src="./avatar.jpg" alt="img-1"/>
    <div class="overlay">
      <span class="title">Sharingan</span>
      <span class="subtitle">July 19 2019</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.relative-container {
  position: relative;
  width: 100%;
  height: 16rem; 
}

.full-size-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 92%;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  overflow: hidden;
}

.title {
  display: block;
  font-weight: bold;
  font-size: 1.125rem; 
}

.subtitle {
  font-size: 0.875rem;
  color:rgb(131, 127, 127);
}

</style>