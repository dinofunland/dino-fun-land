<template>
    <div class="game-canvas" ref="gameCanvas"></div>
    <div class="state">
        <div>a pressed: {{ a }}</div>
        <div>d pressed: {{ d }}</div>
        <div>space pressed: {{ space }}</div>
        <div>isGrounded: {{ isGrounded }}</div>
    </div>
</template>
<script setup lang="ts">
import { useMagicKeys, useResizeObserver } from '@vueuse/core';
import * as Matter from 'matter-js'
import { onMounted, onUnmounted, ref, watch } from 'vue';

const { a, d, space } = useMagicKeys()

const gameCanvas = ref<HTMLElement>()
const render = ref<Matter.Render>()
const engine = ref<Matter.Engine>(Matter.Engine.create())
const runner = ref<Matter.Runner>(Matter.Runner.create())
const player = ref<Matter.Body>(Matter.Bodies.rectangle(400, 200, 4, 10, {
    friction: 0.9,
    inertia: Infinity,
    label: 'player'
}))
const isGrounded = ref<boolean>(false)

// run the engine
Matter.Runner.run(runner.value, engine.value);

const ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true, label: 'floor' });

// add all of the bodies to the world
Matter.Composite.add(engine.value.world, [ground, player.value]);

Matter.Events.on(runner.value, 'beforeTick', (e) => {
    if (a.value != d.value) {
        if (a.value) {
            Matter.Body.setVelocity(player.value, {
                x: -2,
                y: player.value.velocity.y
            })
        }
        if (d.value) {
            Matter.Body.setVelocity(player.value, {
                x: 2,
                y: player.value.velocity.y
            })
        }
    }
    isGrounded.value = Matter.SAT.collides(player.value, ground)?.collided || false
    if (isGrounded.value && space.value) {
        Matter.Body.setVelocity(player.value, {
            x: player.value.velocity.x,
            y: -4
        })
    }
})

watch(space, (v) => {
    console.log(v)
    if (!v) {
        Matter.Body.setVelocity(player.value, {
            x: player.value.velocity.x,
            y: player.value.velocity.y / 2
        })
    }
})

Matter.Events.on(engine.value, 'collisionActive', (e) => {
})

onMounted(() => {
    // create a renderer
    render.value = Matter.Render.create({
        element: gameCanvas.value,
        engine: engine.value,
        options: {
            width: gameCanvas.value?.offsetWidth,
            height: gameCanvas.value?.offsetHeight,
            wireframes: false,
            showDebug: true
        }
    });

    // run the renderer
    Matter.Render.run(render.value);

    /*
      Matter.Events.on(engine, 'afterUpdate', () => {
        Matter.Render.lookAt(render, players, {
          x: 100,
          y: 200
        });
      })
      */

    useResizeObserver(gameCanvas.value, (entries) => {
        if (gameCanvas.value) {
            const width = gameCanvas.value?.offsetWidth;
            const height = gameCanvas.value?.offsetHeight
            if (!render.value) return
            render.value.bounds.max.x = width;
            render.value.bounds.max.y = height;
            render.value.options.width = width;
            render.value.options.height = height;
            render.value.canvas.width = width;
            render.value.canvas.height = height;
        }
    })
})

onUnmounted(() => {

})
</script>
<style scope>
.game-canvas {
    width: 100vw;
    height: 100vh;
}
.state {
    padding: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    background-color: blueviolet;
}
.state > div {
    font-size: 10px;
    padding-block: 0.5rem;
}
</style>