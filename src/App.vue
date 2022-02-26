<template>
  <div ref="game"></div>
</template>
<script setup lang="ts">
import * as Matter from 'matter-js'
import { onMounted, ref } from 'vue';

const game = ref<HTMLElement>()

const createPlayer = (): Matter.Body => {
  return Matter.Bodies.rectangle(0, -10, 10, 10, {
    friction: 0.9
  });
}

const createGround = (): Matter.Body => {
  return Matter.Bodies.rectangle(0, 30, 1000, 60, { isStatic: true });
}

onMounted(() => {
  console.log(game.value)
  // module aliases

  // create an engine
  var engine = Matter.Engine.create();

  // create a renderer
  var render = Matter.Render.create({
    element: game.value,
    engine: engine
  });

  const players = [createPlayer(), createPlayer()]

  var ground = createGround()

  // add all of the bodies to the world
  Matter.Composite.add(engine.world, ground);
  Matter.Composite.add(engine.world, players);

  // run the renderer
  Matter.Render.run(render);

  // create runner
  var runner = Matter.Runner.create();

  // run the engine
  Matter.Runner.run(runner, engine);
  Matter.Events.on(engine, 'afterUpdate', () => {
    const highestPlayer = players.reduce((max, game) => max.position.y > game.position.y ? max : game);
    Matter.Render.lookAt(render, highestPlayer, {
      x: 10,
      y: 200
    });
  })
})
</script>
