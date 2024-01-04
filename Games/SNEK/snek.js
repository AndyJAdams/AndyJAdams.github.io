/*Author: Andrew James Adams
Date: 1/4/2023
*/

function Snek(pts,color,exit){
	this.pts = pts;
	this.color = color;
	this.exit = exit;
	
	this.draw = function(ctx){
		if(this.pts.length > 0){
			ctx.beginPath();
			ctx.moveTo(this.pts[0].x,this.pts[0].y);
			for(let i = 1; i < this.pts.length; i++){
				ctx.lineTo(this.pts[i].x, this.pts[i].y);
			}
			ctx.strokeStyle=this.color;
			ctx.fillStyle=this.color;
			ctx.lineWidth = 5;
			ctx.stroke();
			ctx.closePath();
			ctx.fillRect(this.pts[0].x-5,this.pts[0].y-5,10,10);
		}
	}

	this.drawExit = function(ctx){
		if(this.pts.length > 0){
			ctx.strokeStyle=this.color;
			ctx.fillStyle=this.color;
			ctx.lineWidth = 3;
			ctx.strokeRect(this.exit.x-15,this.exit.y-15,30,30);
		}
	}

	this.update = function(ctx){
		if(this.pts[0] == this.exit){
			//DONE W/ this snake
			this.pts=[];
			//TODO: Animate Exit
		} else if(this.pts[this.pts.length-1] == this.exit){
			//DONE at the tail
			this.pts = [];
		} else {
			this.draw(ctx);
		}
	}

	this.slide = function(gp){
		this.pts.unshift(gp);
		this.pts.pop();
	}

	this.tug = function(gp){
		this.pts.push(gp);
		this.pts.shift();
	}
}