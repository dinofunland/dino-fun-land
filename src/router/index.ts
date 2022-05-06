import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'PageHome',
        component: () => import('../pages/PageHome.vue'),
    },
    {
        path: '/dino-jump',
        name: 'PageDinoJump',
        component: () => import('../pages/PageDinoJump.vue')
    },
    {
        path: '/dino-jump-ranking',
        name: 'PageDinoJumpRanking',
        component: () => import('../pages/PageDinoJumpRanking.vue')
    },
    {
        path: '/dino-jump-demo',
        name: 'PageDinoJumpDemo',
        component: () => import('../pages/PageDinoJumpDemo.vue')
    },
    {
        path: '/dino-jump-demo-2',
        name: 'PageDinoJumpDemo2',
        component: () => import('../pages/PageDinoJumpDemo2.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router