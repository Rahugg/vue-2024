<template>
  <div class="main">
    <div class="main-container">
      <div class="top-section">
        <div class="date-display">28.09.2024</div>
        <div class="selected-topic">{{ selectedTopic }}</div>
      </div>

      <div class="filter-pagination">
        <div class="filter">
          <img src="@/assets/filter-icon.png" alt="filter icon" class="filter-icon" />
          <select v-model="sortType" @change="sortComments">
            <option value="" disabled>Rating</option>
            <option value="rating">Sort by Rating</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
        <div class="pagination">
          <button class="arrow-button" @click="prevPage">←</button>
          <span>{{ currentPage }}/{{ totalPages }}</span>
          <button class="arrow-button" @click="nextPage">→</button>
        </div>
      </div>

      <div class="comments-section">
        <AssignmentCard v-for="(comment, index) in paginatedComments" :key="index" :comment="comment"
          @likeClicked="increaseRating" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, inject, reactive } from 'vue';
import AssignmentCard from '../components/AssignmentCard.vue';
import { peopleData } from '../entities/people';

const currentPage = ref(1);
const itemsPerPage = 4;
const sortType = ref('');
const selectedTopic = inject('selectedTopic');
const people = reactive([...peopleData]);

watch([selectedTopic, sortType], () => {
  currentPage.value = 1;
});

const filteredComments = computed(() =>
  people.filter(person => person.Topic === selectedTopic.value)
);

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
  const foundComment = people.find(person => person.id === comment.id);
  if (foundComment) {
    const increment = foundComment.Rating < 3 ? 0.2 : 0.1;
    foundComment.Rating = Math.min(parseFloat((foundComment.Rating + increment).toFixed(1)), 5.0);
  }
};

const sortedComments = computed(() => {
  const comments = [...filteredComments.value];
  if (sortType.value === 'rating') {
    return comments.sort((a, b) => b.Rating - a.Rating);
  } else if (sortType.value === 'date') {
    return comments.sort((a, b) => new Date(b.PubDate) - new Date(a.PubDate));
  }
  return comments;
});

const sortComments = () => {
  currentPage.value = 1;
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
}

.main-container {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 1000px;
  align-items: center;
  padding: 20px;
  background: #e3f2fd;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.date-display,
.selected-topic {
  background: #4fbfcb;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 24px;
  color: white;
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
  background: #e0f7fa;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
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
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin: 0 10px;
}

.comments-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>