<script setup>
import { computed } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

const props = defineProps({
  comment: { type: Object, required: true },
});
const emit = defineEmits(['likeClicked']);

const { user } = useAuth();
const router = useRouter();

// Check if the user is authenticated before accessing their data
const isAuthenticated = computed(() => user.value !== null);

const isFavorite = computed(() =>
  isAuthenticated.value && user.value.favorites.includes(props.comment.id)
);

const fullStars = computed(() => Math.floor(props.comment.Rating));
const hasHalfStar = computed(() => props.comment.Rating % 1 >= 0.5);
const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));

const avatarSrc = computed(() => `/avatars/${props.comment.Avatar}`);

const likeComment = () => emit('likeClicked', props.comment);

const navigateToChat = () => {
  if (isAuthenticated.value) {
    router.push({
      path: `/chat/${user.value.id}/${props.comment.id}`,
      query: {
        otherUserName: props.comment.PersonName,
      },
    });
  } else {
    router.push('/login'); // Redirect to login if not authenticated
  }
};
</script>

<template>
  <div class="comment-card">
    <div class="card-header">
      <img :src="avatarSrc" alt="avatar" class="avatar" />
      <div class="comment-details">
        <h4>
          <nuxt-link :to="`/user/${comment.id}`">{{ comment.PersonName }}</nuxt-link>
        </h4>
        <button v-if="isAuthenticated" @click="navigateToChat">Chat</button>
        <p v-else>Please log in to start a chat.</p>
        <p>{{ comment.PubDate }}</p>
        <div class="rating">
          <img v-for="star in fullStars" :key="'full-' + star" src="/star.png" alt="star" class="star" />
          <div v-if="hasHalfStar" class="half-star-wrapper">
            <img src="/star.png" alt="half-star" class="half-star" />
          </div>
          <img v-for="star in emptyStars" :key="'empty-' + star" src="/empty-star.png" alt="empty-star" class="star" />
        </div>
      </div>
    </div>
    <p class="comment-text">{{ comment.Commentary }}</p>
    <button v-if="isAuthenticated" class="like-button" @click="likeComment">LIKE</button>
    <p v-else>Log in to like this comment.</p>
  </div>
</template>

<style scoped>
.comment-card {
  width: 100%;
  max-width: 350px;
  padding: 20px;
  background: #5bb9cd;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.comment-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-details {
  flex: 1;
}

h4 {
  margin: 0;
  font-size: 18px;
}

p {
  margin: 5px 0;
  color: #555;
}

.rating {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.star {
  width: 20px;
  height: 20px;
}

.half-star-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
  overflow: hidden;
  background-image: url('/empty-star.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.half-star {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
  clip-path: inset(0 50% 0 0);
  z-index: 1;
}

.comment-text {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.like-button,
.save-button {
  background: #33cc66;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.like-button:hover {
  background-color: #28a745;
}

.save-button {
  background-color: #ffcc00;
}

.save-button:hover {
  background-color: #ff9900;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .comment-card {
    max-width: 300px;
  }

  .avatar {
    width: 45px;
    height: 45px;
  }

  .star,
  .half-star-wrapper,
  .half-star {
    width: 18px;
    height: 18px;
  }

  .like-button,
  .save-button {
    padding: 8px 16px;
  }
}

@media (max-width: 768px) {
  .comment-card {
    max-width: 100%;
    padding: 15px;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .star,
  .half-star-wrapper,
  .half-star {
    width: 16px;
    height: 16px;
  }

  .like-button,
  .save-button {
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .comment-card {
    max-width: 100%;
    padding: 10px;
  }

  .avatar {
    width: 35px;
    height: 35px;
  }

  .star,
  .half-star-wrapper,
  .half-star {
    width: 14px;
    height: 14px;
  }

  .like-button,
  .save-button {
    padding: 5px 10px;
  }
}

/* Vertical Phones (max-width: 415px and 430px) */
@media (max-width: 430px) {
  .comment-card {
    max-width: 100%;
    padding: 8px;
  }

  .avatar {
    width: 30px;
    height: 30px;
  }

  .star,
  .half-star-wrapper,
  .half-star {
    width: 12px;
    height: 12px;
  }

  .like-button,
  .save-button {
    padding: 4px 8px;
  }

  .comment-text {
    font-size: 14px;
  }
}
</style>
