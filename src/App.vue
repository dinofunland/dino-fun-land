<template>
  <div ref="gameCanvas"></div>
</template>
<script setup lang="ts">
import * as Matter from 'matter-js'
import { onMounted, ref } from 'vue';
import { onKeyDown, onKeyUp } from '@vueuse/core'

const getRndInteger = (min :number, max :number) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const createPlayer = (x: number, y: number): Matter.Body => {
  return Matter.Bodies.rectangle(x, y, 10, 10, {
    friction: 0.8
  });
}

const createPlatform = (x: number, y: number): Matter.Body => {
  const body = Matter.Bodies.rectangle(x, y, 40, 1, {
    isStatic: true
  })
  return body
}

const generatePlatforms = (count: number): Matter.Body[] => {
  const bodies: Matter.Body[] = []

  for(let i = 0; i < count; i++){
    bodies.push(createPlatform(getRndInteger(-100, 100), -i*30 + -30))
  }

  return bodies
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

const platforms = generatePlatforms(30)
Matter.Composite.add(engine.world, platforms);

const playersInput = [
  {
    left: false,
    right: false
  },
  {
    left: false,
    right: false
  },
]


onKeyDown(['a', 'A', 'd', 'D', 'w', 'W', 'ArrowLeft', 'ArrowRight', 'ArrowUp'], (e) => {
  e.preventDefault()
  const power = 0.001
  switch (e.code) {
    // Player 1
    case 'KeyA':
      console.log('hi')
      playersInput[0].left = true
      break;
    case 'KeyD':
      playersInput[0].right = true
      break;
    case 'KeyW':
      console.log('jump')
      players[0].force.y = -power * 3
      break;
    // Player 2
    case 'ArrowLeft':
      playersInput[1].left = true
      break;
    case 'ArrowRight':
      playersInput[1].right = true
      break;
    case 'ArrowUp':
      console.log('jump')
      players[1].force.y = -power * 3
      break;
  }
})

onKeyUp(['a', 'A', 'd', 'D', 'ArrowLeft', 'ArrowRight',], (e) => {
  e.preventDefault()
  switch (e.code) {
    // Player 1
    case 'KeyA':
      playersInput[0].left = false
      break;
    case 'KeyD':
      playersInput[0].right = false
      break;
    // Player 2
    case 'ArrowLeft':
      playersInput[1].left = false
      break;
    case 'ArrowRight':
      playersInput[1].right = false
      break;
  }
})

Matter.Events.on(runner, 'afterTick', (e) => {
  const playerInputOne = players[0]
})

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
    Matter.Render.lookAt(render, ground, {
      x: 100,
      y: 400
    });
  })
})
</script>
