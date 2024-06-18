const player1 = new Fighter ({
  position: {
    x: 20,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  status: {
    life: 1000,
    atk: 20,
    def: 10
  },
  scale: 4,
  sprites: {
    idle: {
      src: "../assets/players/idle.png",
      totalSpriteFrames: 11,
      framesPerSpriteFrame: 11,
      effects: [null]
    },
    running: {
      src: "../assets/players/running.png",
      totalSpriteFrames: 10,
      framesPerSpriteFrame: 10,
      effects: [null],
      soundEffect: "../assets/soundEffects/sfxMovements/footsteps/step_lth4.ogg",
      soundEffectLoop: false
    },
    jumping: {
      src: "../assets/players/jumping.png",
      totalSpriteFrames: 4,
      framesPerSpriteFrame: 4,
      effects: [null],
      soundEffect: "../assets/soundEffects/sfxMovements/30_Jump_03.wav",
      soundEffectLoop: false
    },
    attacking: {
      src: "../assets/players/attacking.png",
      totalSpriteFrames: 7,
      framesPerSpriteFrame: 11,
      effects: [
        {
          src: "../assets/players/slash.png",
          totalSpriteFrames: 5,
          framesPerSpriteFrame: 11,
        }
      ],
      soundEffect: "../assets/soundEffects/sfxMelee/melee sound.wav",
      soundEffectLoop: false
    }
  },
})

function drawPlayer() {
  player1.update()
  catFamiliar.update()
}