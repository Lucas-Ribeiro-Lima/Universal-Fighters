const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const canvasWidth = 1024
const canvasHeight = 576

canvas.width = canvasWidth
canvas.height = canvasHeight

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
      background.update()
      player1.update()
      // player2.update()

      lag -= frameTime
  }

}