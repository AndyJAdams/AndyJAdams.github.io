
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-2;
canvas.height = window.innerHeight-2;
var img = document.getElementById('img');

var ctx = canvas.getContext('2d');

function Box(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.orgX = x;
	this.orgY = y;

	this.draw = function(){
		//ctx.drawImage(img,this.x,this.y,this.w,this.h);
		if(this.x > innerWidth){
			this.x -= innerWidth;
		}
		if(this.y > innerHeight){
			this.y -= innerHeight;
		}
		if(this.x < 0){
			this.x += innerWidth;
		}
		if(this.y < 0){
			this.y += innerHeight;
		}
		if(this.x%this.w != 0){
			this.x -= (this.x%this.w);
		}
		if(this.y%this.h != 0){
			this.y -= (this.y%this.h);
		}
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.fill();
	}

	this.override = function(){
		this.orgX = this.x;
		this.orgY = this.y;
	}
}


//var myBox = new Box(-1000,-1000, 7185,3869);
var myBox = new Box(0,0,innerWidth/5,innerHeight/7);
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth, innerHeight);
	myBox.draw();
}

var sp = {
	x: undefined,
	y: undefined,
	drag: false,
	locked: undefined
}

window.addEventListener('touchstart',function(event){
	sp.x = event.x;
	sp.y = event.y;
	sp.drag = true;
	e.preventDefault();
});

window.addEventListener('mousedown',function(event){
	sp.x = event.x;
	sp.y = event.y;
	sp.drag = true;
});

window.addEventListener('touchmove', function(event){
	if(sp.drag){
		if(sp.locked == undefined && (Math.abs(event.x-sp.x) > 20 || Math.abs(event.y-sp.y)>20)){
			if(Math.abs(event.x-sp.x) > Math.abs(event.y-sp.y)){
				sp.locked = 'x';
			} else {
				sp.locked = 'y';
			}
		}
		if(sp.locked == 'x'){
			myBox.x = myBox.orgX + (event.x-sp.x);
			myBox.y = myBox.orgY;	
			sp.locked = 'x';
		} else if(sp.locked == 'y'){
			myBox.x = myBox.orgX;
			myBox.y = myBox.orgY + (event.y-sp.y);
			sp.locked = 'y';
		}
	}
	e.preventDefault();
});

window.addEventListener('mousemove', function(event){
	if(sp.drag){
		if(sp.locked == undefined && (Math.abs(event.x-sp.x) > 20 || Math.abs(event.y-sp.y)>20)){
			if(Math.abs(event.x-sp.x) > Math.abs(event.y-sp.y)){
				sp.locked = 'x';
			} else {
				sp.locked = 'y';
			}
		}
		if(sp.locked == 'x'){
			myBox.x = myBox.orgX + (event.x-sp.x);
			myBox.y = myBox.orgY;	
			sp.locked = 'x';
		} else if(sp.locked == 'y'){
			myBox.x = myBox.orgX;
			myBox.y = myBox.orgY + (event.y-sp.y);
			sp.locked = 'y';
		}
	}
});

window.addEventListener('touchend',function(event){
	sp.drag = false;
	sp.locked = undefined;
	myBox.override();
	e.preventDefault();
});

window.addEventListener('touchcancel', function(event){
	sp.drag = false;
	sp.locked = undefined;
	myBox.override();
	e.preventDefault();
});

window.addEventListener('mouseup', function(event){
	sp.drag = false;
	sp.locked = undefined;
	myBox.override();
});




animate();