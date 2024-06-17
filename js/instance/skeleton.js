const skeleton1 = new Enemie ({
  position: {
    x: 600,
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
  scale: 3.4,
  sprites: {
    idle: {
      src: "../assets/enemies/skeleton_idle_sheet.png",
      totalSpriteFrames: 4,
      framesPerSpriteFrame: 11,
      effects: [null]
    },
    attacking: {
      src: "../assets/enemies/skeleton_attack_sheet.png",
      totalSpriteFrames: 5,
      framesPerSpriteFrame: 14,
      effects: [null]
    }
  },
})