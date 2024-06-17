const gravity = 0.4
const floorHeight = 100

const backgroundSpritePath = "./assets/background/placeholder.png"
const defaultObjectSpritePath =  './assets/objects/Square-white.png'

class Sprite {
  constructor({position, velocity, source, scale, offset, sprites, effects}) {
    this.position = position
    this.velocity = velocity

    this.scale = scale || 1
    this.image = new Image()
    this.image.src = source || defaultObjectSpritePath

    this.width = this.image.width * this.scale
    this.height = this.image.height * this.scale

    this.effectImage = new Image()
    this.effectImage.src = ''

    this.effectImage.width = 0
    this.effectImage.height = 0

    this.offset = offset || {
      x: 0,
      y: 0
    }

    this.sprites = sprites || {
      idle: {
        src: this.image.src,
        totalSpriteFrames: 1,
        framesPerSpriteFrame: 1
      }
    }

    this.effect = effects

    this.currentSprite = this.sprites.idle
    this.currentEffect = null
  
    this.elapsedTime = 0
    this.currentSpriteFrame = 0
    this.currentEffectFrame = 0

    this.totalSpriteFrames = this.sprites.idle.totalSpriteFrames
    this.framesPerSpriteFrame = this.sprites.idle.framesPerSpriteFrame
  }

  setSprite(sprite) {
    this.currentSprite = this.sprites[sprite]

    if (!this.currentSprite) {
      this.currentSprite = this.sprites.idle
    }
  }

  loadSprite(sprite) {
    let previousSprite = this.image.src

    this.image = new Image()
    this.image.src = this.currentSprite.src
    this.width = this.image.width * this.scale
    this.height = this.image.height * this.scale

    this.totalSpriteFrames = this.currentSprite.totalSpriteFrames
    this.framesPerSpriteFrame = this.currentSprite.framesPerSpriteFrame

    let newSprite = this.image.src

    if(previousSprite !== newSprite) {
      let previousSpriteImage = new Image()
      previousSpriteImage.src = previousSprite

      this.position.y += (previousSpriteImage.height - this.image.height) * this.scale
    }

  }

  setEffect(effect) {
    this.currentEffect = this.effect[effect]

    if (!this.currentEffect) {
      this.currentEffect = null
    }
  }
  
  loadEffect() {
    if(!this.currentEffect) return
    let previousEffect = this.effectImage.src

    this.effectImage = new Image()
    this.effectImage.src = this.currentEffect.src
    
    this.effectImage.width = this.effectImage.width * this.scale
    this.effectImage.height = this.effectImage.height * this.scale
    
    this.totalEffectFrames = this.currentEffect.totalSpriteFrames
    this.framesPerEffectFrame = this.currentEffect.framesPerSpriteFrame
    
    let newEffect = this.effectImage.src

    if(previousEffect !== newEffect) {
      let previousEffectImage = new Image()
      previousEffectImage.src = previousEffect

      this.position.y += (previousEffectImage.height - this.effectImage.height) * this.scale
    }
  }

  draw () {
    ctx.imageSmoothingEnabled = false

    const xScale = this.facing === "left" ? -1 : 1

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
    
    ctx.restore()

    if (this.currentEffect !== null) {
      ctx.save();
      ctx.translate(this.position.x + this.offset.x, this.position.y + this.offset.y);
      ctx.scale(xScale, 1);

      ctx.drawImage(
          this.effectImage,
          this.currentEffectFrame * (this.effectImage.width / this.totalEffectFrames),
          0,
          this.effectImage.width / this.totalEffectFrames,
          this.effectImage.height,
          xScale === -1 ? -this.width / this.totalSpriteFrames : 0,
          0,
          this.effectImage.width / this.totalEffectFrames * xScale,
          this.effectImage.height
      );

      ctx.restore()
    }
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

    if (this.elapsedTime >= this.framesPerEffectFrame) {
      this.currentEffectFrame++

      if (this.currentEffectFrame >= this.totalEffectFrames) {
        this.currentEffectFrame = 0
      }
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
    effects
  }) {
    super({
      position,
      velocity,
      sprites,
      scale,
      effects
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
    this.loadEffect()

    this.draw()
    this.animate()
  }

  attack() {
    if (this.onAttackCooldown) return

    this.isAttacking = true
    this.onAttackCooldown = true

    setTimeout(() => {
      this.isAttacking = false

    }, 100)

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
    },
    running: {
      src: "../assets/players/running.png",
      totalSpriteFrames: 10,
      framesPerSpriteFrame: 10,
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
    }
  },
  effects: {
    slash: {
      src: "../assets/players/slash.png",
      totalSpriteFrames: 5,
      framesPerSpriteFrame: 8,
    }
  }
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
      framesPerSpriteFrame: 11,
    }
  },
  effects: {
    slash: {
      src: "../assets/players/slash.png",
      totalSpriteFrames: 5,
      framesPerSpriteFrame: 8,
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