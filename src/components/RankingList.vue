<template>
    <div class="ranking-list">
        <div class="player-count-filter">
            <RankingListFilter v-for="index in 4" :key="index" :isActive="playerCountFilter == index"
                @click="loadRankList(index)">{{ index }} Player</RankingListFilter>
        </div>
        <RankingListItem v-for="(item, index) in rankingList" :key="item.id" :rank="index + 1" :score="item.score"
            :players="item.players" />
        <div v-if="!ranking.length && !scoreRequest?.isFetching" class="no-scores-found">No Scores Found</div>
        <div v-if="scoreRequest?.isFetching">Loading Scores...</div>
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useFetch, UseFetchReturn } from '@vueuse/core';
import { defineAsyncComponent, ref } from 'vue';
const RankingListFilter = defineAsyncComponent(() => import('./RankingListFilter.vue'))
const RankingListItem = defineAsyncComponent(() => import('./RankingListItem.vue'))

const areArraysEqualSets = (a1: any[], a2: any[]) => {
  const superSet: any = {};
  for (const i of a1) {
    const e = i + typeof i;
    superSet[e] = 1;
  }

  for (const i of a2) {
    const e = i + typeof i;
    if (!superSet[e]) {
      return false;
    }
    superSet[e] = 2;
  }

  for (let e in superSet) {
    if (superSet[e] === 1) {
      return false;
    }
  }

  return true;
}

const playerCountFilter = ref(1)

const ranking = ref<Array<{
    id: string,
    score: number,
    players: string[]
}>>([])

const rankingList = computed<Array<{
    id: string,
    score: number,
    players: string[]
}>>(() => {
    const array: Array<{
    id: string,
    score: number,
    players: string[]
}> = []
    for (let rank of ranking.value) {
        const isRankAlreadyInList = array.some(obj => areArraysEqualSets(obj.players, rank.players))
        if(isRankAlreadyInList) continue;
        array.push(rank)
        if(array.length > 9) {
            break;
        }
    }
    return array
})

const scoreRequest = ref<UseFetchReturn<any>>()

const loadRankList = async (playerCount: number) => {
    playerCountFilter.value = playerCount
    ranking.value = []
    scoreRequest.value = useFetch('https://firestore.googleapis.com/v1/projects/dino-fun-land/databases/(default)/documents:runQuery',
        {
            afterFetch(ctx) {
                const documents = ctx?.data
                console.log(documents)
                if (documents) {
                    ranking.value = documents?.map((obj: any, index: number) => {
                        const document = obj?.document
                        console.log('doc', document)
                        const players = document.fields?.players?.arrayValue?.values?.map((obj: any) => {
                            return obj?.stringValue
                        })?.sort()
                        return {
                            id: document?.name,
                            score: parseInt(document?.fields?.score?.integerValue),
                            players
                        }
                    })
                }
                return ctx
            }
        }
    ).post({
        structuredQuery: {
            from: [{
                collectionId: 'scores'
            }],
            where: {
                fieldFilter: {
                    field: {
                        fieldPath: 'playersCount'
                    },
                    op: 'EQUAL',
                    value: {
                        doubleValue: playerCountFilter.value
                    }
                }
            },
            orderBy: [{
                field: {
                    fieldPath: 'score'
                },
                direction: 'DESCENDING'
            }],
            limit: 1000
        }
    }).json()
}

loadRankList(1)
</script>
<style scoped>
.player-count-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
}

.no-scores-found {
    padding-block: 2rem;
    font-size: 1.4rem;
}
</style>