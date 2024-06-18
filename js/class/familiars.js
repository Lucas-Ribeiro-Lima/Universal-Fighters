class Familiar extends Sprite {
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
    this.onGround
    this.facing = "right"
  }

  follow() {
    this.setSprite("running")
    if (this.position.x < player1.position.x - 75) {
      this.facing = "right"
      this.velocity.x = 2
    } else if (this.position.x > player1.position.x) {
      this.facing = "left"
      this.velocity.x = -2
    } else {
      this.facing = "right"
      this.setSprite("idle")
      this.velocity.x = 0
    }
  }

  update() {
    this.gravity()
    this.loadSprite()
    this.follow()

    super.update()
  }

  jump() {
    if (!this.onGround) return
    this.velocity.y -= 6
  }
}
  