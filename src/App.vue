<template>
  <router-view :key="$route.path" />
  <BackgroundElements />
</template>
<script setup lang="ts">import { defineAsyncComponent } from 'vue';

const BackgroundElements = defineAsyncComponent(() => import('./components/BackgroundElements.vue'))
</script>