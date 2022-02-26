<template>
  <div ref="game"></div>
</template>
<script setup lang="ts">
import * as Matter from 'matter-js'
import { onMounted, onUnmounted, ref } from 'vue';

const game = ref<HTMLElement>()

const render = ref<Matter.Render>()

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


  // create two boxes and a ground
  var boxA = Matter.Bodies.rectangle(400, 200, 80, 80, {
    friction: 2
  });
  var boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
  var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  console.log('test')
  console.log('test')

  // add all of the bodies to the world
  Matter.Composite.add(engine.world, [boxA, boxB, ground]);

  // run the renderer
  Matter.Render.run(render.value);

  // create runner
  var runner = Matter.Runner.create();

  // run the engine
  Matter.Runner.run(runner, engine);
  var x = 1
})
</script>
