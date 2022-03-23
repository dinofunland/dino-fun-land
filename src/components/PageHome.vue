<template>
  <div class="container">
      <h1 class="title">DINO FUN LAND</h1>
      <router-link to="/dino-jump" class="link">Play Dino Jump &#8594</router-link>
      <!--<router-link to="/dino-jump-demo">Go To Dino Jump Demo &#8594</router-link>-->
  </div>
</template>
<script setup lang="ts">
</script>
<style>
.title {
  font-size: clamp(3rem, 10vw, 10rem);
  text-shadow: 7px 7px #473b78;
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
.link {
    border: 1px solid;
    padding: 10px;
    transform: scale(2)
}

@media screen and (max-width: 8000px) {
  .title {
    text-shadow: 5px 5px #473b78;
  }
}
</style>