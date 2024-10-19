<script setup>
import { ref, computed, watch } from 'vue';
import AssignmentCard from '@/components/AssignmentCard.vue';
import peopleData from '@/assets/people.js';

const props = defineProps({
  selectedTopic: {
    type: String,
    required: true,
  },
});

const currentPage = ref(1);
const itemsPerPage = 4;
const sortType = ref('');
const people = ref([...peopleData]);

watch([() => props.selectedTopic, sortType], () => {
  currentPage.value = 1;
});

const filteredComments = computed(() =>
  people.value.filter(person => person.Topic === props.selectedTopic)
);

const sortedComments = computed(() => {
  const comments = [...filteredComments.value];
  if (sortType.value === 'rating') {
    return comments.sort((a, b) => b.Rating - a.Rating);
  } else if (sortType.value === 'date') {
    return comments.sort((a, b) => new Date(b.PubDate) - new Date(a.PubDate));
  }
  return comments;
});

const totalPages = computed(() =>
  Math.ceil(sortedComments.value.length / itemsPerPage)
);

const paginatedComments = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return sortedComments.value.slice(startIndex, startIndex + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const increaseRating = (comment) => {
  const foundComment = people.value.find(person => person.id === comment.id);
  if (foundComment) {
    const increment = foundComment.Rating < 3 ? 0.2 : 0.1;
    foundComment.Rating = Math.min(parseFloat((foundComment.Rating + increment).toFixed(1)), 5.0);
  }
};

const sortComments = () => {
  currentPage.value = 1;
};
</script>

<template>
  <div class="main">
    <div class="main-container">
      <div class="top-section">
        <div class="date-display">{{ new Date().toLocaleDateString() }}</div>
        <div class="selected-topic">{{ selectedTopic }}</div>
      </div>

      <div class="filter-pagination">
        <div class="filter">
          <img src="/filter-icon.png" alt="filter icon" class="filter-icon" />
          <select v-model="sortType" @change="sortComments">
            <option value="" disabled>Select Sort Option</option>
            <option value="rating">Sort by Rating</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
        <div class="pagination">
          <button class="arrow-button" @click="prevPage" :disabled="currentPage === 1">←</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button class="arrow-button" @click="nextPage" :disabled="currentPage === totalPages">→</button>
        </div>
      </div>

      <div class="comments-section">
        <AssignmentCard
          v-for="(comment, index) in paginatedComments"
          :key="index"
          :comment="comment"
          @likeClicked="increaseRating"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.main-container {
  margin-top: 50px;
  width: 1000px;
  padding: 20px;
  background: #e3f2fd;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-section {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.date-display,
.selected-topic {
  background: #4fbfcb;
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  font-size: 24px;
  text-align: center;
}

.filter-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.filter {
  display: flex;
  align-items: center;
}

.filter select {
  margin-left: 10px;
  padding: 8px;
  border-radius: 5px;
  border: none;
  background: #e0f7fa;
  cursor: pointer;
}

.filter select:focus {
  outline: 2px solid #007bff;
}

.filter-icon {
  width: 20px;
  height: 20px;
}

.pagination {
  display: flex;
  align-items: center;
}

.arrow-button {
  font-size: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  transition: color 0.3s;
}

.arrow-button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.arrow-button:not(:disabled):hover {
  color: #007bff;
}

.comments-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
}
</style>
