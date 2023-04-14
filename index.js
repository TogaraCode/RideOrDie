const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1

let avatarImage = new Image()
avatarImage.src = './public/img/alien.png'

let platformImage = new Image()
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
      y: 100,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.width = 666
    this.height = 666
    this.image = avatarImage
  }

  draw() {
    c.drawImage(this.image, 
      this.position.x, this.position.y, 
      this.width, this.height)
  }

  update() {
    let prevX = this.position.x
    let prevY = this.position.y

    if (keys.up.pressed) {
      this.velocity.y -= 5
    }
    
    if (keys.down.pressed) {
      this.velocity.y += 5
    }
    
    if (this.position.y + this.height < canvas.height) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.x < 0) {
      this.position.x = 0
    } else if (this.position.x + this.width > canvas.width) {
      this.position.x = canvas.width - this.width
    }

    if (this.position.y < 0) {
      this.position.y = 0
    } else if (this.position.y + this.height > canvas.height) {
      this.position.y = canvas.height - this.height
    }
  }
}

class Platform {
  constructor(options) {
    this.position = {
      x: options.x,
      y: options.y,
    }
    this.width = options.width;
    this.height = options.height;
    this.image = new Image();
    this.image.src = options.image;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.x -= 5;
  }
}


function init() {
  let platforms = [];
  for (let i = 0; i < 5; i++) {
    let x = canvas.width + Math.random() * canvas.width;
    let y = canvas.height - 200 - Math.random() * 300;
    let width = 200;
    let height = 50;
    let image = platformImage.src;
    platforms.push(new Platform({ x, y, image, width, height }));
  }
  let player = new Player();
  return { player, platforms };
}

let { player, platforms } = init()
animate(player, platforms)

function animate(player, platforms) {
  requestAnimationFrame(() => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();

    platforms.forEach((platform) => {
      platform.update();
      platform.draw();
    });

    animate(player, platforms);
  });
}

const image = new Image();
image.onload = function() {
  
};
image.onerror = function() {
  image.src = './public/soloSpaceJet3d.png';
};

const playerSpeed = 5;

addEventListener('keydown', ({ code }) => {
  switch (code) {
    case 'ArrowUp':
      player.velocity.y = -playerSpeed;
      break;
    case 'ArrowDown':
      player.velocity.y = playerSpeed;
      break;
    case 'ArrowLeft':
      player
.velocity.x = -playerSpeed;
      break;
    case 'ArrowRight':
      player.velocity.x = playerSpeed;
      break;
  }
});

addEventListener('keyup', ({ code }) => {
  switch (code) {
    case 'ArrowUp':
    case 'ArrowDown':
      player.velocity.y = 0;
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
      player.velocity.x = 0;
      break;
  }
});