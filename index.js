const canvas = document.querySelector('canvas' )
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1

let avatarImage = new Image();
avatarImage.src = './public/img/alien.png'

let platformImage = new Image();
platformImage.src = './public/img/soloSpaceJet3d.png'


let keys = {
  up: { pressed: false },
  down: { pressed: false },
  left: { pressed: false },
  right: { pressed: false },
}

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 666
    this.height = 666
    this.image = avatarImage 
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
  }
}

function init() {
    let player = new Player()
  
    let platforms = [
      new Platform({
        x: 40,
        y: 40,
        image: platformImage
      }),
      new Platform({
        x: platformImage.width - 3,
        y: 270,
        image: platformImage
      }),
      new Platform({
        x: platformImage.width * 2 + 100,
        y: 470,
        image: platformImage
      })
    ]
  
    return { player, platforms } 
  }

let { player, platforms } = init() 

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  platforms.forEach((platform) => {
    platform.draw()
  })

  player.update()

  
  if (keys.right.pressed) {
    platforms.forEach((platform) => {
      platform.position.x -= 5
    })
  } else if (keys.left.pressed) {
    platforms.forEach((platform) => {
      platform.position.x += 5
    })
  }

 
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0
      player.position.y = platform.position.y - player.height
    }
  })

 
  if (platforms[2].position.x + platforms[2].width < 0) {
    console.log('you win')}

if (player.position.y > canvas.height) {
    init()
}}

animate()

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 38:
        console.log('up')
        keys.up.pressed = true
        player.velocity.y -= 25
        break
      case 39:
        console.log('right')
        keys.right.pressed = true
        player.velocity.x += 5 
        break
      case 37:
        console.log('left')
        keys.left.pressed = true
        player.velocity.x -= 5 
        break
      case 40:
        console.log('down')
        keys.down.pressed = true
        break
    }
  })
  addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
      case 38:
        player.velocity.y = 20
        break
      case 39:
        player.velocity.x = 0 
        break
      case 37:
        player.velocity.x = 0 
        break
      case 40:
        keys.down.pressed = false
        break
    }
  })
  
  