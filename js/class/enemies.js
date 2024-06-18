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
    this.aggroRange = aggroRange || 200
    this.attackCooldown = 2000
    this.onAttackCooldown
    this.attackRange = 90
    this.onGround
  }

  IA() {
    const inAggroRangeX = player1.position.x >= this.position.x - this.aggroRange && player1.position.x <= this.position.x + this.aggroRange + (this.width / this.totalSpriteFrames)
    const inAttackRange = player1.position.x >= this.position.x - this.attackRange && player1.position.x <= this.position.x + this.attackRange + (this.width / this.totalSpriteFrames)

    if (inAggroRangeX) {
        this.aggro = true
      } else {
        this.aggro = false
      }

    
    if (this.aggro) {
      if (inAttackRange){
        this.attack()
      }
      else {
        if(player1.position.x <= this.position.x){
          this.facing = "left"
          this.velocity.x = -0.5
        } else {
          this.facing = "right"
          this.velocity.x = 0.5
        }
      }
    } else {
      this.velocity.x = 0
      this.setSprite("idle")
    }
  }

  update() {
    this.gravity()

    this.loadSprite()
    
    this.IA()

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
  