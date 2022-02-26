<template>
  <div ref="game"></div>
</template>
<script setup lang="ts">
import * as Matter from 'matter-js'
import { onMounted, ref } from 'vue';

const game = ref<HTMLElement>()

const render = ref<Matter.Render>()

const createPlayer = (): Matter.Body => {
  return Matter.Bodies.rectangle(400, 200, 80, 80, {
    friction: 0.9
  });
}

const createGround = (): Matter.Body => {
  return Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
}

onMounted(() => {
  console.log(game.value)
  // module aliases

  // create an engine
  var engine = Matter.Engine.create();

  // create a renderer
  render.value = Matter.Render.create({
    element: game.value,
    engine: engine
  });

  const playerOne = createPlayer()
  const playerTwo = createPlayer()

  var ground = createGround()

  // add all of the bodies to the world
  Matter.Composite.add(engine.world, ground);
  Matter.Composite.add(engine.world, playerOne);
  Matter.Composite.add(engine.world, playerTwo);

  // run the renderer
  Matter.Render.run(render.value);

  // create runner
  var runner = Matter.Runner.create();

  // run the engine
  Matter.Runner.run(runner, engine);
  var x = 1
})
</script>
