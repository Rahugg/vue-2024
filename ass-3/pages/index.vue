<script setup>
import { ref } from 'vue';
import AssignmentHeader from '@/components/AssignmentHeader.vue';
import AssignmentMain from '@/components/AssignmentMain.vue';

const selectedTopic = ref('ADVENTURE BLOG');

const updateTopic = (topic) => {
  selectedTopic.value = topic;
};
</script>

<template>
  <div class="index-page">
    <div class="header-container">
      <AssignmentHeader @updateTopic="updateTopic" />
    </div>
    <div class="main-container">
      <AssignmentMain :selectedTopic="selectedTopic" />
    </div>
  </div>
</template>

<style scoped>
.index-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #e3f2fd;
  padding: 20px;
  gap: 30px;
}

.header-container {
  width: 100%;
  max-width: 1000px;
  background: #5bb9cd;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.main-container {
  width: 100%;
  max-width: 1000px;
  background: #4fbfcb;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* ------------------- Responsive Design ------------------- */

/* Large screens: Desktop and tablets above 1200px */
@media (max-width: 1200px) {
  .header-container,
  .main-container {
    max-width: 90%;
    padding: 15px;
  }

  .index-page {
    padding: 15px;
    gap: 25px;
  }
}

/* Tablets (Portrait Mode) */
@media (max-width: 768px) {
  .header-container,
  .main-container {
    max-width: 100%;
    padding: 10px;
  }

  .index-page {
    padding: 10px;
    gap: 20px;
  }
}

/* Small Phones and Smaller Devices */
@media (max-width: 480px) {
  .header-container,
  .main-container {
    max-width: 100%;
    padding: 5px;
  }

  .index-page {
    padding: 5px;
    gap: 15px;
  }

  /* Adjustments for smaller devices */
  .header-container,
  .main-container {
    max-width: 100%;
  }
}

/* Vertical Phones (Up to 430px width, portrait mode) */
@media (max-width: 430px) {
  .header-container,
  .main-container {
    max-width: 100%;
    padding: 5px;
  }

  .index-page {
    padding: 5px;
    gap: 10px;
  }

  /* Ensure the content doesn't overflow and is stacked */
  .header-container,
  .main-container {
    width: 100%;
  }

  /* Adjust margins for smaller screen */
  .header-container {
    margin-bottom: 10px;
  }

  .main-container {
    margin-top: 10px;
  }
}

/* Very Small Phones (Portrait Mode - 415x915) */
@media (max-width: 415px) {
  .header-container,
  .main-container {
    padding: 5px;
  }

  .index-page {
    padding: 5px;
    gap: 5px;
  }

  /* Make sure the layout is stacked and doesn't overflow */
  .header-container,
  .main-container {
    width: 100%;
    max-width: 100%;
  }

  /* Reduce font size and paddings for compact phones */
  .header-container {
    padding: 8px;
  }

  .main-container {
    padding: 12px;
  }

  /* Flex layout for cards */
  .card-container {
    flex-direction: column;
  }

  .comment-card {
    flex: 1 1 100%;
    margin-bottom: 15px;
  }
}
</style>
