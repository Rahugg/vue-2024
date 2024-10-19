<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);
const emit = defineEmits(['updateTopic']);
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const goToProfile = () => router.push('/profile');

const selectTopic = (topic) => {
  isMenuOpen.value = false;
  emit('updateTopic', topic);
};
</script>

<template>
  <div class="header">
    <button id="header-burger-btn" @click="toggleMenu">
      <img src="/burger.png" width="51" height="51" alt="Menu" />
    </button>
    <button id="header-profile-btn" @click="goToProfile">
      <img src="/profile.png" width="51" height="51" alt="Profile" />
    </button>
  </div>

  <div class="overlay" v-if="isMenuOpen" @click="toggleMenu"></div>

  <div class="sidebar" :class="{ open: isMenuOpen }">
    <button class="close-btn" @click="toggleMenu">×</button>
    <ul class="menu-list">
      <li class="menu-item" @click="selectTopic('ADVENTURE BLOG')">
        ADVENTURE BLOG
      </li>
      <li class="menu-item" @click="selectTopic('NATURE BLOG')">
        NATURE BLOG
      </li>
      <li class="menu-item" @click="selectTopic('FASHION BLOG')">
        FASHION BLOG
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  border-radius: 10px 10px 0 0;
  width: 95%;
  height: 80px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

#header-burger-btn,
#header-profile-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  transition: background-color 0.3s;
}

#header-burger-btn:hover,
#header-profile-btn:hover {
  background-color: rgba(126, 239, 255, 0.3);
}

.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background: #e6f9ff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}

.sidebar.open {
  left: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #333;
  position: absolute;
  top: 10px;
  right: 10px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin-top: 40px;
}

.menu-item {
  padding: 15px;
  font-size: 18px;
  background-color: #4fbfcb;
  color: white;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #36a9b2;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
}
</style>
