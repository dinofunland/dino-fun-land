<template>
    <div class="page">
        <div class="container">
            <div class="heading">Ranking Dino Jump</div>
            <div class="ranking-list">
                <div
                    class="ranking-list-item"
                >#1 [324234] Wenish, Leeroy, Jude, bimbo, merlin, thahah</div>
                <div class="ranking-list-item">#2 [31455] Merlin</div>
                <div class="ranking-list-item">#3 [31455] Merlin</div>
                <div class="ranking-list-item">#4 [31455] Merlin</div>
                <div class="ranking-list-item">#5 [31455] Merlin</div>
                <div
                    class="ranking-list-item"
                >#6 [31455] Merlisergseriguhseprg9uhsepori9guhspeor9iughspei9rughspeirughspeor9ughsopergu89ihn</div>
                <div class="ranking-list-item">#7 [31455] Merlin</div>
                <div class="ranking-list-item">#8 [31455] Merlin</div>
                <div class="ranking-list-item">#9 [31455] Merlin</div>
                <div class="ranking-list-item">#10 [31455] Merlin</div>
            </div>
        </div>
    </div>
    <BackToHome />
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const BackToHome = defineAsyncComponent(() => import('./ButtonBackToHome.vue'))

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

.ranking-list-item {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    max-width: 45ch;
    word-wrap: break-word;
    overflow: hidden;
    font-size: 1.2rem;
    line-height: 1.4rem;
}
</style>