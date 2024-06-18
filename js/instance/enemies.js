const skeleton1 = new Enemie ({
  position: {
    x: 300,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  spawnSpot: {
    x: 300,
    y: 0
  },
  aggroRange: 200,
  scale: 3.4,
  sprites: {
    idle: {
      src: "../assets/enemies/skeleton/skeleton_idle_sheet.png",
      totalSpriteFrames: 4,
      framesPerSpriteFrame: 11,
      effects: [null],
      soundEffect: "../assets/soundEffects/rattlingBones.wav",
      soundEffectLoop: true
    },
    running: {
      src: "../assets/enemies/skeleton/skeleton_idle_sheet.png",
      totalSpriteFrames: 4,
      framesPerSpriteFrame: 11,
      effects: [null],
      soundEffect: "../assets/soundEffects/rattlingBones.wav",
      soundEffectLoop: false
    },
    attacking: {
      src: "../assets/enemies/skeleton/skeleton_attack_sheet.png",
      totalSpriteFrames: 5,
      framesPerSpriteFrame: 14,
      effects: [null],
      soundEffect: "../assets/soundEffects/sfxWeaponsTexture/sfxTextures2/SpearSwing.wav",
      soundEffectLoop: false
    }
  },
})

const rogue1 = new Enemie ({
  position: {
    x: 400,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  spawnSpot: {
    x: 400,
    y: 0
  },
  aggroRange: 100,
  scale: 4.5,
  sprites: {
    idle: {
      src: "../assets/enemies/rogue/rogue_idle_1.png",
      totalSpriteFrames: 10,
      framesPerSpriteFrame: 11,
      effects: [null],
      soundEffect: null,
      soundEffectLoop: false
    },
    running: {
      src: "../assets/enemies/rogue/rogue_walking_1.png",
      totalSpriteFrames: 10,
      framesPerSpriteFrame: 14,
      effects: [null],
      soundEffect: "../assets/soundEffects/sfxMovements/footsteps/step_lth2.ogg",
      soundEffectLoop: false
    },
  }
})