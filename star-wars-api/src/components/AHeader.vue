<template>
  <header class="w-full bg-white shadow-md">
    <div class="m-auto flex w-4/5 items-center justify-between py-4">
      <div class="flex items-center">
        <img src="/public/star-wars-mini.svg" alt="logo" height="50" width="50" />
      </div>

      <nav>
        <ul class="flex cursor-pointer space-x-6">
          <li>
            <router-link to="/">Characters</router-link>
          </li>
          <li>
            <router-link to="/planets">Planets</router-link>
          </li>
          <li>
            <router-link to="/films">Films</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script setup></script>
