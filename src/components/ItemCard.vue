<template>
  <div class="relative-container">
    <img class="full-size-img" src="./avatar.jpg" alt="img-1"/>
    <div class="overlay">
      <span class="title">Sharingan</span>
      <span class="subtitle">Sharingan moment</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.relative-container {
  position: relative;
  width: 100%;
  height: 16rem; /* 64 * 0.25rem */
}

.full-size-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 92%;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  overflow: hidden;
}

.title {
  display: block;
  font-weight: bold;
  font-size: 1.125rem; /* text-lg */
}

.subtitle {
  font-size: 0.875rem; /* text-sm */
}

</style>