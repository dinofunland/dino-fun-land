<template>
    <div class="page">
        <div class="container">
            <div class="heading">Ranking Dino Jump</div>
            <Suspense>
                <template #default>
                    <RankingList />
                </template>
                <template #fallback>Loading &bull; &bull; &bull;</template>
            </Suspense>
        </div>
    </div>
    <BackToHome />
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const BackToHome = defineAsyncComponent(() => import('../components/ButtonBackToHome.vue'))
const RankingList = defineAsyncComponent(() => import('../components/RankingList.vue'))
</script>
<style scoped>
.page {
    height: calc(100% - 2rem);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.heading {
    font-size: clamp(1.4rem, 3vw, 2.4rem);
    padding-bottom: 1.5rem;
}

.container {
    background-color: #80366b;
    padding: 2rem;
    max-width: 45ch;
}
</style>