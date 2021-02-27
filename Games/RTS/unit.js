function Unit(x,y,id,team){
    this.x = x; 
    this.y = y;
    this.id = id;
    this.team = team;
    this.range = 80;
    this.view = 140;
    
    this.draw = function(ctx){
        //Draw unit
        ctx.fillStyle='#333';
        ctx.fillRect(this.x-35,this.y-35,70,70);
        //Draw engagement range
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.strokeStyle='#333';
        ctx.strokeRect(this.x-this.range,this.y-this.range,this.range*2, this.range*2);
        //Draw visible area
        ctx.lineWidth = 2;
        ctx.setLineDash([5,10]);
        ctx.strokeStyle='#666';
        ctx.strokeRect(this.x-this.view, this.y-this.view,this.view*2, this.view*2);
    }
    
    this.update = function(ctx){
        this.draw(ctx);
    }
}