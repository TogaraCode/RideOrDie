const canvas = document.querySelector('canvas' )
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1

const avatarImage = new Image();
avatarImage.src = '../public/img/alien.png'

const platform = new Image();
platform.src = '../public/img/soloSpaceJet3d.png'

class Player {
    constructor(){
        
            this.position = {
                x:100,
                y:100
        }
            this.velocity = {
                x:0,
                y:0
            },

            this.width = 30
            this.height = 30
            this.image = createImage(avatarImage)
        };

      draw() {
      c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
      }

      update(){
            this.draw()
            this.position.y += this.velocity.y

        if (this.position.y + this.height + 
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    else    
    this.velocity.y = 0
             
      }
}




class Platform {
    constructor({x, y, image}) {
         this.position = {
             x,
             y
         }
         this.image =image
         this.width = image.width
         this.height= image.height
        
         
         this.image  = image
    }
;
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)  
    }
}

function createImage(imageSrc){
    const image = new Image()
    image.src = imageSrc
    return image
}

function init() {
    const platformImage = createImage(platform)



const image = new Image()
image.src = platform
console.log(image)

const player = new Player()
const platforms = [new Platform({
    x:200,
    y: 100,
    image: platformImage
}),
new platform({x:platformImage.width -3, y: 470,image: platformImage}),
new platform({x:platformImage.width *2 +100, y: 470, image: platformImage})
]
}


const keys = {
    right: {
        pressed:false
    },
    left: {
        pressed:false
    },
    up: {
        pressed:false
    },
    down: {
        pressed:false
    },
}


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
    
if (keys.right.pressed) {
    scrollOffset += 5
    platforms.forEach((platform)  => {
        platform.position.x -= 5
    })
} else if  (keys.left.pressed) {
    platforms.forEach((platform) => {
        platform.position.x += 5
    })
}


platforms.forEach((platform) => {
    if (player.position.y + player.height <= 
    platform.position.y && player.position.y + player.height + player.velocity.y && player.position.x + player.width  
    >= platform.position && player.position.x <= platform.position.x + platform.width) {
    player.velocity.y = 0 
}
})

if (scrollOffset > platformImage.width * 5 + 300 - 2 ) {
    console.log('you win')
}

if (player.position.y > canvas.height) {
    init()
}}
init()
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
                
                break

                case 37:
                    console.log('left')
                    keys.left.pressed = true
                    break

                    case 40:
                        console.log('down')
                    keys.down.pressed = true
                    break
    }
})
addEventListener('keyup', ({keyCode}) => {
    
    switch (keyCode) {
        case 38:
            
            player.velocity.y -= 20
            break

            case 39:
                
                keys.right.pressed = false
                break

                case 37:
    
                    keys.left.pressed = false
                    break

                    case 40:
                    
                    keys.down.pressed = false
                    break
    }})}