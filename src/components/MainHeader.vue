<template>
  <header class="header">
    <div class="header-title">Mini Blog</div>
    <div>
      <ul class="nav-list">
        <li>Home</li>
        <li>Politics</li>
        <li>Tech</li>
        <li>Entertainment</li>
        <li>Travel</li>
        <li>Sports</li>
        <li>Search</li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.header-title {
  font-weight: bold;
  font-size: 1.25rem;
}

.nav-list {
  display: flex;
  gap: 0.75rem;
  cursor: pointer;
}
</style>