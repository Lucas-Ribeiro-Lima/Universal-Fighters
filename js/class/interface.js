class Interface extends Sprite {
  constructor({
    position,
    sprites,
    scale,
    source,
    portraitSrc
  }) {
    super({
      position,
      sprites,
      scale,
      source
    })
    this.portraitImage = new Image()
    this.portraitImage.src = portraitSrc || defaultObjectSpritePath
  }

  drawPortrait() {
  }

  update() {
    super.update()
    this.drawPortrait()
  }
}

class StatusUI extends Interface {
  constructor({
    position,
    sprites,
    scale,
    source,
  }) {
    super({
      position,
      sprites,
      scale,
      source
    })
  }
}