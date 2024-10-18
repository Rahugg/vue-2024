<script setup>
import AHeader from '@/components/AHeader.vue'
// import CharactersView from "@/views/CharactersView.vue";
import AFooter from '@/components/AFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a-header />
    <div class="m-auto w-4/5 flex-grow">
      <RouterView />
    </div>
    <a-footer class="mt-16" />
  </div>
</template>
