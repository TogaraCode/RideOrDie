const canvas = document.querySelector('canvas' )
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1.5






const avatarImage = new Image();
avatarImage.src = '../public/img/alien.png'

let avatarImageX = 0;
let avatarImageY = 0;




class Player {
    constructor(){
        
            this.position = {
                x:0,
                y:0
        }
            this.velocity = {
                x:0,
                y:0
            }

            this.width =5
            this.height = 5,
            this.avatarImage = (avatarImage)
        
        }

      draw() {
      c.drawImage(this.avatarImage, this.position.x, this.position.y)
      }

      update(){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

        if (this.position.y + this.height + 
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    else    this.velocity.y = 0
             
      }
}

class Platform {
    constructor() {
         this.position = {
             x:0,
             y:0
         }
         this.width = 20
         this.height = 20
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, 
                this.position.y, 
                this.width, 
                this.height)
    }
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

const player = new Player();
const platform = new Platform();

function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platform.draw()

    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed){
        player.velocity.x = -5
    }
    else player.velocity.x = 0
}


animate()

addEventListener('keydown', ({keyCode}) => {
 
    switch (keyCode) {
        case 38:
            
            player.velocity.y -= 15
            break

            case 39:
              
                keys.right.pressed = true
                break

                case 37:
                    
                    keys.left.pressed = true
                    break

                    case 40:
                
                    keys.down.pressed = true
                    break
    }
})
addEventListener('keyup', ({keyCode}) => {
    
     switch (keyCode) {
         case 38:
             
             player.velocity.y -= 15
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
     }
    
 })