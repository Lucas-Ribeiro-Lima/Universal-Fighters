class Enemie extends Sprite {
  constructor({
    position,
    velocity,
    sprites,
    scale,
    aggroRange,
    spawnSpot
  }) {
    super({
      position,
      velocity,
      sprites,
      scale,
    })
    this.facing = "left"
    this.spawnSpot = spawnSpot
    this.aggroRange = aggroRange || 100
    this.attackCooldown = 2000
    this.onAttackCooldown
    this.attackRange = 90
    this.onGround
  }

  IA() {

    if (player1.position.x > this.position.x + this.image.width / this.totalSpriteFrames) {
      this.facing = "right"
    } else {
      this.facing = "left"
    }

    if (player1.position.x < this.position.x) {
      this.velocity.x = -0.5
      if (this.position.x < this.spawnSpot.x - this.aggroRange) this.velocity.x = 0
    } else {
      this.velocity.x = 0.5
      if (this.position.x > this.spawnSpot.x + this.aggroRange) this.velocity.x = 0
    }

    if (player1.position.x >= this.position.x - this.attackRange & player1.position.x <= this.position.x + this.attackRange){
      this.attack()
    } else {
      this.setSprite("idle")
    }
  }

  update() {
    this.gravity()
    this.IA()
    this.loadSprite()
    this.draw()
    this.animate()
  }

  attack() {
    if (this.onAttackCooldown) return

    this.setSprite("attacking")
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
    this.velocity.y -= 4
  }
}
  