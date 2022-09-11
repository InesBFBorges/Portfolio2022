const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

let cwidth, cheight;
const dots = [];
const RACIO_DOTS = 0.15;
const dotCounter = window.innerHeight < window.innerWidth ? window.innerHeight * RACIO_DOTS : window.innerWidth * RACIO_DOTS; ;
const maxVal = 1200;

window.onresize = function() { reset(); }
reset();
function reset() {

  cwidth = window.innerWidth;
	cheight = window.innerHeight;
	c.width = cwidth;
	c.height = cheight;

  const dotCounter = window.innerHeight < window.innerWidth ? window.innerHeight * RACIO_DOTS : window.innerWidth * RACIO_DOTS; ;
  dots.length = 0;
  while (dots.length < dotCounter) { newDot(true); } 

}

function newDot(start=false) {
  
  const dot = {};
  dot.grow = true;
  dot.valMax = Math.floor(Math.random() * 200);
  dot.val = start ? Math.floor(Math.random() * dot.valMax) : 0;
  dot.x = Math.round(Math.random() * cwidth);
  dot.y = Math.round(Math.random() * cheight);
  dot.xoff = (Math.random() - 0.5) * 3;
  dot.yoff = (Math.random() - 0.5) * 3;
    
  dots.push(dot);
}

Run();
function Run() {
      
  // ctx.clearRect(0, 0, cwidth, cheight);
  ctx.fillStyle = "rgba(51,51,51,0.05)";
  ctx.fillRect(0, 0, cwidth, cheight);

  if (dots.length < dotCounter) { newDot(); } 
  
  for (let ix = 0 ; ix < dots.length ; ix++) {
    
    let dot = dots[ix];

    dot.x += dot.xoff;
    dot.y += dot.yoff;
    
    if (!dot.grow || (dot.x < 0) || (dot.x > cwidth) || (dot.y < 0) || (dot.y > cheight)) {

      if (dot.val > 0) {
        dot.val -= 1;
      } else {
        dots.splice(ix, 1);
        continue;
      }

    } else if (dot.val < dot.valMax) {
      dot.val += 1;
    } else {
      dot.grow = false;
    }

    for (let jx = ix+1 ; jx < dots.length ; jx++) {

      let jdot = dots[jx];
      let dist = Math.sqrt(Math.pow(Math.abs(dot.x - jdot.x), 2) + Math.pow(Math.abs(dot.y - jdot.y), 2));
      
      if (dist < 150) {
        
        const linclr = (1 - (dist/150)) * (dot.val / dot.valMax) * (jdot.val / jdot.valMax);
        
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(jdot.x, jdot.y);
        // ctx.strokeStyle = 'rgba(102, 153, 204, ' + linclr +')';
        ctx.strokeStyle = 'hsla(230 100% 80% / ' + linclr + ')';
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(Run);
  //setTimeout(function(){ Run(); }, 60);
}