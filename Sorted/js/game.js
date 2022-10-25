var canvas = document.querySelector('canvas');
  function scaleCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
var ctx = canvas.getContext('2d');
scaleCanvas();

var tileGrid = undefined;
var dragSensitivity = 25;
  //*************************************************
  //*************************************************
function animate(){
  window.requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  //ctx.fillRect(innerWidth/2-30,innerHeight/2-30,60,60);
  if(!tileGrid){
    //console.log(localStorage.getItem('sortedGameKey'));
    //this returns null
    // tileGrid = new TileGrid(9,6,innerWidth,innerHeight);
    // tileGrid.init(innerWidth,innerHeight);
    init();
  }
  tileGrid.update(ctx);
  if(tileGrid.validate()){
    //Yay we won - for now let's init again
    //reset();
    if(tileGrid.retire(ctx)){
        console.log("CHICKEN DINNER");
        reset();
    }
  }

}
  //*************************************************
  //*************************************************

  function init(){
    let raw = localStorage.getItem('sortedGameKey');
    if(raw != null){
      var keyData = raw.split('_');
      tileGrid = new TileGrid(keyData[0],keyData[1],innerWidth,innerHeight);
      tileGrid.init(innerWidth,innerHeight,keyData.slice(2));
      return;
    }
    let x = Math.floor(Math.random()*2)+2;
    let y = Math.floor(Math.random()*4)+2;
    tileGrid = new TileGrid(y,x,innerWidth,innerHeight);
    tileGrid.init(innerWidth,innerHeight);
  }

  function reset(){
    localStorage.clear();
    tileGrid = undefined;
    let x = Math.floor(Math.random()*4)+2;
    let y = Math.floor(Math.random()*6)+2;
    tileGrid = new TileGrid(y,x,innerWidth,innerHeight);
    tileGrid.init(innerWidth,innerHeight);
    localStorage.setItem('sortedGameKey',tileGrid.compressData());
  }

  function GetSelected(x,y){
    if(tileGrid){tileGrid.gatherSelected(x,y);}
  }

  function ClearSelected(){
    if(tileGrid){
      if(current.d == -1){
        tileGrid.snap(current.y-start.y,-1);
      }  else if(current.d == 1){
        tileGrid.snap(current.x-start.x,1);
      }
      tileGrid.clearSelected();
    }
  }

//*** INPUT SECTION **//
  window.addEventListener('keyup',function(e){
      console.log(e.keyCode);
      if(e.keyCode == '73'){
        let key = localStorage.getItem('sortedGameKey');
        console.log("KEY:"+key);
      }
      if(e.keyCode == '67'){
        localStorage.clear();
        console.log("KEY CLEARED");
      }
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

          if(tileGrid){
            let xdif = Math.abs(start.x-current.x);
            let ydif = Math.abs(start.y-current.y);
            if(ydif > dragSensitivity && xdif > dragSensitivity && current.d != 1){
              //We prefer the vertical
              current.d = -1;
              tileGrid.cycleColumn(current.y-start.y);
            } else if(ydif > dragSensitivity  && current.d != 1){
              current.d = -1;
              tileGrid.cycleColumn(current.y-start.y);
            } else if(xdif > dragSensitivity  && current.d != -1){
              current.d = 1;
              tileGrid.cycleRow(current.x-start.x);
            }
          }
      }
  }

  function inputEnd(){
      ClearSelected();
      current.d = 0;
      start.x = -1;
      if(tileGrid){
        var data = tileGrid.compressData();
        localStorage.setItem('sortedGameKey',data);
      }
  }


var levelData = [
  
];

animate();
