<template>
<div class="container">
    <div class="element element1"></div>
    <div class="element element2"></div>
    <div class="element element3"></div>

    <div class="element element4"></div>
    <div class="element element5"></div>
    <div class="element element6"></div>
</div>
</template>
<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    pointer-events: none;
    z-index: -1;
}
.element {
    background-color: #5a265e;
    position: absolute;
    clip-path: polygon(90% 0, 100% 0%, 10% 100%, 0% 100%);
    width: 400px;
    height: 400px;
}

.element1 {
    bottom: -160px;
    left: -180px;
}
.element2 {
    bottom: -80px;
    left: -40px;
}

.element3 {
    bottom: -260px;
    left: -130px;  
}

.element4 {
    top: -260px;
    right: -140px;
}

.element5 {
    top: -120px;
    right: -80px;
}

.element6 {
    top: -160px;
    right: -180px;
}
</style>