function Wall(r,c){
    this.r = r; this.c = c; 
    this.pos = grid.pos[this.r][this.c];
    this.draw = function(){
        ctx.fillRect(this.pos.x-10, this.pos.y-10, 20,20);
    }
}