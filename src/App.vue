<template>
  <div class="game-canvas" ref="gameCanvas"></div>
</template>
<script setup lang="ts">
import * as Matter from 'matter-js'
import { onMounted, ref } from 'vue';
import { onKeyDown, onKeyUp, useResizeObserver } from '@vueuse/core'

  const platformCategory = 0x0001
  const playerCategory = 0x0002

const getRndInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const createPlayer = (x: number, y: number, color: string): Matter.Body => {
  return Matter.Bodies.rectangle(x, y, 5, 10, {
    friction: 0.4,
    inertia: Infinity,
    render: {
      fillStyle: color,
    },
    collisionFilter: {
      category: playerCategory,
      mask: platformCategory
    }
  });
}

const createPlatform = (x: number, y: number): Matter.Body => {
  const body = Matter.Bodies.rectangle(x, y, 40, 10, {
    isStatic: true,
    collisionFilter: {
      category: platformCategory
    }
  })
  return body
}

const generatePlatforms = (count: number): Matter.Body[] => {
  const bodies: Matter.Body[] = []

  for (let i = 0; i < count; i++) {
    bodies.push(createPlatform(getRndInteger(-100, 100), -i * 30 + -30))
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

const players = [createPlayer(-10, -10, 'red'), createPlayer(20, -10, 'green')]
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
  const powerJump = 5
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
      const player = players[0]
      Matter.Body.setVelocity(player, {
        x: player.velocity.x,
        y: -powerJump
      })
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
      const player2 = players[1]
      Matter.Body.setVelocity(player2, {
        x: player2.velocity.x,
        y: -powerJump
      })
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
  const power = 2;
  const playerOne = players[0]
  const playerInputOne = playersInput[0]
  if (playerInputOne.left) {
    Matter.Body.setVelocity(playerOne, {
      x: -power,
      y: playerOne.velocity.y
    })
  }
  if (playerInputOne.right) {
    Matter.Body.setVelocity(playerOne, {
      x: power,
      y: playerOne.velocity.y
    })
  }

  const playerTwo = players[1]
  const playerInputTwo = playersInput[1]
  if (playerInputTwo.left) {
    Matter.Body.setVelocity(playerTwo, {
      x: -power,
      y: playerTwo.velocity.y
    })
  }
  if (playerInputTwo.right) {
    Matter.Body.setVelocity(playerTwo, {
      x: power,
      y: playerTwo.velocity.y
    })
  }

})

onMounted(() => {
  // create a renderer
  const render = Matter.Render.create({
    element: gameCanvas.value,
    engine: engine,
    options: {
      width: gameCanvas.value?.offsetWidth,
      height: gameCanvas.value?.offsetHeight,
      wireframes: false // <-- important
    }
  });

  // run the renderer
  Matter.Render.run(render);

  Matter.Events.on(engine, 'afterUpdate', () => {
    const highestPlayer = players[0]
    if (!highestPlayer) return
    Matter.Render.lookAt(render, players, {
      x: 100,
      y: 200
    });
  })

  useResizeObserver(gameCanvas.value, (entries) => {
    if(gameCanvas.value) {
      const width = gameCanvas.value?.offsetWidth;
      const height = gameCanvas.value?.offsetHeight

      render.bounds.max.x = width;
      render.bounds.max.y = height;
      render.options.width = width;
      render.options.height = height;
      render.canvas.width = width;
      render.canvas.height = height;
    }
  })
})
</script>
<style>
html,
body {
  margin: 0;
}

.game-canvas {
  width: 100vw;
  height: 100vh;
}
</style>