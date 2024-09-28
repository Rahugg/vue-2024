<template>
    <div class="comment-card">
        <div class="card-header">
            <img :src="require(`../assets/${comment.Avatar}`)" alt="avatar" class="avatar" />
            <div class="comment-details">
                <h4>{{ comment.PersonName }}</h4>
                <p>{{ comment.PubDate }}</p>
                <div class="rating">
                    <img v-for="star in 5" :key="star"
                        :src="star <= Math.floor(comment.Rating) ? require('../assets/star.png') : require('../assets/empty-star.png')"
                        alt="star" class="star" />
                </div>
            </div>
        </div>
        <p class="comment-text">{{ comment.Commentary }}</p>
        <button class="like-button" @click="likeComment">LIKE</button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['likeClicked']);

const likeComment = () => {
  emits('likeClicked', props.comment);
};
</script>

<style scoped>
.comment-card {
    width: 350px;
    padding: 20px;
    background: #5BB9CD;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
    margin: 5px 0 0;
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

.comment-text {
    margin-bottom: 20px;
}

.like-button {
    background: #33cc66;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}
</style>