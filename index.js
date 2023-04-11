const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1.5

class Player {
    constructor(){
            this.position = {
                x:100,
                y:100
        }
            this.velocity = {
                x:0,
                y:0
            }

            this.width =50
            this.height = 50 
        }

      draw(){
          c.fillStyle = '#539460'
          c.fillRect(this.position.x, 
            this.position.y, 
            this.width, 
            this.height)
      }

      update(){
            this.draw()
            this.position.y += this.velocity.y

        if (this.position.y + this.height + 
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    else    this.velocity.y = 0
             
      }
}

const player = new Player()


function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}


animate()

window.addEventListener('keydown', ({keyCode}) => {
   // console.log(keyCode)
    switch (keyCode) {
        case 38:
            console.log('Up')
            player.velocity.y -= 20
            break

            case 39:
                console.log('Right')
                break

                case 37:
                    console.log('Left')
                    break

                    case 40:
                    console.log('Down')
                    break
    }
})