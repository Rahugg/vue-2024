<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const { user, fetchUser, logout, removeFavorite, addFavorite, getFriends } = useAuth();
const router = useRouter();
const isEditing = ref(false);
const showModal = ref(false);
const modalMessage = ref('');
const modalType = ref('');

const friends = ref([]);
const editingFriendId = ref(null);
const newName = ref('');

// Modal open function
const openModal = (message, type) => {
  modalMessage.value = message;
  modalType.value = type;
  showModal.value = true;
  setTimeout(() => {
    showModal.value = false;
  }, 3000);
};

// Fetch the user and friends on mount
onMounted(async () => {
  if (!user.value) {
    await fetchUser();
    if (!user.value) {
      alert('Please log in again.');
      router.push('/login');
    }
  }
  // Fetch the friends only once the user is authenticated
  if (user.value) {
    friends.value = await getFriends();
  }
});

// Toggle follow/unfollow user
const toggleFollowUser = async (personId) => {
  try {
    if (user.value.favorites.includes(personId)) {
      await removeFavorite(personId);
      openModal('User unfollowed successfully!', 'success');
    } else {
      await addFavorite(personId);
      openModal('User followed successfully!', 'success');
    }
    // Refresh the friends list after action
    friends.value = await getFriends();
  } catch (error) {
    console.error('Failed to toggle follow:', error);
    openModal('An error occurred. Please try again.', 'error');
  }
};

// Check if the user is following a person
const isFollowing = (personId) => user.value?.favorites.includes(personId);

// Navigate back to profile
const goToProfile = () => {
  router.push('/profile');
};

// Navigate to chat
const navigateToChat = (friend) => {
  router.push({
    path: `/chat/${user.value.id}/${friend.id}`,
    query: {
      otherUserName: friend.PersonName,
    },
  });
};

// Start editing a friend's name
const startEditing = (friendId, currentName) => {
  editingFriendId.value = friendId;
  newName.value = currentName;
};

// Save the new name
const saveName = async (friendId) => {
  // Here you would typically send a request to the server to update the friend's name
  // For this example, we'll just update the local state
  const friend = friends.value.find(f => f.id === friendId);
  if (friend) {
    friend.PersonName = newName.value;
    openModal('Name updated successfully!', 'success');
  }
  editingFriendId.value = null;
};
</script>

<template>
  <div class="friends-page" v-if="user">
    <h2>Your Friends</h2>

    <div v-if="friends.length" class="friends-list">
      <ul>
        <li v-for="friend in friends" :key="friend.id" class="friend-item card">
          <div class="friend-info">
            <img :src="`/avatars/${friend.Avatar || 'default-avatar.png'}`" alt="avatar" class="avatar" />
            <div class="friend-details">
              <p v-if="editingFriendId !== friend.id"><strong>{{ friend.PersonName }}</strong></p>
              <input v-else v-model="newName" />
              <p>Email: {{ friend.email }}</p>
            </div>
          </div>
          <div class="friend-actions">
            <button 
              @click="toggleFollowUser(friend.id)" 
              :class="isFollowing(friend.id) ? 'btn-unfollow' : 'btn-follow'"
            >
              {{ isFollowing(friend.id) ? 'Unfollow' : 'Follow' }}
            </button>
            <button @click="navigateToChat(friend)" class="btn-chat">Chat</button>
            <button v-if="editingFriendId !== friend.id" @click="startEditing(friend.id, friend.PersonName)" class="btn-rename">Rename</button>
            <button v-else @click="saveName(friend.id)" class="btn-save">Save</button>
          </div>
        </li>
      </ul>
    </div>

    <p v-else>
      You have no friends yet. <a @click="goToFriendsPage">Follow some people!</a>
    </p>

    <!-- Modal for success/error messages -->
    <div v-if="showModal" :class="['modal', modalType]">
      <p>{{ modalMessage }}</p>
    </div>

    <!-- Go Back to Profile button -->
    <button class="btn-back" @click="goToProfile">Go Back to Profile</button>
  </div>

  <!-- If user is not loaded yet, show loading state -->
  <div v-else>
    <p>Loading your friends... If this takes too long, please <a @click="handleLogout">log in again</a>.</p>
  </div>
</template>

<style scoped>
.friends-page {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background: #f5f5f5;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.friends-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
}

.friend-item {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.friend-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.friend-details {
  flex: 1;
}

.friend-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-follow {
  background-color: #28a745;
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
  background-color: #dc3545;
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

.btn-chat {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-chat:hover {
  background-color: #0056b3;
}

.btn-rename {
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-rename:hover {
  background-color: #e0a800;
}

.btn-save {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-save:hover {
  background-color: #218838;
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

.modal.success {
  background-color: #28a745;
  color: white;
}

.modal.error {
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

.btn-back {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-back:hover {
  background-color: #0056b3;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .friends-page {
    width: 90%;
  }

  .avatar {
    width: 45px;
    height: 45px;
  }

  .friend-item {
    padding: 12px;
  }

  .btn-follow,
  .btn-unfollow,
  .btn-chat,
  .btn-rename,
  .btn-save {
    padding: 8px 16px;
  }

  .btn-back {
    padding: 8px 16px;
  }
}

@media (max-width: 768px) {
  .friends-page {
    width: 100%;
    padding: 15px;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .friend-item {
    padding: 10px;
  }

  .btn-follow,
  .btn-unfollow,
  .btn-chat,
  .btn-rename,
  .btn-save {
    padding: 6px 12px;
  }

  .btn-back {
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .friends-page {
    width: 100%;
    padding: 10px;
  }

  .avatar {
    width: 35px;
    height: 35px;
  }

  .friend-item {
    padding: 8px;
  }

  .btn-follow,
  .btn-unfollow,
  .btn-chat,
  .btn-rename,
  .btn-save {
    padding: 5px 10px;
  }

  .btn-back {
    padding: 5px 10px;
  }
}
</style>