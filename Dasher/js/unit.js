function Unit(r,c,pos, scale){
  this.r = r; this.c = c;
  this.targR = this.r; this.targC = c;
  this.x = pos.x; this.y = pos.y;
  this.targX = this.x; this.targY = this.y;
  this.scale = scale;
  this.inPosition = {x: true, y: true};

  this.draw = function(){
    ctx.fillRect(this.x-this.scale/2,this.y-this.scale/2,this.scale,this.scale);
  }

  this.update = function(){
    this.inPosition.x = this.inPosition.y = false;
    if(this.x < this.targX){
      //Send left
    } else if(this.x > this.targX){
      //Send right
    } else {
      this.inPosition.x = true;
      this.c = this.targC;
    }
    if(this.y < this.targY){
      //Send down
    } else if(this.y > this.targY){
      //Send up
    } else {
      this.inPosition.y = true;
      this.r = this.targR;
    }
    this.draw();
  }

  this.target = function(r,c,pos){
    this.targR = r; this.targC = c;
    this.targX = pos.x; this.targY = pos.y;
  }


}
