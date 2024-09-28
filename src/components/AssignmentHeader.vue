<template>
    <div>
        <div class="header">
            <button id="header-burger-btn" @click="toggleMenu">
                <img src="../assets/burger.png" width="51px" height="51px" />
            </button>
            <div class="header-bg">
                <p class="header-bg-txt">New trips on Fall Season! Full details on our Instagram accounts.</p>
            </div>
            <button id="header-profile-btn">
                <img src="../assets/profile.png" width="51px" height="51px" />
            </button>
        </div>
        <div class="sidebar" :class="{ open: isMenuOpen }">
            <button class="close-btn" @click="toggleMenu">×</button>
            <div class="menu-header">MENU</div>
            <ul class="menu-list">
                <li class="menu-item" @click="selectTopic('ADVENTURE BLOG')">ADVENTURE BLOG</li>
                <li class="menu-item" @click="selectTopic('NATURE BLOG')">NATURE BLOG</li>
                <li class="menu-item" @click="selectTopic('FASHION BLOG')">FASHION BLOG</li>
                <li class="menu-item" @click="selectTopic('MODERN BLOG')">MODERN BLOG</li>
                <li class="menu-item" @click="selectTopic('SPORT BLOG')">SPORT BLOG</li>
            </ul>
            <div class="contacts">
                <h4>CONTACTS</h4>
                <p>PHONE: +1(234)-23-45-22</p>
                <p>ADDRESS: Green st., Yallow park</p>
                <p>EMAIL: Yallow@park.info</p>
            </div>
        </div>
        <div class="overlay" v-if="isMenuOpen" @click="toggleMenu"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { inject } from 'vue';
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};


const updateTopic = inject('updateTopic');

const selectTopic = (topic) => {
    isMenuOpen.value = false;
    updateTopic(topic);
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #f5f5f5;
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 100%;
}

#header-burger-btn {
    background-color: #f5f5f5;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    padding: 10px;
    margin: 0;
    transition: 0.3s;
}

.header-bg {
    background: linear-gradient(90deg, #e5f67c 0%, #ecef64 33%, #d2e037 66%, #eaee3a 100%);
    width: 808px;
    height: 45px;
    gap: 0px;
    border-radius: 10px;
    opacity: 0px;
}

.header-bg-txt {
    text-align: center;
    font-size: 17px;
    background: linear-gradient(90deg, #ffadad 0%, #ff774c 100%);
    font-weight: 400;
    font-family: Inknut Antiqua;
    font-weight: 700;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

#header-profile-btn {
    background: rgba(126, 239, 255, 1);
    border: none;
    cursor: pointer;
    border-radius: 50%;
    padding: 10px;
    margin: 0;
    transition: 0.3s;
}

.sidebar {
    position: fixed;
    top: 0;
    left: -500px;
    width: 300px;
    height: 100%;
    background: #e6f9ff;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    transition: left 0.3s ease;
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

.menu-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.menu-list {
    list-style: none;
    padding: 0;
}

.menu-item {
    padding: 10px 0;
    font-size: 18px;
    cursor: pointer;
    background-color: #4fbfcb;
    margin-bottom: 10px;
    text-align: center;
    color: white;
    border-radius: 5px;
}

.menu-item:hover {
    background-color: #36a9b2;
}

.contacts {
    margin-top: 20px;
    font-size: 16px;
    text-align: center;
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