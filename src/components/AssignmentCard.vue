<template>
    <div class="comment-card">
        <div class="card-header">
            <img :src="require(`../assets/${comment.Avatar}`)" alt="avatar" class="avatar" />
            <div class="comment-details">
                <h4>{{ comment.PersonName }}</h4>
                <p>{{ comment.PubDate }}</p>
                <div class="rating">
                    <img v-for="star in fullStars" :key="'full-' + star" src="../assets/star.png" alt="star" class="star" />
                    <div v-if="hasHalfStar" class="half-star-wrapper">
                        <img src="../assets/star.png" alt="half-star" class="half-star" />
                    </div>
                    <img v-for="star in emptyStars" :key="'empty-' + star" src="../assets/empty-star.png" alt="empty-star" class="star" />
                </div>
            </div>
        </div>
        <p class="comment-text">{{ comment.Commentary }}</p>
        <button class="like-button" @click="likeComment">LIKE</button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

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

const fullStars = computed(() => Math.floor(props.comment.Rating));
const hasHalfStar = computed(() => props.comment.Rating % 1 >= 0.5);
const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));
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

.half-star-wrapper {
    position: relative;
    width: 20px; 
    height: 20px; 
    overflow: hidden;
    background-image: url('../assets/empty-star.png'); 
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
