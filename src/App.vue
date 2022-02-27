<template>
  <div class="game-canvas" ref="gameCanvas"></div>
</template>
<script setup lang="ts">
import * as Matter from 'matter-js'
import { onMounted, ref } from 'vue';
import { onKeyDown, onKeyUp, useResizeObserver } from '@vueuse/core'

const platformCategory = 1
const playerCategory = 2

const getRndInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const createPlayer = (x: number, y: number, color: string): Matter.Body => {
  return Matter.Bodies.rectangle(x, y, 5, 10, {
    friction: 0,
    inertia: Infinity,
    render: {
      fillStyle: color,
    },
    collisionFilter: {
      category: playerCategory,
      mask: 1
    }
  });
}

const createPlatform = (x: number, y: number): Matter.Body => {
  const body = Matter.Bodies.rectangle(x, y, 40, 5, {
    isStatic: true,
    collisionFilter: {
      category: platformCategory
    },
    render: {
      fillStyle: 'green'
    }
  })
  return body
}

const generatePlatforms = (count: number): Matter.Body[] => {
  const bodies: Matter.Body[] = []

  for (let i = 0; i < count; i++) {
    bodies.push(createPlatform(getRndInteger(-60, 100), -i * 35 + -30))
  }

  return bodies
}

const createGround = (): Matter.Body => {
  return Matter.Bodies.rectangle(0, 5, 1000, 10, { isStatic: true });
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

const players = [createPlayer(-10, -10, 'red'), createPlayer(20, -10, 'yellow')]
Matter.Composite.add(engine.world, players);

const platforms = generatePlatforms(1000)
Matter.Composite.add(engine.world, platforms);

const playersInput = [
  {
    left: false,
    right: false,
    shift: false,
    usedDoubleJump: false
  },
  {
    left: false,
    right: false,
    shift: false,
    usedDoubleJump: false
  },
]


onKeyDown(['a', 'A', 'd', 'D', 'w', 'W', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Shift'], (e) => {
  e.preventDefault()
  const powerJump = 5
  switch (e.code) {
    // Player 1
    case 'KeyA':
      playersInput[0].left = true
      break;
    case 'KeyD':
      playersInput[0].right = true
      break;
    case 'KeyW':
      const playerJumpPower = playersInput[0].shift ? powerJump + 1 : powerJump;
      const player = players[0]
      let doesCollide;
      const jump = () => {
        Matter.Body.setVelocity(player, {
          x: player.velocity.x,
          y: -playerJumpPower
        })
      }
      for (let platform of [ground, ...platforms]) {
        doesCollide = Matter.SAT.collides(platform, player)
        if (doesCollide) {
          jump()
          break;
        }
      }
      if(!doesCollide && !playersInput[0].usedDoubleJump) {
        jump()
        playersInput[0].usedDoubleJump = true
      }
      break;
    case 'ShiftLeft':
      playersInput[0].shift = true
      break;
    // Player 2
    case 'ArrowLeft':
      playersInput[1].left = true
      break;
    case 'ArrowRight':
      playersInput[1].right = true
      break;
    case 'ArrowUp':
      const playerJumpPower2 = playersInput[1].shift ? powerJump + 1 : powerJump;
      const player2 = players[1]
      for (let platform of [ground, ...platforms]) {
        const doesCollide = Matter.SAT.collides(platform, player2)
        if (doesCollide) {
          Matter.Body.setVelocity(player2, {
            x: player2.velocity.x,
            y: -playerJumpPower2
          })
          break;
        }
      }
      break;
    case 'ShiftRight':
      playersInput[1].shift = true
      break;
  }
})

onKeyUp(['a', 'A', 'd', 'D', 'ArrowLeft', 'ArrowRight', 'Shift'], (e) => {
  e.preventDefault()
  switch (e.code) {
    // Player 1
    case 'KeyA':
      playersInput[0].left = false
      break;
    case 'KeyD':
      playersInput[0].right = false
      break;
    case 'ShiftLeft':
      playersInput[0].shift = false
      break;
    // Player 2
    case 'ArrowLeft':
      playersInput[1].left = false
      break;
    case 'ArrowRight':
      playersInput[1].right = false
      break;
    case 'ShiftRight':
      playersInput[1].shift = false
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

  for (let [index, player] of players.entries()) {
    player.friction = 0
    for (let platform of [ground, ...platforms]) {
      const doesCollide = Matter.SAT.collides(platform, player)
      if (doesCollide && ((platform.position.y - 2.5) > (player.position.y + 4.9))) {
        playersInput[index].usedDoubleJump = false
        player.friction = 0.9
        break;
      }
    }
    if(player.velocity.y < 0) {
      player.collisionFilter.mask = 0
    } else {
      player.collisionFilter.mask = 1
    }
  }
  
  for(let [index, value] of platforms.entries()) {
    var isThirdIteration = (index + 1) % 4 === 0;
    if(!isThirdIteration) continue

    var px = 1 + 0 * Math.sin(engine.timing.timestamp * 0.0003);
    Matter.Body.setVelocity(value, { x: px, y: value.velocity.y });
    Matter.Body.setPosition(value, { x: value.position.x + px, y: value.position.y });
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
      wireframes: false,
      showDebug: true
    }
  });

  // run the renderer
  Matter.Render.run(render);

  Matter.Events.on(engine, 'afterUpdate', () => {
    Matter.Render.lookAt(render, players, {
      x: 100,
      y: 200
    });
  })

  useResizeObserver(gameCanvas.value, (entries) => {
    if (gameCanvas.value) {
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