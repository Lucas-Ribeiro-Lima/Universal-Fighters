class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    sprites,
    scale,
    status: {
      life,
      atk,
      def
    }
  }) {
    super({
      position,
      velocity,
      sprites,
      scale,
    })
    this.status = {
      life,
      atk,
      def
    }
    this.velocity = velocity
    this.isAttacking
    this.attackCooldown = 750
    this.onAttackCooldown
    this.lastKeyPressed
    this.onGround
  }


  update() {
    this.gravity()
    this.loadSprite()
    super.update()
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
    this.velocity.y -= 13
  }
}
  