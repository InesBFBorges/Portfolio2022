const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height =  window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'hsl(230 100% 90%)');
gradient.addColorStop(0.2, 'hsl(230 100% 80%)');
gradient.addColorStop(0.4, 'hsl(230 100% 70%)');
gradient.addColorStop(0.6, 'hsl(230 100% 60%)');
gradient.addColorStop(0.8, 'hsl(230 100% 50%)');
gradient.addColorStop(1, 'hsl(230 100% 40%)');

class Symbol {
  constructor(x, y, fontSize, canvasHeight){
    this.characters = '01';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
  }
  draw(context){
    this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    context.fillText(this.text,  this.x * this.fontSize, this.y * this.fontSize);
    if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
      this.y = 0;
    }else {
      this.y += 1;
    }
  }
}

class Effect { 
  constructor(canvasWidth, canvasHeight){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
  #initialize(){
    for(let i = 0; i < this.columns; i++){
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width, height){
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 60;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if(timer > nextFrame){
    ctx.fillStyle = 'rgba(51,51,51,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient; //'hsl(230 100% 80%)';
    ctx.font = effect.fontSize + 'px monospace';
    effect.symbols.forEach(symbol => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }
  
  requestAnimationFrame(animate);
}

animate(0);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height =  window.innerHeight;
  effect.resize(canvas.width, canvas.height);
});

// ---------------------------------------

const descriptions = ["This project was made as an introduction to React and PWAS.\nI learned about state, props, ids and much more...\nYou can install the app as a native app on your mobile phone."];

let currentPhrase = [];
let description = descriptions[0];

const moreBtn = document.querySelector(".more-btn.my-inventory");
const lessBtn = document.querySelector(".less-btn.my-inventory");
const p = document.querySelector(".project-description.my-inventory");
let i = 0;
moreBtn.addEventListener("click", function(){
  i = 0;
  p.style.display = "block";
  currentPhrase = [];
  moreBtn.style.display = "none";
  lessBtn.style.display = "block";
  loop();
});

lessBtn.addEventListener("click", function() {
  i = description.lenght;
  p.style.display = "none";
  moreBtn.style.display = "block";
  lessBtn.style.display = "none";
});

// Links to images
const imageMyInventory =  document.querySelector(".image-my-inventory");
imageMyInventory.addEventListener("click", () => {
    window.open('https://inventorying.netlify.app/', '_blank');
});

function loop(){
  if(i < description.length){
    currentPhrase.push(description[i]);
    p.innerText = currentPhrase.join('');
    setTimeout(loop, Math.random() * 100 + 50);
    i++;
  }
}