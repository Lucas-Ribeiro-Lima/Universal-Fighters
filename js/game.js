const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

//Window control
const canvasWidth = 1024
const canvasHeight = 576

canvas.width = canvasWidth
canvas.height = canvasHeight

//Sound Control
const effectVolume = 85
const musicVolume = 80

//FPS Control
const desiredFPS = 120
const frameTime = 1000 / desiredFPS
let prevTime = performance.now()
let lag = 0

animate()

function animate() {
  const currentTime = performance.now()
  const elapsed = currentTime - prevTime
  prevTime = currentTime
  lag += elapsed

  window.requestAnimationFrame(animate)
  handleControls()

  while  (lag >= frameTime) {
    backgroundFlorest.update()
    backgroundFlorest.playMusic()

    charUI.update()

    skeleton1.update()
    // rogue1.update()

    player1.update()
    catFamiliar.update()

    lag -= frameTime
  }

}