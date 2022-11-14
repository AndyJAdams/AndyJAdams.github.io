var canvas = document.querySelector('canvas');
function scaleCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
var ctx = canvas.getContext('2d');
scaleCanvas();
var game = new Game();

//*************************************************
//*************************************************
function animate(){
  window.requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);

  if(!game){
    game = new Game();
  } else {
    game.update();
    ctx.fillText(game.currency, 20,20);
  }
}
//*************************************************
//*************************************************

  

function GetSelected(x,y){
//TODO: Get selected object here
    if(game){
        for(let i = 0;i < game.units.length; i++){
            if(Math.abs(Math.sqrt(Math.pow(x-game.units[i].x,2)+Math.pow(y-game.units[i].y,2))) < game.units[i].r){
                selected = game.units[i];
            }
        }
    }
    if(selected){
        selected.selected = true;
    }
}

var selected = undefined;
function ClearSelected(){
    selected = undefined;
    for(let i = 0;i < game.units.length; i++){
        game.units[i].selected = false;
    }
}

//*** INPUT SECTION **//
window.addEventListener('keyup',function(e){
    console.log(e.key);
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
var end = {x: -1, y:-1};
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

function inputEnd(evt){
    //TODO: determined off where the end is make a selection or ignore input
    if(start.x > -1){
        if(evt.changedTouches != undefined){
            var touches = evt.changedTouches;
            if(touches.length > 0){
                end.x = touches[0].pageX;
                end.y = touches[0].pageY;
            }
        } else {
            end.x = evt.pageX;
            end.y = evt.pageY;
        }
        if(selected != undefined){
            
        }
    }
    ClearSelected();
    start.x = -1;
}

animate();
