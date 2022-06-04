const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

const particlesArray = [];
let fillStyleDraw = `hsl(230, 100%, ${Math.random() * 50 + 50}%)`;
let fillStyleAnimate = 'rgba(51,51,51,0.02)';

canvas.width = window.innerWidth;
canvas.height =  window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height =  window.innerHeight;
});

const mouse = {
  x: null,
  y: null
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for(let i = 0; i < 5; i++){
    particlesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 9 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.size >= 0.2) this.size -= 0.1;
  }
  draw(){
    ctx.fillStyle = `hsl(230, 100%, ${Math.random() * 50 + 50}%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles(){
  for(let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update();
    particlesArray[i].draw();
    if(particlesArray[i].size < 0.3){
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate(){
  ctx.fillStyle = fillStyleAnimate;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();