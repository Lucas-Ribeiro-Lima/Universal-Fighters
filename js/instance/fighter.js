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