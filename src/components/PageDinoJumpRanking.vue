<template>
    <div class="page">
        <div class="container">
            <div class="heading">Ranking Dino Jump</div>
            <RankingList :list="ranking" />
        </div>
    </div>
    <BackToHome />
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';

const BackToHome = defineAsyncComponent(() => import('./ButtonBackToHome.vue'))
const RankingList = defineAsyncComponent(() => import('./RankingList.vue'))

const mockData = [
    {
        id: '234234',
        rank: 1,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    },
    {
        id: '234234',
        rank: 2,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    },
    {
        id: '234234',
        rank: 3,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    },
    {
        id: '234234',
        rank: 4,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    },
    {
        id: '234234',
        rank: 5,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    },
    {
        id: '234234',
        rank: 6,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    },
    {
        id: '234234',
        rank: 7,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    },
    {
        id: '234234',
        rank: 8,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    },
    {
        id: '234234',
        rank: 9,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    },
    {
        id: '234234',
        rank: 10,
        score: 234543,
        players: ['Wenish', 'Leeroy']
    }
]

const ranking = ref<Array<{
    id: string,
    rank: number,
    score: number,
    players: string[]
}>>(mockData)

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
    max-width: calc(100% - 4rem);
}
</style>