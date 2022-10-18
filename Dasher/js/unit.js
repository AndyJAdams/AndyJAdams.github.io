function Unit(r,c,pos, scale){
  this.r = r; this.c = c;
  this.targR = this.r; this.targC = c;
  this.x = pos.x; this.y = pos.y;
  this.targX = this.x; this.targY = this.y;
  this.scale = scale;
  this.inPosition = {x: true, y: true};
  this.moveDampner = 5;
  this.maxShift = 0;
  this.start = 0;

  this.draw = function(){
    ctx.fillRect(this.x-this.scale/2,this.y-this.scale/2,this.scale,this.scale);
    ctx.fillText((this.x-this.targX)+","+(this.y-this.targY) + " t:"+ (Date.now()-this.start),10,50);
  }

  this.update = function(dir){
    let xDif = Math.abs(grid.pos[this.r][this.c].x-this.targX);
    let yDif = Math.abs(grid.pos[this.r][this.c].y-this.targY);
    this.maxShift = yDif > xDif ? yDif : xDif;
    
    if(dir > 0 && this.start < 1){
      this.start = Date.now();
    }

    switch(dir){
      case 1: //UP
        this.inPosition.y = false;
        if(Math.abs(this.y-this.targY) > 1 && this.y > this.targY){
          this.y = easeInQuad(Date.now()-this.start,grid.pos[this.r][this.c].y, (this.targY-grid.pos[this.r][this.c].y), 500);
        } else if(this.y < this.targY){
          this.y = this.targY;
        } else {
          this.inPosition.y = true;
          this.r = this.targR;
          this.y = this.targY;
        }
        break;
      case 3: //Down
        this.inPosition.y = false;
        if(Math.abs(this.y-this.targY) > 1 && this.y < this.targY){
          this.y = easeInQuad(Date.now()-this.start,grid.pos[this.r][this.c].y, (this.targY-grid.pos[this.r][this.c].y), 500);
        } else if(this.y > this.targY){
          this.y = this.targY;
        } else {
          this.inPosition.y = true;
          this.r = this.targR;
          this.y = this.targY;
        }
        break;
      case 2: //Right
        this.inPosition.x = false;
        if(Math.abs(this.x-this.targX) > 1 && this.x < this.targX){
          this.x = easeInQuad(Date.now()-this.start,grid.pos[this.r][this.c].x, (this.targX-grid.pos[this.r][this.c].x), 500);
        } else if(this.x > this.targX){
          this.x = this.targX;
        } else {
          this.inPosition.x = true;
          this.c = this.targC;
          this.x = this.targX;
        }
        break;
      case 4: //Left
        this.inPosition.x = false;
        if(Math.abs(this.x-this.targX) > 1 && this.x > this.targX){
          this.x = easeInQuad(Date.now()-this.start,grid.pos[this.r][this.c].x, (this.targX-grid.pos[this.r][this.c].x), 500);
        } else if(this.x < this.targX){
          this.x = this.targX;
        } else {
          this.inPosition.x = true;
          this.c = this.targC;
          this.x = this.targX;
        }
        break;
      case 0:
        this.inPosition.x = this.inPosition.y = true;
        break;
      default:
          this.inPosition.x = this.inPosition.y = true;
          console.log("Direction does not compute - UNIT.JS");
          break;
    }

    // if(this.x < this.targX && Math.abs(this.x-this.targX) > 1){
    //   //Send right
    //   this.x += (this.targX-this.x)/this.moveDampner;
    // } else if(this.x > this.targX && Math.abs(this.x-this.targX) > 1){
    //   //Send left
    //   this.x -= (this.x-this.targX)/this.moveDampner;
    // } else {
    //   this.inPosition.x = true;
    //   this.c = this.targC;
    //   this.targX = this.x;
    // }
    // if(this.y < this.targY && Math.abs(this.y-this.targY) > 1){
    //   //Send down
    //   //this.y += (this.targY-this.y)/this.moveDampner;
    //   this.y = easeInQuad(Date.now()-this.start,grid.pos[this.r][this.c].y, (this.targY-grid.pos[this.r][this.c].y), 200);
    // } else if(this.y > this.targY  && Math.abs(this.y-this.targY) > 1){
    //   //Send up
    //   //this.y -= (this.y-this.targY)/this.moveDampner;
    //   this.y = easeInQuad(Date.now()-this.start,grid.pos[this.r][this.c].y, (this.targY-grid.pos[this.r][this.c].y), 500);
    // } else {
    //   console.log('reset Y');
    //   this.inPosition.y = true;
    //   this.r = this.targR;
    //   this.targY = this.y;
    // }
    this.draw();
    if(this.ready()){
      this.start = 0;
      return -(this.maxShift/10000); //Returned amount goes to screen shake
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
//t = time, b = beginning value, c = change in value, d = duration
function easeLinear (t, b, c, d) {
  return c * t / d + b;
}

function easeInQuad (t, b, c, d) {
  return c * (t /= d) * t + b;
}