var canvas = document.querySelector('canvas');
  function scaleCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
var ctx = canvas.getContext('2d');
scaleCanvas();

var tiles = [];
tiles.push( new Tile(ctx,innerWidth/2-130,innerHeight/2-130,120,120,2));
tiles.push( new Tile(ctx,innerWidth/2,innerHeight/2-130,120,120,1));
tiles.push( new Tile(ctx,innerWidth/2+130,innerHeight/2-130,120,120,0));

  //*************************************************
  //*************************************************
function animate(){
  window.requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);

  for(let i = 0; i < tiles.length; i++){
    if(tiles[i].initialized){
      tiles[i].update();
    }
  }
}
  //*************************************************
  //*************************************************


//*** INPUT SECTION **//
  window.addEventListener('keyup',function(e){
      console.log(e.keyCode);

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
  var current = {x:-1,y:-1,d:0};
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

      for(let i = 0; i < tiles.length; i++){
        tiles[i].init();
      }

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
