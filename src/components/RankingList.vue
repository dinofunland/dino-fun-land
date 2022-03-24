<template>
    <div class="ranking-list">
        <RankingListItem v-for="item in props.list" :key="item.id" :rank="item.rank" :score="item.score" :players="item.players" />
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, PropType } from 'vue';

const props = defineProps({
    list: Array as PropType<Array<{
        id: string,
        rank: number,
        score: number,
        players: string[]
    }>>
})

const RankingListItem = defineAsyncComponent(() => import('./RankingListItem.vue'))
</script>