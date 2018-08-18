
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-2;
canvas.height = window.innerHeight-2;

var c = canvas.getContext('2d');

function Point(x,y){
	this.x = x;
	this.y = y;
}

function Circle(x,y,speed,radius,color){
	this.x = x;
	this.y = y;
	this.dx = (Math.random()-0.5)*speed;
	this.dy = (Math.random()-0.5)*speed;
	this.radius = radius;
	this.color = color;
	this.points = [];
	this.points.push(new Point(this.x, this.y));

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		c.fillStyle = color;
		c.fill();
		if(this.points.length > 0){
			c.beginPath();
			c.moveTo(this.points[0].x, this.points[0].y);
			for(var i = 1; i < this.points.length; i++){
				c.lineTo(this.points[i].x, this.points[i].y);
			}
			c.lineTo(this.x, this.y);
			c.strokeStyle= this.color;
			c.stroke();
		}
		
	}

	this.update = function(){
		if(this.x+this.radius > innerWidth || this.x-this.radius < 0){
			this.dx = -this.dx;
			this.points.push(new Point(this.x, this.y));
		}
		if(this.y+this.radius > innerHeight || this.y-this.radius < 0){
			this.dy = -this.dy;
			this.points.push(new Point(this.x, this.y));
		}
		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}



var circleArray = [];
var circleCount = 0;
var colorArray = ['#483F92','#79328B','#CC4552'];

for(var i = 0; i < circleCount; i++){
	var radius = 1;
	var x = Math.random() * (innerWidth - radius*2) + radius;
	var y = Math.random() * (innerHeight-radius*2) + radius;
	var speed = 20;
	var color = colorArray[Math.floor(Math.random() * colorArray.length)];
	circleArray.push(new Circle(x,y,speed,radius,color));
}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
}
var clicks = 0;
window.addEventListener('mousedown', function(event){
	if(circleArray.length < 100){
		var color = colorArray[Math.floor(Math.random() * colorArray.length)];
		circleArray.push(new Circle(event.x, event.y, 100, 1, colorArray[clicks]));
        clicks++;
        if(clicks >= colorArray.length){
            clicks = 0;
        }
	}
});
var taps = 0; 
canvas.addEventListener('touchstart', function(e){
	if(circleArray.length < 100){
        
		for(var i = 0; i < e.touches.length; i++){
			circleArray.push(new Circle(e.touches[i].clientX, e.touches[i].clientY, 100, 1, colorArray[taps]));
            taps++;
            if(taps >= colorArray.length){
                taps = 0;
            }
		}
	}
	e.preventDefault();
});


animate();