var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function scaleCanvas(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight-4;
}

scaleCanvas();

function Debug(x,y,size){
	this.x = x;
	this.y = y;
	this.msg = [];
	this.fontSize = size;
	this.msg.push('');

	this.draw = function(){
		for(var i = 0; i < this.msg.length; i++){
			ctx.font=this.fontSize+' sans-serif';
			ctx.fillStyle='#000';
			ctx.fillText(this.msg[i], this.x, this.y+(i*(this.fontSize+5)));
			if(this.y+(i*(this.fonSize+5))>innerHeight){
				this.msg.shift();
			}
		}
	}

	this.log = function(msg){
		this.msg.push(msg);
	}
}

var DEBUG = new Debug(10,30,15);

function animate(){
	window.requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);

	ctx.fillStyle='#000';
	ctx.fillRect(10,10,10,10);

	ctx.fillStyle='#444';
	ctx.fillRect(innerWidth-20,10,10,10);

	ctx.fillStyle='#888';
	ctx.fillRect(innerWidth-20,innerHeight-20,10,10);

	ctx.fillStyle='#CCC';
	ctx.fillRect(10,innerHeight-20,10,10);

	
	DEBUG.draw();
}

var mx, my;
var sx, sy;


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
	mx = evt.pageX;
	my = evt.pageY;
},false);

window.addEventListener('mouseup', function(evt){
	evt.preventDefault();
	var d = Math.sqrt(Math.pow(Math.abs(sx-mx),2)+Math.pow(Math.abs(sy-my),2));
	DEBUG.log("MOUSE DRAG " + d + "px \n");
},false);

//Keyboard
window.addEventListener('keyup',function(evt){
	evt.preventDefault();
	DEBUG.log("KEY: " + evt.keyCode + " \n");
});

//Touch
window.addEventListener('touchstart', function(evt){
    evt.preventDefault();
	mx = evt.changedTouches[0].pageX;
    my = evt.changedTouches[0].pageY;
    sx = mx;
    sy = my;
}, false);

window.addEventListener('touchmove', function(evt){
    evt.preventDefault();
    mx = evt.changedTouches[0].pageX;
    my = evt.changedTouches[0].pageY; 
}, false);

window.addEventListener('touchcancel', function(evt){
    evt.preventDefault();
}, false);

//User has removed finger... let's figure out the desired action here. 
window.addEventListener('touchend', function(evt){
    evt.preventDefault();
	var d = Math.sqrt(Math.pow(Math.abs(sx-mx),2)+Math.pow(Math.abs(sy-my),2));
	console.log("TOUCH DRAG " + d + "px \n");
}, false);


animate();