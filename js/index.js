const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const portfolio_text = document.querySelector(".portfolio-text");
const picture = document.querySelector(".picture");
const button_container = document.querySelector(".button-container");
const theme_btn = document.querySelector(".theme-btn");
const body = document.documentElement.children[1];

let particle_array = [];
let text_position_y = null;
let image_data_height = canvas.width * 0.2;
let textCoordinates = null;
let theme_btn_turn = 0;

const mouse = {
  x: null,
  y: null,
  radius: canvas.width * 0.03
}

theme_btn.addEventListener("click", function(){
	const span = this.querySelector("span");
  if(theme_btn_turn % 2 == 0)
    span.innerText = "🌑 Dark 🌑";
  else
    span.innerText = "☀️ Light ☀️";
  theme_btn_turn++;
});

// portfolio_text.style.top = `${image_data_height}px`;
// picture.style.top = `${image_data_height + 20}px`;
// button_container.style.top = `${getImageWidth()}px`;

window.addEventListener("mousemove", function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function(event){
  canvas.width = event.target.innerWidth;
  canvas.height = event.target.innerHeight;
  mouse.radius = canvas.width * 0.03;
  image_data_height = canvas.width * 0.2;

	if(window.innerWidth < 500){
		body.style.paddingTop = "12vh";
  }

//   portfolio_text.style.top = `${image_data_height}px`;
//   picture.style.top = `${image_data_height + 20}px`;
//   button_container.style.top = `${getImageWidth()}px`;
  drawText();
  init();
  animate();
});

drawText();

// function getImageWidth(){
//   let width = canvas.height * 0.15 + canvas.width * 0.1;
//   if(width < 120)
//     width = 120;
//   else if(width > 300)
//     width = 300;
  
//   return width;
// }

class Particle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x; // Will aquire the initial position of the particle
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1; // How much the particle weights
  }
  draw(color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
    ctx.lineTo(this.x, this.y + this.size);
    ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
    ctx.closePath();
    ctx.fill();
  }
  update(){
    let dx = mouse.x - this.x;
    let dy =  mouse.y -  this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance =  mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    
    if(distance < maxDistance){
      this.x -= directionX;
      this.y -= directionY;
    }else{
      let forceReturn = 10;
      if(this.x !== this.baseX){
        let dxReturn = this.x - this.baseX;
        this.x -= dxReturn / forceReturn;
      }
      if(this.y !== this.baseY){
        let dyReturn = this.y - this.baseY;
        this.y -= dyReturn / forceReturn;
      }
    }
  }
}

function drawText(){
  if(window.innerWidth * 0.8 < 16){
    ctx.font = "16px Verdana";
  }else{
    ctx.font = "8vw Verdana";
  }
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
	if(window.innerWidth < 500){
		text_position_y = 50;
		body.style.paddingTop = "12vh";
  }else{
		text_position_y = window.innerHeight * 0.10;
  }
  ctx.fillText("Inês Borges", canvas.width / 2, text_position_y, 500);
  textCoordinates = ctx.getImageData(0, 0, canvas.width, image_data_height);
}

function init(){
  particle_array = [];
  for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
    for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
      if(textCoordinates.data[(y * 4 * textCoordinates.width) + x * 4 + 3] > 128){
        let positionX = x;
        let positionY = y;
        particle_array.push(new Particle(positionX, positionY));
      }
    }
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < particle_array.length; i++){
    var color = 'hsl(230 70% ' + (Math.random() * 30 + 70) + '%)';
    particle_array[i].draw(color);
    particle_array[i].update();
  }
  requestAnimationFrame(animate);
}

init();
animate();