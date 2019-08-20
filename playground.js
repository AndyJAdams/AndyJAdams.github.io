var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function scaleCanvas(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight-4;
}

scaleCanvas();

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
	console.log("MOUSE DRAG " + d + "px");
},false);

//Keyboard
window.addEventListener('keyup',function(evt){
	evt.preventDefault();
	console.log(evt.keyCode);
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
	console.log("TOUCH DRAG " + d + "px");
}, false);


animate();