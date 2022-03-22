<template>
  <div class="container">
      <h1 class="title">DINO FUN LAND</h1>
      <router-link to="/dino-jump">Go To Dino Jump</router-link>
      <router-link to="/dino-jump-demo">Go To Dino Jump Demo</router-link>
  </div>
</template>
<script setup lang="ts">
</script>
<style>
.title {
  font-size: 3rem;
}
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
</style>