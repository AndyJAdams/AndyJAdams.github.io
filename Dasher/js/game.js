
//Globals
var tileScale = 80;
var spacing = tileScale * 0.1;
var center = {x:0,y:0};
var dir = 0; //1 = up, 2 = right, 3 = down, 4 = left, 0 = stop

var canvas = document.querySelector('canvas');
  function scaleCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  center = {x: innerWidth/2,y: innerHeight/2};
}
var ctx = canvas.getContext('2d');
scaleCanvas();

var grid = new Grid(5,5,tileScale,tileScale,center.x, center.y);
var unit = new Unit(2,2,new Pos(grid.pos[2][2].x,grid.pos[2][2].y), tileScale/2);

  //*************************************************
  //*************************************************
function animate(){
  window.requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  grid.draw(ctx);
  unit.update();

  //// DEBUG:
  ctx.fillText("Dir:"+dir,20,20);
}
  //*************************************************
  //*************************************************

//*** INPUT SECTION **//
  window.addEventListener('keyup',function(e){
      console.log(e.key);
      if(dir == 0){
        switch(e.key){
          case 'ArrowUp': dir = 1; break;
          case 'ArrowDown': dir = 3; break;
          case 'ArrowLeft': dir = 4; break;
          case 'ArrowRight': dir = 2; break;
          default: dir = 0; break;
        }
      }
  });

  window.addEventListener('resize',function(evt){
      evt.preventDefault();
      scaleCanvas();
  });


  window.addEventListener('mousedown',inputStart,false);
  window.addEventListener('mousemove',inputMove,false);
  window.addEventListener('mouseup',inputEnd,false);

  window.addEventListener('touchstart',inputStart, false);
  window.addEventListener('touchmove', inputMove,false);
  window.addEventListener('touchcancel',inputEnd,false);
  window.addEventListener('touchend',inputEnd,false);

  var start = {x:-1,y:-1};
  var current = {x:-1,y:-1};
  function inputStart(evt){
      evt.preventDefault();
      if(evt.changedTouches != undefined){
          var touches = evt.changedTouches;
          if(touches.length > 0){
              start.x = touches[0].pageX;
              start.y = touches[0].pageY;
          }
      } else {
          start.x = evt.pageX;
          start.y = evt.pageY;
      }
      current.x = start.x;
      current.y = start.y;
  }

  function inputMove(evt){
      evt.preventDefault();
      if(start.x > -1){
          if(evt.changedTouches != undefined){
              var touches = evt.changedTouches;
              if(touches.length > 0){
                  current.x = touches[0].pageX;
                  current.y = touches[0].pageY;
              }
          } else {
              current.x = evt.pageX;
              current.y = evt.pageY;
          }
      }
  }

  function inputEnd(){
      start.x = -1;
  }
animate();
