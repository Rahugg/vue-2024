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
        <li><img src="./download.png" alt="search-icon" class="search-icon"></li>
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
  font-size: 1rem;
}

.nav-list {
  display: flex;
  gap: 2rem;
  cursor: pointer;
}

li {
  list-style-type: none;
  font-size: 0.875rem;
  color: black;
  font-weight: 900;
}

.search-icon {
  width: 20px;
  /* Adjust the size as needed */
  height: 20px;
  /* Adjust the size as needed */
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.search-icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}
</style>