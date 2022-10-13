function Unit(r,c,pos, scale){
  this.r = r; this.c = c;
  this.targR = this.r; this.targC = c;
  this.x = pos.x; this.y = pos.y;
  this.targX = this.x; this.targY = this.y;
  this.scale = scale;
  this.inPosition = {x: true, y: true};
  this.moveDampner = 5;

  this.draw = function(){
    ctx.fillRect(this.x-this.scale/2,this.y-this.scale/2,this.scale,this.scale);
    ctx.fillText((this.x-this.targX)+","+(this.y-this.targY),this.x,this.y);
  }

  this.update = function(dir){
    this.inPosition.x = this.inPosition.y = false;
    if(this.x < this.targX && Math.abs(this.x-this.targX) > 1){
      //Send right
      this.x += (this.targX-this.x)/this.moveDampner;
    } else if(this.x > this.targX && Math.abs(this.x-this.targX) > 1){
      //Send left
      this.x -= (this.x-this.targX)/this.moveDampner;
    } else {
      this.inPosition.x = true;
      this.c = this.targC;
      this.targX = this.x;
    }
    if(this.y < this.targY && Math.abs(this.y-this.targY) > 1){
      //Send down
      this.y += (this.targY-this.y)/this.moveDampner;
    } else if(this.y > this.targY  && Math.abs(this.y-this.targY) > 1){
      //Send up
      this.y -= (this.y-this.targY)/this.moveDampner;
    } else {
      this.inPosition.y = true;
      this.r = this.targR;
      this.targY = this.y;
    }
    this.draw();
    if(this.ready()){
      return 0;
    } else {
      return dir;
    }
  }

  this.target = function(r,c,pos){
    this.targR = r; this.targC = c;
    this.targX = pos.x; this.targY = pos.y;
  }

  this.ready = function(){
    return this.inPosition.x && this.inPosition.y;
  }
}
