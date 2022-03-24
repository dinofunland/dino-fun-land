<template>
    <div class="ranking-list-item">
        <span>#{{ props.rank }} [{{ props.score }}] </span>
        <span v-for="(player, index) in players">
            <span>{{ player }}</span>
            <span v-if="players?.length != index + 1">, </span>
        </span>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    rank: Number,
    score: Number,
    players: Array as PropType<Array<string>>
})
</script>
<style scoped>
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