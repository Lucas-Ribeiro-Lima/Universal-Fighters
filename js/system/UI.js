const charUIPath = "../assets/interface/charUI.png"
const portraitUIPath = "../assets/portrait/mainChar.png"
const lifeBarPath = "../assets/interface/lifebar.png"
const manaBarPath = "../assets/interface/manabar.png"
const staminaBarPath = "../assets/interface/staminabar.png"

const charUI = new Interface({
  position: {
    x: 0,
    y: 0,
  },
  scale: 2,
  source: charUIPath,
  portraitSrc: portraitUIPath
})

const lifeBarUI = new StatusUI({
  position: {
    x: 89,
    y: 25,
  },
  scale: 2,
  source: lifeBarPath
})

const manaBarUI = new StatusUI({
  position: {
    x: 89,
    y: 65,
  },
  scale: 2,
  source: manaBarPath
})

const staminaBarUI = new StatusUI({
  position: {
    x: 89,
    y: 45,
  },
  scale: 2,
  source: staminaBarPath
})

function drawInterface() {
  charUI.update()
  lifeBarUI.update()
  manaBarUI.update()
  staminaBarUI.update()
}