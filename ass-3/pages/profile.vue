<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import { usePosts } from '~/composables/usePosts';

const { user, fetchUser, logout, removeFavorite, addFavorite } = useAuth();
const { posts, fetchPosts, createPost, updatePost, deletePost } = usePosts();

const router = useRouter();
const name = ref('');
const email = ref('');
const age = ref('');
const avatar = ref('');
const topic = ref('');
const rating = ref('');
const commentary = ref('');
const pubDate = ref('');
const isEditing = ref(false);
const modalMessage = ref('');
const modalType = ref('');
const showModal = ref(false);

const newPostTitle = ref('');
const newPostContent = ref('');
const editingPostId = ref(null);
const editingPostTitle = ref('');
const editingPostContent = ref('');

const openModal = (message, type) => {
  modalMessage.value = message;
  modalType.value = type;
  showModal.value = true;

  setTimeout(() => {
    showModal.value = false;
  }, 3000);
};

onMounted(async () => {
  if (!user.value) {
    await fetchUser();
    if (!user.value) {
      alert('Please log in again.');
      router.push('/login');
    }
  }
  await fetchPosts();
});

watchEffect(() => {
  if (user.value) {
    name.value = user.value.name || '';
    email.value = user.value.email || '';
    age.value = user.value.age || '';
    avatar.value = user.value.avatar || 'default-avatar.png';
    topic.value = user.value.topic || '';
    rating.value = user.value.rating || '';
    commentary.value = user.value.commentary || '';
    pubDate.value = user.value.pubDate || '';
  }
});

const updateProfile = async () => {
  try {
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        age: age.value,
        avatar: avatar.value,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      user.value = data.user;
      alert('Profile updated successfully.');
      isEditing.value = false;
    } else {
      alert(data.error || 'Failed to update profile.');
    }
  } catch (error) {
    console.error('Profile update failed:', error);
    alert('An error occurred while updating the profile.');
  }
};

const handleEdit = () => (isEditing.value = true);
const cancelEdit = () => (isEditing.value = false);

const handleLogout = () => {
  logout();
  router.push('/login');
};

const goBack = () => {
  router.push('/');
};

const toggleFollowUser = async (personId) => {
  try {
    if (user.value?.favorites?.includes(personId)) {
      await removeFavorite(personId);
      openModal('User unfollowed successfully!', 'success');
    } else {
      await addFavorite(personId);
      openModal('User followed successfully!', 'success');
    }
  } catch (error) {
    console.error('Failed to toggle follow:', error);
    openModal('An error occurred. Please try again.', 'error');
  }
};

const isFollowing = (personId) =>
  computed(() => user.value?.favorites.includes(personId));

const followers = computed(() => {
  if (!user.value || !user.value.favorites) return [];
  return peopleData.filter((person) => user.value.favorites.includes(person.id));
});

const isFollowersDropdownOpen = ref(false);

const toggleFollowersDropdown = () => {
  isFollowersDropdownOpen.value = !isFollowersDropdown.value;
};

const goToFriendsPage = () => {
  router.push('/friends'); // Ensure this route matches the path to your friends page
};

const goToStatisticsPage = () => {
  router.push('/statistics'); // Ensure this route matches the path to your statistics page
};

// CRUD operations for posts
const createNewPost = async () => {
  if (!newPostTitle.value.trim() || !newPostContent.value.trim()) {
    alert('Title and content are required.');
    return;
  }

  await createPost(newPostTitle.value, newPostContent.value);
  newPostTitle.value = '';
  newPostContent.value = '';
  openModal('Post created successfully!', 'success');
};

const startEditingPost = (post) => {
  editingPostId.value = post.id;
  editingPostTitle.value = post.Title;
  editingPostContent.value = post.Content;
};

const savePost = async () => {
  if (!editingPostTitle.value.trim() || !editingPostContent.value.trim()) {
    alert('Title and content are required.');
    return;
  }

  await updatePost(editingPostId.value, editingPostTitle.value, editingPostContent.value);
  editingPostId.value = null;
  editingPostTitle.value = '';
  editingPostContent.value = '';
  openModal('Post updated successfully!', 'success');
};

const removePost = async (postId) => {
  await deletePost(postId);
  openModal('Post deleted successfully!', 'success');
};
</script>

<template>
  <div class="profile-page" v-if="user">
    <h2>My Profile</h2>
    <div v-if="!isEditing" class="profile-info card">
      <img :src="`/avatars/${avatar}`" alt="avatar" class="avatar" />
      <p><strong>Name:</strong> {{ name }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Age:</strong> {{ age }}</p>
      <p><strong>Topic:</strong> {{ topic }}</p>
      <p><strong>Current Rating:</strong> {{ rating }} ⭐</p>
      <p><strong>Commentary:</strong> {{ commentary }}</p>
      <p><strong>Published On:</strong> {{ pubDate }}</p>
      <button @click="handleEdit" class="btn btn-edit">Edit</button>
    </div>

    <form v-else @submit.prevent="updateProfile" class="profile-form card">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="age" type="number" placeholder="Age" min="0" required />
      <input v-model="avatar" type="text" placeholder="Avatar Filename" required />
      <button type="submit" class="btn btn-primary">Save</button>
      <button @click="cancelEdit" type="button" class="btn btn-secondary">Cancel</button>
    </form>

    <button @click="handleLogout" class="btn btn-secondary">Logout</button>
    <button @click="goBack" class="btn btn-back">Back to Main Page</button>

    <!-- Add a link to go to the friends page -->
    <button @click="goToFriendsPage" class="btn btn-primary">View Your Friends</button>

    <!-- Add a link to go to the statistics page -->
    <button @click="goToStatisticsPage" class="btn btn-primary">View Statistics</button>

    <h3>Your Posts</h3>
    <form @submit.prevent="createNewPost" class="post-form card">
      <input v-model="newPostTitle" type="text" placeholder="Post Title" required />
      <textarea v-model="newPostContent" placeholder="Post Content" required></textarea>
      <button type="submit" class="btn btn-primary">Create Post</button>
    </form>
    <ul class="posts-list">
      <li v-for="(post, index) in posts" :key="index" class="post-item card">
        <div v-if="editingPostId !== post.id">
          <strong>{{ post.Title }}</strong> - {{ post.Date }}
          <p>{{ post.Content }}</p>
          <button @click="startEditingPost(post)" class="btn btn-edit">Edit</button>
          <button @click="removePost(post.id)" class="btn btn-delete">Delete</button>
        </div>
        <div v-else>
          <input v-model="editingPostTitle" type="text" placeholder="Post Title" required />
          <textarea v-model="editingPostContent" placeholder="Post Content" required></textarea>
          <button @click="savePost" class="btn btn-primary">Save</button>
          <button @click="() => { editingPostId = null; editingPostTitle = ''; editingPostContent = ''; }" class="btn btn-secondary">Cancel</button>
        </div>
      </li>
    </ul>
  </div>

  <div v-else>
    <p>Loading profile... If this takes too long, please <a @click="handleLogout">log in again</a>.</p>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background: #f5f5f5;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2,
h3 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.profile-info,
.profile-form,
.post-item,
.favorite-item,
.post-form {
  margin-bottom: 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.profile-info p {
  margin: 10px 0;
  font-size: 16px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.btn-edit {
  background: #007bff;
  color: white;
}

.btn-edit:hover {
  background: #0056b3;
}

.btn-primary {
  background: #28a745;
  color: white;
}

.btn-primary:hover {
  background: #218838;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-back {
  background: #ffc107;
  color: white;
}

.btn-back:hover {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #007bff;
}

.posts-list,
.favorites-list {
  list-style: none;
  padding: 0;
}

.post-item,
.favorite-item {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.modal {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: #333;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: fadeInOut 3s forwards;
}

/* Success and error modal styles */
.success {
  background-color: #28a745;
  color: white;
}

.error {
  background-color: #dc3545;
  color: white;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }

  10%,
  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.btn-toggle {
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
  transition: background 0.3s ease;
}

.btn-toggle:hover {
  background-color: #138496;
}

/* Statistics section styles */
.statistics-section {
  margin-top: 20px;
}

.statistics-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.statistics-form label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

.statistics-results {
  margin-top: 20px;
  padding: 15px;
  background: #e9ecef;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.statistics-results p {
  margin: 10px 0;
  font-size: 16px;
  color: #333;
}

.no-statistics {
  margin-top: 20px;
  padding: 15px;
  background: #f8d7da;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #721c24;
  text-align: center;
}
</style>