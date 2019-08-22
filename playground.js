var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var portrait = false;
var prevPortrait = portrait;
var displayDebug = false;

function scaleCanvas(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight-4;

    portrait = innerHeight > innerWidth;
    DEBUG.log("Scale Change");
    if(portrait != prevPortrait){
        orientBits();
        prevPortrait = portrait;
        DEBUG.log("Orientation Adjusted:: Portrait: "+ portrait);
    }
}

function Debug(x,y,size){
	this.x = x;
	this.y = y;
	this.msg = [];
	this.fontSize = size;
	this.msg.push('');

	this.draw = function(){
		for(var i = 0; i < this.msg.length; i++){
			ctx.font=this.fontSize+' sans-serif';
			ctx.fillStyle='#DDD';
            var newY = this.y + (i*(this.fontSize+5));
            if(newY<this.y+200){
                ctx.fillText(this.msg[i], this.x, newY);
            }
		}
	}

	this.log = function(msg){
		this.msg.unshift(msg);
	}
}

var DEBUG = new Debug(10,50,15);

function Bit(x,y,color){
    this.x = x;
    this.y = y;
    this.color= color;
    this.port = false;
    
    this.draw = function(){
        ctx.fillStyle= this.color;
	    ctx.fillRect((innerWidth/2)+this.x, (innerHeight/2)+this.y, 4,4);
    }
    
    this.update = function(){
        this.draw();
    }
    
    this.orient = function(){
        var w = this.x;
        this.x = this.y;
        this.y = w;
    }
}

var bits = [];
bits.push(new Bit(-30,0,'#DDD'));
bits.push(new Bit(30,0,'#DDD'));

function Link(startBit,endBit, mode){
	this.start = startBit;
	this.end = endBit;
	this.mode = mode;

	this.draw = function(){
		ctx.lineWidth = 1;
		ctx.strokeStyle='#DDD';
		ctx.beginPath();
		ctx.moveTo((innerWidth/2)+this.start.x+2, (innerHeight/2)+this.start.y+2);
		ctx.lineTo((innerWidth/2)+this.end.x+2, (innerHeight/2)+this.end.y+2);
		ctx.stroke();
		ctx.closePath();
	}

	this.update = function(){
		this.draw();
	}
}

var links = [];
links.push(new Link(bits[0],bits[1],0));
links.push(new Link(bits[1],bits[0],0));

function updateBits(){
    for(var i =0; i < bits.length; i++){
        bits[i].update();
    }
}

function updateLinks(){
	for(var i = 0; i < links.length; i++){
		links[i].update();
	}
}

function orientBits(){
    for(var i = 0; i < bits.length;i++){
        bits[i].orient();
    }
}



function animate(){
	window.requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	ctx.fillStyle='#222';
	ctx.fillRect(0,0,innerWidth,innerHeight);
    
    updateBits();
    updateLinks();

    if(displayDebug){
		DEBUG.draw();
	}
}


var sx, sy; //Start Input
var cx, cy; //Current Input
var ex, ey; //Ending Input

window.addEventListener('resize', function(){
	scaleCanvas();
});

//Mouse
window.addEventListener('mousedown', function(evt){
	evt.preventDefault();
	sx = evt.pageX;
	sy = evt.pageY;
},false);
window.addEventListener('mousemove', function(evt){
	evt.preventDefault();
	cx = evt.pageX;
	cy = evt.pageY;
},false);

window.addEventListener('mouseup', function(evt){
	evt.preventDefault();
    	ex = evt.pageX;
	ey = evt.pageY;
	HandleDrag(sx,sy,ex,ey);
},false);

//Keyboard
window.addEventListener('keyup',function(evt){
	evt.preventDefault();
	DEBUG.log("KEY: " + evt.keyCode + " \n");
});

//Touch
window.addEventListener('touchstart', function(evt){
    evt.preventDefault();
	sx = evt.changedTouches[0].pageX;
    sy = evt.changedTouches[0].pageY;
}, false);

window.addEventListener('touchmove', function(evt){
    evt.preventDefault();
    cx = evt.changedTouches[0].pageX;
    cy = evt.changedTouches[0].pageY; 
}, false);

window.addEventListener('touchcancel', function(evt){
    evt.preventDefault();
    sx = sy = cx = cy = ex = ey = -1;
    DEBUG.log("Touch Event Cancelled " + sx);
}, false);

//User has removed finger... let's figure out the desired action here. 
window.addEventListener('touchend', function(evt){
    evt.preventDefault();
    ex = evt.changedTouches[0].pageX;
    ey = evt.changedTouches[0].pageY; 
	HandleDrag(sx,sy,ex,ey);
}, false);

var lastInputCall = 0;
function HandleDrag(sx,sy,ex,ey){
	var d = Math.sqrt(Math.pow(Math.abs(sx-ex),2)+Math.pow(Math.abs(sy-ey),2));
	if(d > 50){
		var horz = Math.abs(sx-ex);
		var vert = Math.abs(sy-ey);
		if(horz > vert){
			if(sx < ex){ //RIGHT	
				DEBUG.log("RIGHT");
			} else { //LEFT
				DEBUG.log("LEFT");
			}
		} else {
			if(sy < ey){ //DOWN
				DEBUG.log("DOWN");
			} else { //UP
				DEBUG.log("UP");
			}
		}
	} else {
		var now = Date.now();
		if(now-lastInputCall < 250){
			displayDebug = !displayDebug;
		}
		lastInputCall = now;
	}
}
scaleCanvas();
animate();