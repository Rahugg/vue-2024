<template>
    <div>
        <div class="header">
            <button id="header-burger-btn"><img src="../assets/burger.png" width="51px" height="51px" /></button>
            <div class="header-bg">
                <p class="header-bg-txt">New trips on Fall Season! Full details on our Instagram accounts.</p>
            </div>
            <button id="header-profile-btn"> <img src="../assets/profile.png" width="51px" height="51px" /></button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #F5F5F5;
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 100%;
}

#header-burger-btn{
    background-color: #F5F5F5;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    padding: 10px;
    margin: 0;
    transition: 0.3s;
}

.header-bg {
    background: linear-gradient(90deg, #E5F67C 0%, #ECEF64 33%, #D2E037 66%, #EAEE3A 100%);
    width: 808px;
    height: 45px;
    gap: 0px;
    border-radius: 10px;
    opacity: 0px;
}

.header-bg-txt {
    text-align: center;
    font-size: 17px;
    background: linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
    font-weight: 400;
    font-family: Inknut Antiqua;
    font-weight: 700;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

#header-profile-btn{
    background: rgba(126, 239, 255, 1);
    border: none;
    cursor: pointer;
    border-radius: 50%;
    padding: 10px;
    margin: 0;
    transition: 0.3s;
}

</style>