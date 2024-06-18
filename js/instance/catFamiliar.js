const catFamiliar = new Familiar ({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0
  },
  scale: 2.5,
  sprites: {
    idle: {
      src: "../assets/familiars/cat/cat_white-idle.png",
      totalSpriteFrames: 3,
      framesPerSpriteFrame: 21,
      effects: [null],
      soundEffect: "assets/soundEffects/sfxFamiliars/Meow.ogg"
    },
    running: {
      src: "../assets/familiars/cat/cat_white-running.png",
      totalSpriteFrames: 3,
      framesPerSpriteFrame: 21,
      effects: [null]
    }
  },
})