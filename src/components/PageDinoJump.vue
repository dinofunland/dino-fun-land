<template>
    <div class="container">
        <iframe
            src="https://practical-borg-def877.netlify.app/"
            title="Dino Jump Game"
            allowfullscreen
            scrolling="no"
        ></iframe>
    </div>
  <BackToHome />
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const BackToHome = defineAsyncComponent(() => import('./ButtonBackToHome.vue'))
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
}

iframe {
    width: calc(100vw - 5px);
    height: calc(100vh - 5px);
    border: none;
    overflow: hidden;
    margin: auto;
}
</style>