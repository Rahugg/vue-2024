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

<style></style>
