<template>
  <div class="create-post">
    <h2>Create a New Post</h2>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="title" type="text" id="title" required />
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input v-model="date" type="date" id="date" required />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea v-model="content" id="content" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Create Post</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import peopleData from '@/assets/people.js';

const title = ref('');
const date = ref('');
const content = ref('');
const router = useRouter();

const submitPost = () => {
  const newPost = {
    Title: title.value,
    Date: date.value,
    Content: content.value,
  };

  // Assuming the current user is the first person in the peopleData array
  const currentUser = peopleData[0];
  currentUser.Posts.push(newPost);

  // Redirect to the profile page or any other page
  router.push('/profile');
};
</script>

<style scoped>
.create-post {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #007bff;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #28a745;
  color: white;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #218838;
}
</style>