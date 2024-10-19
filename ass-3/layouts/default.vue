<template>
    <div>

      <AssignmentHeader @updateTopic="updateTopic" />
      <NuxtPage />
    </div>
  </template>
  
  <script setup>
  import AssignmentHeader from '@/components/AssignmentHeader.vue';

  const updateTopic = (topic) => {

  };
  </script>
  
  <style scoped>
  /* Your global styles */
  </style>
  