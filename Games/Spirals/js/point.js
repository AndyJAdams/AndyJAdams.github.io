function Point(x,y,parent=undefined,speed=0,trail=false,color="#FFF"){
  this.x = x;
  this.y = y;
  this.parent = parent;
  this.speed = speed;
  this.trail = trail;
  this.past = [];
  this.color = color;
  this.angle = 0;
  this.dist = 0;
  if(this.parent != undefined){
    this.dist = Math.sqrt(Math.pow(Math.abs(this.x-this.parent.x),2)+Math.pow(Math.abs(this.y-this.parent.y),2));
  }
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y,4,0,2*Math.PI);
    ctx.fillStyle=this.color;
    ctx.fill();
  }

  this.drawLink = function(){
    if(this.parent != undefined){
      ctx.beginPath();
      ctx.moveTo(this.x,this.y);
      ctx.lineTo(this.parent.x,this.parent.y);
      ctx.strokeStyle='#666';
      ctx.stroke();
    }
  }

  this.drawTrail = function(){
    //We can draw the trail here
    if(this.trail){
      ctx.beginPath();
      ctx.moveTo(this.past[0].x,this.past[0].y);
      for(var t = 1; t < this.past.length; t++){
        ctx.lineTo(this.past[t].x,this.past[t].y);
      }
      ctx.strokeStyle=this.color;
      ctx.lineWidth= 3;
      ctx.stroke();
    }
  }

  this.update = function(){
    if(this.parent != undefined){
      this.x = this.parent.x+Math.cos(angToRad(this.angle))*this.dist;
      this.y = this.parent.y+Math.sin(angToRad(this.angle))*this.dist;
      this.angle += this.speed;
    }
  }
}

function angToRad(a){
  return a*(Math.PI/180);
}
