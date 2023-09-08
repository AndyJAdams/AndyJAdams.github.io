var canvas = document.querySelector('canvas');

function scaleCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
scaleCanvas();
var ctx = canvas.getContext('2d');

var rotate = false;

var points = [];
points.push(new Point(innerWidth/2,innerHeight/2));
points.push(new Point(innerWidth/2,innerHeight/2-20,points[0],1,true));
points.push(new Point(innerWidth/2,innerHeight/2-25,points[1],2.5));
points.push(new Point(innerWidth/2,innerHeight/2-40,points[2],4,true,"#F0F"));

//This is the game loop
function ANIMATE(){
  window.requestAnimationFrame(ANIMATE);
  ctx.clearRect(0,0,innerWidth,innerHeight);

  if(rotate){
    //Draw points
    for(var i = 0; i < points.length; i++){
      points[i].update();
    }
  }
  //Draw links
  for(var a = 1; a < points.length; a++){
    points[a].drawLink();
  }
  //Draw trails
  for(var b = 1; b < points.length; b++){
    points[b].drawTrail();
  }
  //Draw points
  for(var c = 0; c < points.length; c++){
    points[c].draw();
  }
}
