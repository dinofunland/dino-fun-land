<template>
  <div ref="gameCanvas"></div>
</template>
<script setup lang="ts">
import * as Matter from 'matter-js'
import { onMounted, onUnmounted, ref } from 'vue';

const createPlayer = (x: number, y: number): Matter.Body => {
  return Matter.Bodies.rectangle(x, y, 10, 10, {
    friction: 0.9
  });
}

const createGround = (): Matter.Body => {
  return Matter.Bodies.rectangle(0, 30, 1000, 60, { isStatic: true });
}

const gameCanvas = ref<HTMLElement>()
// create an engine
const engine = Matter.Engine.create();
const ground = createGround()

// add all of the bodies to the world
Matter.Composite.add(engine.world, ground);

// create runner
const runner = Matter.Runner.create();

// run the engine
Matter.Runner.run(runner, engine);

const players = [createPlayer(-10, -10), createPlayer(20, -10)]
Matter.Composite.add(engine.world, players);

onMounted(() => {
  // create a renderer
  const render = Matter.Render.create({
    element: gameCanvas.value,
    engine: engine
  });

  // run the renderer
  Matter.Render.run(render);

  Matter.Events.on(engine, 'afterUpdate', () => {
    const highestPlayer = players.reduce((max, game) => max.position.y > game.position.y ? max : game);
    if (!highestPlayer) return
    Matter.Render.lookAt(render, highestPlayer, {
      x: 10,
      y: 200
    });
  })
})
</script>
