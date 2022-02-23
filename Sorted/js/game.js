var canvas = document.querySelector('canvas');
  function scaleCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
var ctx = canvas.getContext('2d');
scaleCanvas();
var tileGrid = new TileGrid(7,4,innerWidth,innerHeight);
// var tiles = [];
// tiles.push(new Tile(new Position(innerWidth/2-40,innerHeight/2-40),'#08F',80));
  //*************************************************
  //*************************************************
function animate(){
  window.requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  //ctx.fillRect(innerWidth/2-30,innerHeight/2-30,60,60);
  tileGrid.update(ctx);
}
  //*************************************************
  //*************************************************

  function GetSelected(x,y){
    //We want to know on mouse down which tile we are on
    // later we'll introduce the grid concept and check for column and rows
    // for(var i = 0; i < tiles.length; i++){
    //   let p = tiles[i].pos, s = tiles[i].scale;
    //   if(x < p.x+s && x > p.x && y < p.y+s && y > p.y){
    //     tiles[i].selected = true;
    //   }
    // }
    if(tileGrid){tileGrid.gatherSelected(x,y);}
  }

  function ClearSelected(){
    // for(var i = 0; i < tiles.length; i++){
    //   tiles[i].selected = false;
    // }
    if(tileGrid){tileGrid.clearSelected();}
  }

//*** INPUT SECTION **//
  window.addEventListener('keyup',function(e){
      console.log(e.keyCode);
  });

  window.addEventListener('resize',function(evt){
      evt.preventDefault();
      scaleCanvas();
      if(tileGrid){tileGrid.init(innerWidth,innerHeight);}
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
      GetSelected(current.x,current.y);
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
      ClearSelected();
  }
animate();
