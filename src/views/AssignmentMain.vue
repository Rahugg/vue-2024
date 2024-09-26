<template>
    <div class="main-container">
        <AssignmentHeader />
    </div>

</template>

<script setup>

import AssignmentHeader from '../components/AssignmentHeader.vue';

</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.filter-buttons {
    margin-bottom: 20px;
}

</style>