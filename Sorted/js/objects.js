//Position object
function Position(x,y){this.x = x; this.y =y ;}

function Tile(pos,val,scale){
  this.pos = pos;
  this.val = val;
  this.scale = scale;
  this.targetPos = new Position(this.pos.x,this.pos.y);
  this.selected = false;
  this.inPos = true;

  this.draw = function(ctx){
    ctx.fillStyle=""+this.val;
    if(this.selected){
        //Tile is selected shrink it a bit for effect
        ctx.fillRect(this.pos.x+10, this.pos.y+10, this.scale-20,this.scale-20);
    } else {
      //Tile is no longer selected [normal size]
      ctx.fillRect(this.pos.x, this.pos.y, this.scale, this.scale);
    }
  }

  this.update = function(ctx){
    let set = {x:false,y:false}; //Check set status on each axis
    if(Math.abs(this.targetPos.y-this.pos.y)>1){
      this.pos.y = this.pos.y+(this.targetPos.y-this.pos.y)*0.5;
    } else {
      set.x = true; //x axis is set
    }
    if(Math.abs(this.targetPos.x-this.pos.x) > 1){
      this.pos.x = this.pos.x+(this.targetPos.x-this.pos.x)*0.5;
    } else {
      set.y = true; //y axis is set
    }
    this.inPos = (set.x&&set.y); //in position only if set on both axis
    this.draw(ctx); //make the tile appear
  }

  this.hardSet = function(x,y,s){
    this.targetPos.x = x; this.pos.x = x;
    this.targetPos.y = y; this.pos.y = y;
    this.scale = s;
  }
}

function TileGrid(r,c,w,h){
  this.r = r; this.c = c;
  this.tiles = [];
  this.colorArray = ['#648FFF','#785EF0','#DC267F','#FE6100','#FFB000'];
  this.selected = {row:[],column:[]};
  this.bounds = {minX:-1,maxX:-1,minY:-1,maxY:-1,horz:-1,vert:-1};

  this.init = function(w,h){
    this.w = w; this.h = h;
    this.scale = (this.w*0.8)/this.c;
    if((this.h < (this.w*0.8))||(this.scale*this.r > (this.h*0.8))){
      this.scale = (this.h*0.8)/this.r;
    }

    this.center = {x: (this.w/2),y:(this.h/2)};
    this.gridScale = {x: this.scale*this.c, y: this.scale*this.r};
    this.halfGrid = { x: this.gridScale.x/2,y: this.gridScale.y/2};

    //Bounds are set here but defined outside init for use in cycling
    this.bounds = {
      minX: this.center.x-this.halfGrid.x-(this.scale/2),
      maxX: this.center.x+this.halfGrid.x+(this.scale/2),
      minY: this.center.y-this.halfGrid.y-(this.scale/2),
      maxY: this.center.y+this.halfGrid.y+(this.scale/2),
      horz: this.gridScale.x,
      vert: this.gridScale.y
    };

    if(this.tiles.length < 1){ // Puzzle not yet generated
      for(var cols = 0; cols < this.c; cols++){
        let row = [];
        for(var rows = 0; rows < this.r; rows++){
          row.push(new Tile(
            new Position(
              this.center.x-this.halfGrid.x+(cols*this.scale)-1,
              this.center.y-this.halfGrid.y+(rows*this.scale)-1
            ),
            this.colorArray[Math.floor(Math.random()*this.colorArray.length)],
            this.scale+2)
          ); //End tile definition
        }
        this.tiles.push(row);
      }
    } else { //Puzzle generated but screen needs adjusting
      for(var i = 0; i < this.tiles.length; i++){
        for(var j = 0; j < this.tiles[i].length; j++){
          this.tiles[i][j].hardSet(
            this.center.x-this.halfGrid.x+(i*this.scale)-1,
            this.center.y-this.halfGrid.y+(j*this.scale)-1,
            this.scale
          );
        }
      }
    }
  }
  this.init(w,h);

  this.update = function(ctx){
    for(var c = 0; c < this.tiles.length; c++){
      for(var r = 0; r < this.tiles[c].length; r++){
        this.tiles[c][r].update(ctx);
      }
    }
  }

  //Now for selection...
  this.gatherSelected = function(x,y){
    //First we find the primary hovered tile to make sure we aren't
    // selecting an empty slot or locked tiles
    let primary = {tile: undefined, r: -1, c: -1};
    for(var a = 0; a < this.tiles.length; a++){
      for(var b = 0; b < this.tiles[a].length; b++){
        let t = this.tiles[a][b];
        if(x < t.pos.x+this.scale && x > t.pos.x && y < t.pos.y+this.scale && y > t.pos.y){
          primary.tile = this.tiles[a][b];
          primary.c = a;
          primary.r = b;
        }
      }
    }

    //Did we actually engage a tile?
    if(primary.tile == undefined){
      this.selected = {row:[],column:[]};
      return;
    }
    //Check if primary is locked
    // if(primary.tile.locked){
    //   this.selected = {row:[],column:[]};
    //   return;
    // }

    /*THIS IS THE TRICKY BIT...
    We need to move outward from the primary tile in
    all four cardinal directions until:
      1. We reach the limits (0 index OR length-1)
      2. We encounter a locked tile
      3. We encounter a blank / empty tile space

    Two ways to do this...
      1. build function to iterate from index to end in 4 directions
      2. Some intense recursion that goes tile by tile.

    Since our grid is centralized and we are using fly-weight ops
    we will go with option one. Ideally the sub-function would take:
    1. Tile
    2. Direction
    and return a sorted array treating the top left as the origin
    --mostly because that matches our generation pattern in THIS.INIT()
    */
    //COLUMN COLLECTION from the primary
    for(var d = primary.r-1; d > -1; d--){
    //Going up! : UNSHIFT adds to start as we climb
      this.selected.column.unshift(this.tiles[primary.c][d]);
    }
    //ADD THE PRIMARY
    this.selected.column.push(primary.tile);

    for(var e = primary.r+1; e < this.tiles[primary.c].length; e++){
    //Going down! : Push adds to the end as we descend
      this.selected.column.push(this.tiles[primary.c][e]);
    }

    //ROW COLLECTION from the primary
    for(var f = primary.c-1; f > -1; f--){
      //Going right! : UNSHIFT adds to the start of the row
      this.selected.row.unshift(this.tiles[f][primary.r]);
    }
    //ADD THE primary
    this.selected.row.push(primary.tile);

    for(var g = primary.c+1; g < this.tiles.length; g++){
      this.selected.row.push(this.tiles[g][primary.r]);
    }

    //DEBUGGING only
    for(var i = 0; i < this.selected.row.length; i++){
      this.selected.row[i].selected = true;
    }
    // for(var i = 0; i < this.selected.column.length; i++){
    //   this.selected.column[i].selected = true;
    // }
  }
  this.clearSelected = function(){

    for(var c = 0; c < this.tiles.length; c++){
      for(var r = 0; r < this.tiles[c].length; r++){
        this.tiles[c][r].selected = false;
      }
    }
    this.selected = {row:[],column:[]};
    this.primary = {tile: undefined, r: -1, c: -1};
  }

  //Now for rotation...
  this.cycleColumn = function(qty){
    //qty = quantity (positive or negative) to shift the column
    //Loop through selected column and set targetPos to gridPos + quantity
    //if the tile exceeds bounds we need to loop using horz / vert bounds
  }

  this.cycleRow = function(qty){
  }
}
