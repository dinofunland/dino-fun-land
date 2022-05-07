import { getAnalytics, logEvent } from "firebase/analytics";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'PageHome',
        component: () => import('../pages/PageHome.vue'),
        meta: {
            title: 'Dino Fun Land',
        },
    },
    {
        path: '/dino-jump',
        name: 'PageDinoJump',
        component: () => import('../pages/PageDinoJump.vue'),
        meta: {
            title: 'Dino Fun Land - Game',
        },
    },
    {
        path: '/dino-jump-ranking',
        name: 'PageDinoJumpRanking',
        component: () => import('../pages/PageDinoJumpRanking.vue'),
        meta: {
            title: 'Dino Fun Land - Ranking',
        },
    },
    {
        path: '/dino-jump-demo',
        name: 'PageDinoJumpDemo',
        component: () => import('../pages/PageDinoJumpDemo.vue'),
        meta: {
            title: 'Dino Fun Land - Demo 1',
        },
    },
    {
        path: '/dino-jump-demo-2',
        name: 'PageDinoJumpDemo2',
        component: () => import('../pages/PageDinoJumpDemo2.vue'),
        meta: {
            title: 'Dino Fun Land - Demo 2',
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const defaultTitle = 'Dino Fun Land'
    document.title = (to.meta.title as string) || defaultTitle
    next()
})

router.afterEach((to) => {
    const analytics = getAnalytics()
    console.log(analytics.app.name)
    logEvent(analytics, 'page_view', {
        page_path: to.fullPath,
        page_title: document.title,
    })
})

export default router