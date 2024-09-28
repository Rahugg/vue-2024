<template>
  <div id="app">
    
    <AssignmentHeader @updateTopic="updateTopic" />
    <AssignmentMain />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import AssignmentHeader from './components/AssignmentHeader.vue';
import AssignmentMain from './views/AssignmentMain.vue';

const selectedTopic = ref('ADVENTURE BLOG');

const updateTopic = (topic) => {
  selectedTopic.value = topic;
};

provide('selectedTopic', selectedTopic);
provide('updateTopic', updateTopic);
</script>

<style scoped>
#app {
  background-image: url('assets/main-bg.png'); 
  background-size: cover;
  background-position: center; 
  background-repeat: no-repeat; 
  min-height: 100vh; 
}
</style>
