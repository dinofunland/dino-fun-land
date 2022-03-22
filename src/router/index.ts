import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'PageHome',
        component: () => import('../components/PageHome.vue'),
    },
    {
        path: '/dino-jump',
        name: 'PageDinoJump',
        component: () => import('../components/PageDinoJump.vue')
    },
    {
        path: '/dino-jump-demo',
        name: 'PageDinoJumpDemo',
        component: () => import('../components/PageDinoJumpDemo.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router