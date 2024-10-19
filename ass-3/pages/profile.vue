<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import peopleData from '@/assets/people.js';

const { user, fetchUser, logout, removeFavorite, addFavorite } = useAuth();
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

const openModal = (message, type) => {
  modalMessage.value = message;
  modalType.value = type;
  showModal.value = true;

  setTimeout(() => {
    showModal.value = false; // Hide modal after 3 seconds
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
    const response = await $fetch('/api/user', {
      method: 'PUT',
      body: {
        name: name.value,
        email: email.value,
        age: age.value,
        avatar: avatar.value,
      },
    });
    user.value = response.user;
    alert('Profile updated successfully.');
    isEditing.value = false; // Exit edit mode
  } catch (error) {
    console.error('Profile update failed:', error);
    alert('Failed to update profile.');
  }
};

const handleEdit = () => (isEditing.value = true); // Enter edit mode
const cancelEdit = () => (isEditing.value = false); // Exit edit mode without saving

const handleLogout = () => {
  logout();
  router.push('/login');
};

const goBack = () => {
  router.push('/');
};

const toggleFollowUser = async (personId) => {
  try {
    if (user.value.favorites.includes(personId)) {
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


const userPosts = computed(() =>
  peopleData.find((person) => person.id === user.value?.id)?.Posts || []
);

const isFollowersDropdownOpen = ref(false);

const toggleFollowersDropdown = () => {
  isFollowersDropdownOpen.value = !isFollowersDropdownOpen.value;
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

    <h3>Your Posts</h3>
    <ul class="posts-list">
      <li v-for="(post, index) in userPosts" :key="index" class="post-item card">
        <strong>{{ post.Title }}</strong> - {{ post.Date }}
        <p>{{ post.Content }}</p>
      </li>
    </ul>

    <h3>
      Your Followings
      <button @click="toggleFollowersDropdown" class="btn btn-toggle">
        {{ isFollowersDropdownOpen ? 'Hide' : 'Show' }}
      </button>
    </h3>
    <ul v-if="isFollowersDropdownOpen && followers.length" class="followers-list">
      <li v-for="follower in followers" :key="follower.id" class="follower-item card">
        <p><strong>{{ follower.PersonName }}</strong></p>
        <img :src="`/avatars/${follower.Avatar || 'default-avatar.png'}`" alt="avatar" class="avatar"
          @error="handleImageError" />
        <p>Email: {{ follower.email }}</p>
      </li>
    </ul>
    <p v-else-if="isFollowersDropdownOpen"><h1>No followers yet.</h1></p>


    <h3>Follow Other Users</h3>
<ul class="favorites-list">
  <li v-for="person in peopleData" :key="person.id" class="favorite-item card">
    {{ person.PersonName }}
    <button 
      @click="toggleFollowUser(person.id)" 
      :class="isFollowing(person.id).value ? 'btn-unfollow' : 'btn-follow'">
      {{ isFollowing(person.id).value ? 'Unfollow' : 'Follow' }}
    </button>
  </li>
</ul>


  </div>

  <div v-if="showModal" :class="['modal', modalType]">
    <p>{{ modalMessage }}</p>
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
.favorite-item {
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

.btn-follow {
  background-color: #28a745; /* Green */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-follow:hover {
  background-color: #218838;
}

.btn-unfollow {
  background-color: #dc3545; /* Red */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-unfollow:hover {
  background-color: #c82333;
}


input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input:focus {
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
</style>