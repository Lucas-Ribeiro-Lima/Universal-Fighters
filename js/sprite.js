const gravity = 0.4
const floorHeight = 100

const backgroundSpritePath = "./assets/background/placeholder.png"
const defaultObjectSpritePath =  './assets/objects/Square-white.png'

class Sprite {
  constructor({position, velocity, source, scale, effectScale, offset, sprites}) {
    this.position = position
    this.velocity = velocity

    this.scale = scale || 1
    this.effectScale = effectScale || 0.4
    this.image = new Image()
    this.image.src = source || defaultObjectSpritePath

    this.width = this.image.width * this.scale
    this.height = this.image.height * this.scale


    this.offset = offset || {
      x: 0,
      y: 0
    }

    this.sprites = sprites || {
      idle: {
        src: this.image.src,
        totalSpriteFrames: 1,
        framesPerSpriteFrame: 1,
        effects: [null],
      }
    }
    this.currentSprite = this.sprites.idle
  
    this.elapsedTime = 0
    this.currentSpriteFrame = 0
    this.currentEffectframe = 0

    this.totalSpriteFrames = this.sprites.idle.totalSpriteFrames
    this.framesPerSpriteFrame = this.sprites.idle.framesPerSpriteFrame
  }

  setSprite(sprite) {
    this.currentSprite = this.sprites[sprite]

    if (!this.currentSprite) {
      this.currentSprite = this.sprites.idle
    }
  }

  loadSprite() {
    let previousSprite = this.image.src

    this.image = new Image()
    this.image.src = this.currentSprite.src
    this.width = this.image.width * this.scale
    this.height = this.image.height * this.scale

    this.totalSpriteFrames = this.currentSprite.totalSpriteFrames
    this.framesPerSpriteFrame = this.currentSprite.framesPerSpriteFrame


    if (!this.currentSprite.effects.includes(null)) {
      this.loadEffect()
    }

    let newSprite = this.image.src

    if(previousSprite !== newSprite) {
      let previousSpriteImage = new Image()
      previousSpriteImage.src = previousSprite

      this.position.y += (previousSpriteImage.height - this.image.height) * this.scale
    }

  }
  
  loadEffect() {
    // console.log(this.currentSprite.effects[0])
    
    this.effectImage = new Image()
    this.effectImage.src = this.currentSprite.effects[0].src
    this.effectWidth = this.effectImage.width * (this.scale - 0.6)
    this.effectHeigh = this.effectImage.height * (this.scale - 0.6)

    this.totalEffectFrames = this.currentSprite.effects[0].totalSpriteFrames
    this.framesPerEffectFrame = this.currentSprite.effects[0].framesPerSpriteFrame

    // console.log(this.effectWidth, this.effectHeigh, this.totalEffectFrames, this.framesPerEffectFrame)

  }

  draw () {
    ctx.imageSmoothingEnabled = false
    const xScale = this.facing === "left" ? -1 : 1
    let x = this.facing === "left" ? 200 : 0

    ctx.save()
    ctx.translate(this.position.x + this.offset.x, this.position.y + this.offset.y)
    ctx.scale(xScale, 1)
    
    ctx.drawImage(
      this.image,
      this.currentSpriteFrame * this.image.width / this.totalSpriteFrames,
      0,
      this.image.width / this.totalSpriteFrames,
      this.image.height,
      0,
      0,
      this.width / this.totalSpriteFrames * xScale,
      this.height
    )

    if (!this.currentSprite.effects.includes(null)) {
      if (this.currentSpriteFrame <= this.totalEffectFrames){
        ctx.drawImage(
          this.effectImage,
          this.currentSpriteFrame * (this.effectImage.width / this.totalEffectFrames),
          0,
          this.effectImage.width / this.totalEffectFrames,
          this.effectImage.height,
          x,
          0,
          this.effectWidth / this.totalEffectFrames * xScale,
          this.effectHeigh
        );
      }
    }

    ctx.restore()    
  }

  animate() {
    this.elapsedTime++
    
    if (this.elapsedTime >= this.framesPerSpriteFrame) {
      this.currentSpriteFrame++

      if (this.currentSpriteFrame >= this.totalSpriteFrames) {
        this.currentSpriteFrame = 0
      }

      this.elapsedTime = 0
    }
  }

  update() {
    this.draw()
    this.animate()
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    sprites,
    scale,
  }) {
    super({
      position,
      velocity,
      sprites,
      scale,
    })
    this.velocity = velocity
    this.isAttacking
    this.attackCooldown = 500
    this.onAttackCooldown
    this.lastKeyPressed
    this.onGround
  }

  gravity() {
    if (Math.ceil(this.position.y + this.height) >= canvas.height - floorHeight){
      this.onGround = true
    } else {
      this.onGround = false
    }

    if (this.position.y + this.height > canvas.height - floorHeight) {
      this.position.y = canvas.height - this.height - floorHeight
      this.velocity.y = 0
    } else if (!this.onGround) {
      this.velocity.y += gravity
    }

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  update() {
    this.gravity()
    this.loadSprite()

    this.draw()
    this.animate()
  }

  attack() {
    if (this.onAttackCooldown) return

    this.isAttacking = true
    this.onAttackCooldown = true

    setTimeout(() => {
      this.isAttacking = false

    }, 500)

    setTimeout(() => {
      this.onAttackCooldown = false
    }, this.attackCooldown)
  }

  jump() {
    if (!this.onGround) return
    this.velocity.y -= 13
  }
}

const player1 = new Fighter ({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  scale: 4,
  sprites: {
    idle: {
      src: "../assets/players/idle.png",
      totalSpriteFrames: 11,
      framesPerSpriteFrame: 18,
      effects: [null]
    },
    running: {
      src: "../assets/players/running.png",
      totalSpriteFrames: 10,
      framesPerSpriteFrame: 10,
      effects: [null]
    },
    jumping: {
      src: "../assets/players/jumping.png",
      totalSpriteFrames: 4,
      framesPerSpriteFrame: 8,
      effects: [null]
    },
    attacking: {
      src: "../assets/players/attacking.png",
      totalSpriteFrames: 7,
      framesPerSpriteFrame: 8,
      effects: [
        {
          src: "../assets/players/slash.png",
          totalSpriteFrames: 5,
          framesPerSpriteFrame: 5,
        }
      ]
    }
  },
})

const player2 = new Fighter ({
  position: {
    x: 200,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  scale: 4,
  sprites: {
    idle: {
      src: "../assets/players/idle.png",
      totalSpriteFrames: 11,
      framesPerSpriteFrame: 18,
    },
    running: {
      src: "../assets/players/running.png",
      totalSpriteFrames: 10,
      framesPerSpriteFrame: 8,
    },
    jumping: {
      src: "../assets/players/jumping.png",
      totalSpriteFrames: 4,
      framesPerSpriteFrame: 8,
    },
    attacking: {
      src: "../assets/players/attacking.png",
      totalSpriteFrames: 7,
      framesPerSpriteFrame: 8,
      effects: [
        slash = {
          src: "../assets/players/slash.png",
          totalSpriteFrames: 5,
          framesPerSpriteFrame: 8,
        }
      ]
    }
  }
})

  
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  source: backgroundSpritePath
})