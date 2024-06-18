const keys = {
  a: { 
    pressed: false
  },
  d: { 
    pressed: false
  },
  w: { 
    pressed: false,
    hold: false
  },
  s: { 
    pressed: false
  },
  space: { 
    pressed: false
  },
  j: {
    pressed: false,
    hold: false
  }
}

const base_velocity = 1.6

window.addEventListener('keydown', e => {
  let key = e.key

  switch(key) {
    case "ArrowLeft":
    case "a":
      keys.a.pressed = true
      player1.lastKeyPressed = key
      break;
    case "ArrowUp":
    case "w":
      keys.w.pressed = true
      player1.lastKeyPressed = key
      break;
    case "ArrowRight":
    case "d":
      keys.d.pressed = true
      player1.lastKeyPressed = key
      break;
    case "ArrowDown":
    case "s":
      keys.s.pressed = true
      player1.lastKeyPressed = key
      break;
    case "space":
      keys.space.pressed = true
      player1.lastKeyPressed = key
      break;
    case "j":
      keys.j.pressed = true
      player1.lastKeyPressed = key
      break;
  }
})

window.addEventListener('keyup', e => {
  let key = e.key

  switch(key) {
    case "ArrowLeft":
    case "a":
      keys.a.pressed = false
      break;
    case "ArrowUp":
    case "w":
      keys.w.pressed = false
      keys.w.hold = false
      break;
    case "ArrowRight":
    case "d":
      keys.d.pressed = false
      break;
    case "ArrowDown":
    case "s":
      keys.s.pressed = false
      break;
    case "space":
      keys.space.pressed = false
      break;
    case "j":
      keys.j.pressed = false
      keys.j.hold = false
      break;
  }
})

function handleControls() {
  player1.setSprite("idle")

  if (!player1.onGround) player1.setSprite("jumping")
  if (player1.isAttacking) player1.setSprite("attacking")

  movement()
  attacks()
  
  function movement() {
    player1.velocity.x = 0

    if( keys.a.pressed && ["a", "ArrowLeft"].includes(player1.lastKeyPressed)) {
      player1.velocity.x = -base_velocity * 3.6
      player1.facing = "left"
      if (!player1.onGround) return

      player1.setSprite("running")
    }
    if( keys.d.pressed && ["d", "ArrowRight"].includes(player1.lastKeyPressed)) {
      player1.velocity.x = base_velocity * 3.6
      player1.facing = "right"
      if (!player1.onGround) return

      player1.setSprite("running")
    }
    if( keys.w.pressed && !keys.w.hold) {
      player1.jump()
      keys.w.hold = true

      player1.setSprite("jumping")
    }

  }

  function attacks() {
    if (keys.j.pressed && !keys.j.hold) {
      player1.attack()
      keys.j.hold = true
    }
  }
}