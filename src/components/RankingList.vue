<template>
    <div class="ranking-list">
        <RankingListItem v-for="item in ranking" :key="item.id" :rank="item.rank" :score="item.score" :players="item.players" />
    </div>
</template>
<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { defineAsyncComponent, ref } from 'vue';
const RankingListItem = defineAsyncComponent(() => import('./RankingListItem.vue'))

const ranking = ref<Array<{
    id: string,
    rank: number,
    score: number,
    players: string[]
}>>([])

const url = ref('https://firestore.googleapis.com/v1/projects/dino-fun-land/databases/(default)/documents/scores?orderBy=score desc&pageSize=10')

const { execute } = useFetch(url, {
    immediate: false,
    afterFetch(ctx) {
        const documents = ctx?.data?.documents
        console.log(ctx.data.documents)
        if (documents) {
            ranking.value = documents?.map((obj: any, index: number) => {
                const players = obj?.fields?.players?.arrayValue?.values?.map((obj: any) => {
                    return obj?.stringValue
                })
                return {
                    id: obj?.name,
                    rank: index + 1,
                    score: parseInt(obj?.fields?.score?.integerValue),
                    players
                }
            })
        }
        return ctx
    },
}).get().json()

await execute()
</script>