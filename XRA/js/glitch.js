function Tile(ctx,x,y,w,h,v){
  this.ctx = ctx;
  this.x = this.targetX = x; this.y = this.targetY = y;
  this.w = this.targetW = w; this.h =this.targetH = h;
  this.v = v;
  this.initialized = false;
  this.ticker = [];

  this.init = function(){
    if(!this.initialized){
      switch(this.v){
        case 0:
          this.targetW = this.w; this.w = 0;
          this.targetH = this.h; this.h = 0;
          this.ticker.push(0);
          this.ticker.push(36);
          this.ticker.push(true);
          this.ticker.push((Math.floor(Math.random()*10)+5)/50);
          this.ticker.push(Date.now());
          break;
        case 1:
          this.ticker.push(0); //Stage tracker
          this.ticker.push(20);
          this.ticker.push(0);
          break;
        case 2:
          this.targetW = this.w; this.w = 0;
          this.targetH = this.h; this.h = 0;
          this.ticker.push(0);
          break;
        default:
          this.targetW = this.w; this.w = 0;
          this.targetH = this.h; this.h = 0;
          this.ticker.push(Date.now());
          this.ticker.push(2);
          this.ticker.push(true);
          this.ticker.push((Math.floor(Math.random()*10)+1)/100);
          break;
      }
      this.initialized = true;
    }
  }

  this.draw = function(){
    switch(this.v){
      case 0:
        if(Date.now() > this.ticker[4]+(Math.floor(Math.random()*1000))){
          this.ctx.strokeStyle='#f49c36 ';
          this.ctx.lineWidth = 4;
          this.ctx.strokeRect(this.x-this.w/2+2,this.y-this.h/2+2,this.w-4,this.h-4);
          this.ctx.fillStyle='#f49c36 ';
          this.ctx.beginPath();
          this.ctx.moveTo(this.x-this.w/2+6+this.ticker[0],this.y-this.h/2+6);
          this.ctx.lineTo(this.x-this.w/2+6+this.w-12,this.y-this.h/2+6);
          this.ctx.lineTo(this.x-this.w/2+6+this.w-12,this.y-this.h/2+6+this.h-this.ticker[1]);
          this.ctx.lineTo(this.x-this.w/2+6+this.w-this.ticker[1],this.y-this.h/2+6+this.h-12);
          this.ctx.lineTo(this.x-this.w/2+6,this.y-this.h/2+6+this.h-12);
          this.ctx.lineTo(this.x-this.w/2+6,this.y-this.h/2+6+this.ticker[0]);
          this.ctx.closePath();
          this.ctx.fill();
          //this.ctx.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);

          if(this.ticker[2]){
            this.ticker[1] += this.ticker[3];
            this.ticker[0] -= this.ticker[3];
          } else {
            this.ticker[1] -= this.ticker[3];
            this.ticker[0] += this.ticker[3];
          }

          if(this.ticker[0]<1){
            this.ticker[2] = false;
          } else if(this.ticker[0] > 24){
            this.ticker[2] = true;
          }
        }
        break;
      case 1:
        this.ctx.fillStyle='#74d1e8';
        if(this.ticker[0] == 0){
          //Draw the boxes at bounds
          this.ctx.fillRect(this.x-this.ticker[1]/2,this.y-this.h/2,this.ticker[1],4);
          this.ctx.fillRect(this.x-this.w/2,this.y-this.ticker[1]/2,4,this.ticker[1]);
          this.ctx.fillRect(this.x-this.ticker[1]/2,this.y+this.h/2-4,this.ticker[1],4);
          this.ctx.fillRect(this.x+this.w/2-4,this.y-this.ticker[1]/2,4,this.ticker[1]);
          if(this.ticker[1] < this.w-26){
            this.ticker[1]++;
          } else {
            //Next step
            this.ticker[0] = 1;
          }
        } else if(this.ticker[0] == 1){
          this.ctx.fillRect(this.x-this.ticker[1]/2,this.y-this.h/2,this.ticker[1],4);
          this.ctx.fillRect(this.x-this.w/2,this.y-this.ticker[1]/2,4,this.ticker[1]);
          this.ctx.fillRect(this.x-this.ticker[1]/2,this.y+this.h/2-4,this.ticker[1],4);
          this.ctx.fillRect(this.x+this.w/2-4,this.y-this.ticker[1]/2,4,this.ticker[1]);
          //Draw the inards
          this.ctx.strokeStyle='#74d1e8';
          this.ctx.beginPath();
          this.ctx.moveTo(this.x-this.w/2+10,this.y-this.h/2+10);
          this.ctx.lineTo(this.x+this.w/2-10,this.y+this.h/2-10);
          this.ctx.moveTo(this.x+this.w/2-10,this.y-this.h/2+10);
          this.ctx.lineTo(this.x-this.w/2+10,this.y+this.h/2-10);
          this.ctx.stroke();

          this.ticker[2]++;
          if(this.ticker[2] > 10 && this.ticker[2] < 30){
            this.ctx.clearRect(this.x-this.w/4,this.y-this.h/4,this.w/2,this.h/2);
            this.ctx.strokeRect(this.x-this.w/6,this.y-this.h/6,this.w/3,this.h/3);

          }
          if(this.ticker[2] >40){
            this.ticker[2] = 0;
          }
        }
        break;
      case 2:
        this.ctx.strokeStyle='#F80042';
        this.ctx.lineWidth = 10;
        let bounds = {
          minX: this.x-this.w/2,
          maxX: this.x+this.w/2,
          minY: this.y-this.h/2,
          maxY: this.y+this.h/2
        };
        if(Math.abs(this.w-this.targetW) < 2){
          this.ticker[0]+= 0.2;
          if(this.ticker[0] > 20){
            this.ticker[0] = 0;
          }
          //this.ctx.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
          let count = Math.round(this.targetW/20);
          this.ctx.beginPath();
          for(let i = 0; i < 20*count; i+=20){
            this.ctx.moveTo(bounds.maxX-this.ticker[0]-i,bounds.minY);
            this.ctx.lineTo(bounds.minX,bounds.maxY-this.ticker[0]-i);
          }
          for(let i = 20; i < 20*(count+1); i+=20){
            this.ctx.moveTo(bounds.maxX,bounds.minY+i-this.ticker[0]);
            this.ctx.lineTo(bounds.minX+i-this.ticker[0],bounds.maxY);
          }
          this.ctx.stroke();
        }
        //Clean the edges
        this.ctx.clearRect(this.x-this.w/2-5,this.y-this.h/2-5,this.w+10,15); //TOP
        this.ctx.clearRect(this.x-this.w/2-5,this.y+this.h/2-10,this.w+10,15);//Bottom
        this.ctx.clearRect(this.x-this.w/2-5,this.y-this.h/2-5,15,this.h+10);
        this.ctx.clearRect(this.x+this.w/2-10,this.y-this.h/2-5,15,this.h+10);
        //Box it up
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle='#F8004288';
        this.ctx.beginPath();
        //Top left corner
        this.ctx.moveTo(this.x-this.w/2+5,this.y-this.h/2+15);
        this.ctx.lineTo(this.x-this.w/2+5,this.y-this.h/2+5);
        this.ctx.lineTo(this.x-this.w/2+15,this.y-this.h/2+5);
        //Top right corner
        this.ctx.moveTo(this.x+this.w/2-15,this.y-this.h/2+5);
        this.ctx.lineTo(this.x+this.w/2-5,this.y-this.h/2+5);
        this.ctx.lineTo(this.x+this.w/2-5,this.y-this.h/2+15);
        
        //Bottom right corner
        this.ctx.moveTo(this.x+this.w/2-5,this.y+this.h/2-15);
        this.ctx.lineTo(this.x+this.w/2-5,this.y+this.h/2-5);
        this.ctx.lineTo(this.x+this.w/2-15,this.y+this.h/2-5);

        //Bottom left corner
        this.ctx.moveTo(this.x-this.w/2+5,this.y+this.h/2-15);
        this.ctx.lineTo(this.x-this.w/2+5,this.y+this.h/2-5);
        this.ctx.lineTo(this.x-this.w/2+15,this.y+this.h/2-5);
        this.ctx.stroke();
        break;
      default:
        this.ctx.fillStyle='#FFF';
        this.ctx.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
        if(this.ticker[1] > 4){
          this.ticker[2] = false;
        } else if(this.ticker[1] < 1.5){
          this.ticker[2] = true;
        }
        if(this.ticker[2]){
          this.ticker[1]+= this.ticker[3];
        } else {
          this.ticker[1]-= this.ticker[3];
        }
        this.ctx.clearRect(
          //this.x-this.w/(this.ticker[1]*2),
          //this.y-this.h/(this.ticker[1]*2),
          this.x-this.w/2 + 10,
          this.y-this.h/2+10,
          //this.w/this.ticker[1],
          this.w/10,
          this.h/this.ticker[1]);

        if(Date.now() < this.ticker[0]+2000){
          this.ctx.clearRect(this.x-this.w/2+this.w/10+12,this.y-this.h/2+10,this.w/10,this.h/10);
        } else {
          if(Date.now() > this.ticker[0]+2000+(this.ticker[3]*10000)){
            this.ticker[0] = Date.now();
          }
        }
        break;
    }
  }

  this.update = function(){
    if(this.initialized){
      let speed = 0.1;
      switch(this.v){
        case 0:
          speed = this.ticker[3]/2;
          break;
        case 1:
          speed = 1; //Instant
          break;
        case 2:
          speed = 0.05;
          break;
        default:
          speed = 0.1;
          break;
      }
      if(Math.round(Math.abs(this.targetW-this.w))>0){
        this.w += (this.targetW-this.w)*speed;
      }
      if(Math.round(Math.abs(this.targetH-this.h))>0){
        this.h += (this.targetH-this.h)*speed;
      }
      this.draw();
    }
  }
}
