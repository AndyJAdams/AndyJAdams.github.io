//Position object
function Position(x,y){this.x = x; this.y =y ;}

function Tile(pos,val,scale,index){
  this.pos = pos;
  this.val = val;
  this.setScale = scale;
  this.scale = 0;
  this.oScale = {x:0,y:0};
  this.targetPos = new Position(this.pos.x,this.pos.y);
  this.selected = false; this.checked = false;
  this.inPos = true;
  this.index = index;
  this.locked = false;

  this.draw = function(ctx){
    ctx.fillStyle=""+this.val;
    ctx.fillRect(
      this.pos.x+(this.oScale.x/2),
      this.pos.y+(this.oScale.y/2),
      this.scale-this.oScale.x,
      this.scale-this.oScale.y
    );
    if(this.locked){
      ctx.strokeRect(
        this.pos.x+(this.oScale.x/3),
        this.pos.y+(this.oScale.y/3),
        this.scale-this.oScale.x,
        this.scale-this.oScale.y
      );
    }
    //DEBUG REVIEW DATA
    ctx.fillStyle='#FFF';
    ctx.fillText(this.index,this.pos.x+5,this.pos.y+10);
  }

  this.update = function(ctx){
    let set = {x:false,y:false}; //Check set status on each axis
    if(!this.selected){
      if(this.scale != this.setScale){
        this.scale += (this.setScale-this.scale)/10;
      }
      if(this.oScale.x > 0){this.oScale.x = Math.floor(this.oScale.x/2);}
      if(this.oScale.y > 0){this.oScale.y = Math.floor(this.oScale.y/2);}
      if(Math.round(Math.abs(this.targetPos.y-this.pos.y))>0){
        this.pos.y = this.pos.y+(this.targetPos.y-this.pos.y)*0.5;
      } else {
        set.x = true; //x axis is set
      }
      if(Math.round(Math.abs(this.targetPos.x-this.pos.x)) >0){
        this.pos.x = this.pos.x+(this.targetPos.x-this.pos.x)*0.5;
      } else {
        set.y = true; //y axis is set
      }
      this.inPos = (set.x&&set.y); //in position only if set on both axis
    } else {
      this.inPos = false;
    }
    this.draw(ctx); //make the tile appear
  }

  this.hardSet = function(x,y,s){ //We absolutely require this tile to be somewhere
    this.targetPos.x = x; this.pos.x = x;
    this.targetPos.y = y; this.pos.y = y;
    this.oScale = {x:0,y:0};
    this.setScale = s;
    this.scale = s;
  }
}

function TileGrid(r,c,w,h){
  this.canControl = true;
  this.r = r; this.c = c;
  this.tiles = [];
  this.gridPos = [];
  this.colorArray = ['#648FFF','#785EF0','#DC267F','#FE6100','#FFB000'];
  this.selected = {row:[],column:[],dir:0};
  this.bounds = {minX:-1,maxX:-1,minY:-1,maxY:-1,horz:-1,vert:-1};
  this.primary = {tile: undefined, r: -1, c: -1};
  this.groupings = [];
  this.rate = 0;

  this.init = function(w,h,data = []){
    this.w = w; this.h = h;
    this.scale = (this.w*0.8)/this.c;
    if((this.h < (this.w*0.8))||(this.scale*this.r > (this.h*0.8))){
      this.scale = (this.h*0.8)/this.r;
    }

    this.center = {x: (this.w/2),y:(this.h/2)};
    this.gridScale = {x: this.scale*this.c, y: this.scale*this.r};
    this.halfGrid = { x: this.gridScale.x/2,y: this.gridScale.y/2};
    this.rate = this.scale/4;

    //Bounds are set here but defined outside init for use in cycling
    this.bounds = {
      minX: this.center.x-this.halfGrid.x-(this.scale/2),
      maxX: this.center.x+this.halfGrid.x+(this.scale/2),
      minY: this.center.y-this.halfGrid.y-(this.scale/2),
      maxY: this.center.y+this.halfGrid.y+(this.scale/2),
      horz: this.gridScale.x,
      vert: this.gridScale.y
    };
    this.gridPos = [];
    let dataCount = 0;
    if(this.tiles.length < 1){ // Puzzle not yet generated
      for(var cols = 0; cols < this.c; cols++){
        let row = [];
        let gp = [];
        for(var rows = 0; rows < this.r; rows++){
          let pos = new Position(
            this.center.x-this.halfGrid.x+(cols*this.scale),
            this.center.y-this.halfGrid.y+(rows*this.scale)
          );
          gp.push(pos);
          let ind = Math.floor(Math.random()*this.colorArray.length);
          //HERE WE RANDOMLY PUT IN HOLES BY ASSIGING -1 INDEX
          if(Math.random()>0.85){
            ind = -1;
          }

          if(data.length > 0){
            ind = data[dataCount];
            dataCount++;
          }
          let col = this.colorArray[ind];
          if(ind < 0){
            col = "#00000000";
          }
          row.push(new Tile(new Position(
            this.center.x-this.halfGrid.x+(cols*this.scale),
            this.center.y-this.halfGrid.y+(rows*this.scale)),
            col,
            this.scale,
            ind)
          ); //End tile definition
        }
        this.tiles.push(row);
        this.gridPos.push(gp);
      }
    } else { //Puzzle generated but screen needs adjusting
      for(var i = 0; i < this.tiles.length; i++){
        let gp = [];
        for(var j = 0; j < this.tiles[i].length; j++){
          this.tiles[i][j].hardSet(
            this.center.x-this.halfGrid.x+(i*this.scale),
            this.center.y-this.halfGrid.y+(j*this.scale),
            this.scale
          );
          gp.push(new Position(
            this.center.x-this.halfGrid.x+(i*this.scale),
            this.center.y-this.halfGrid.y+(j*this.scale)
          ));
        }
        this.gridPos.push(gp);
      }
    }
  }

  this.update = function(ctx){
    for(var c = 0; c < this.tiles.length; c++){
      for(var r = 0; r < this.tiles[c].length; r++){
        this.tiles[c][r].update(ctx);
        // //DEBUG ROW
        // for(var a = 0; a < this.selected.row.length; a++){
        //   if(this.tiles[c][r] == this.selected.row[a]){
        //     ctx.fillStyle='#000';
        //     ctx.fillText("R:"+a,this.tiles[c][r].pos.x+5,this.tiles[c][r].pos.y+10);
        //   }
        // }
        // //DEBUG COLUMN
        // for(var b = 0; b < this.selected.column.length; b++){
        //   if(this.tiles[c][r] == this.selected.column[b]){
        //     ctx.fillStyle='#000';
        //     ctx.fillText("C:"+b,this.tiles[c][r].pos.x+5,this.tiles[c][r].pos.y+20);
        //   }
        // }
      }
    }

    // for(var i = 0; i < this.gridPos.length; i++){
    //   for(var j = 0; j < this.gridPos[i].length; j++){
    //     ctx.fillStyle='#FFF';
    //     ctx.fillRect(this.gridPos[i][j].x-2,this.gridPos[i][j].y-2,4,4);
    //   }
    // }
  }

  //Now for selection...
  this.gatherSelected = function(x,y){
    //First we find the primary hovered tile to make sure we aren't
    // selecting an empty slot or locked tiles
    this.primary = {tile: undefined, r: -1, c: -1};
    for(var a = 0; a < this.tiles.length; a++){
      for(var b = 0; b < this.tiles[a].length; b++){
        let t = this.tiles[a][b];
        if(x < t.pos.x+this.scale && x > t.pos.x && y < t.pos.y+this.scale && y > t.pos.y){
          this.primary.tile = this.tiles[a][b];
          this.primary.c = a;
          this.primary.r = b;
        }
      }
    }

    //Did we actually engage a tile?
    if(this.primary.tile == undefined){
      this.selected = {row:[],column:[]};
      return;
    }
    //Check if primary is locked
    if(this.primary.tile.locked){
      this.selected = {row:[],column:[]};
      return;
    }

    /*THIS IS THE TRICKY BIT...
    We need to move outward from the primary tile in
    all four cardinal directions until:
      1. We reach the limits (0 index OR length-1)
      2. We encounter a locked tile
      3. We encounter a blank / empty tile space

    Two ways to do this...
      1. build function to iterate from index to end in 4 directions
      2. Some intense recursion that goes tile by tile.

    Since our grid is centralized and we are using fly-weight algo
    we will go with option one. Ideally the sub-function would take:
    1. Tile
    2. Direction
    and return a sorted array treating the top left as the origin
    --mostly because that matches our generation pattern in THIS.INIT()
    */
    //COLUMN COLLECTION from the primary
    for(var d = this.primary.r-1; d > -1; d--){
    //Going up! : UNSHIFT adds to start as we climb
      if(this.tiles[this.primary.c][d].index < 0){
        break;
      }
      this.selected.column.unshift(this.tiles[this.primary.c][d]);
    }
    //ADD THE PRIMARY
    this.selected.column.push(this.primary.tile);

    for(var e = this.primary.r+1; e < this.tiles[this.primary.c].length; e++){
    //Going down! : Push adds to the end as we descend
      if(this.tiles[this.primary.c][e].index < 0){
        break;
      }
      this.selected.column.push(this.tiles[this.primary.c][e]);
    }

    //ROW COLLECTION from the primary
    for(var f = this.primary.c-1; f > -1; f--){
      //Going right! : UNSHIFT adds to the start of the row
      if(this.tiles[f][this.primary.r].index < 0){
        break;
      }
      this.selected.row.unshift(this.tiles[f][this.primary.r]);
    }
    //ADD THE primary
    this.selected.row.push(this.primary.tile);

    for(var g = this.primary.c+1; g < this.tiles.length; g++){
      if(this.tiles[g][this.primary.r].index < 0){
        break;
      }
      this.selected.row.push(this.tiles[g][this.primary.r]);
    }

    //DEBUGGING only
    // for(var i = 0; i < this.selected.row.length; i++){
    //   this.selected.row[i].selected = true;
    // }
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
    this.selected = {row:[],column:[],dir: 0};
    this.primary = {tile: undefined, r: -1, c: -1};
  }

  //Now for rotation...
  this.cycleColumn = function(qty){
    if(this.selected.dir == 1 || this.primary.tile == undefined || !this.canControl){
      return;
    }
    this.selected.dir = -1; //-1 vertical
    //qty = quantity (positive or negative) to shift the column
    //First we check to see if the primary is attempting to exceed Bounds
    if(this.primary.tile.targetPos.y + qty > this.bounds.maxY-this.scale ||
      this.primary.tile.targetPos.y + qty < this.bounds.minY){
      return;
    }
    //Loop through selected column and set targetPos to gridPos + quantity
    //if the tile exceeds bounds we need to loop using horz / vert bounds
    for(var i = 0; i < this.selected.column.length; i++){
      this.selected.column[i].selected = true;
      this.selected.column[i].oScale.x = 20;
      this.selected.column[i].pos.y = this.selected.column[i].targetPos.y + qty;
      if(this.selected.column[i].targetPos.y+qty > this.bounds.maxY-this.scale){
        this.selected.column[i].pos.y -= this.bounds.vert;
      } else if(this.selected.column[i].targetPos.y+qty < this.bounds.minY){
        this.selected.column[i].pos.y += this.bounds.vert;
      }
    }

  }
  this.cycleRow = function(qty){
    if(this.selected.dir == -1 || this.primary.tile == undefined || !this.canControl){
      return;
    }
    this.selected.dir = 1; //-1 vertical

    if(this.primary.tile.targetPos.x + qty > this.bounds.maxX-this.scale ||
      this.primary.tile.targetPos.x + qty < this.bounds.minX){
      return;
    }
    //Loop through selected row and set targetPos to gridPos + quantity
    //if the tile exceeds bounds we need to loop using horz / vert bounds
    for(var i = 0; i < this.selected.row.length; i++){
      this.selected.row[i].selected = true;
      this.selected.row[i].oScale.y = 20;
      this.selected.row[i].pos.x = this.selected.row[i].targetPos.x + qty;
      if(this.selected.row[i].targetPos.x+qty > this.bounds.maxX-this.scale){
        this.selected.row[i].pos.x -= this.bounds.horz;
      } else if(this.selected.row[i].targetPos.x+qty < this.bounds.minX){
        this.selected.row[i].pos.x += this.bounds.horz;
      }
    }
  }

  this.snap = function(qty,dir){
    if(dir == 1){
      for(var i = 0; i < this.selected.row.length; i++){
        let md = this.scale*10;
        let pair = {r:-1,c:-1};
        for(var a = 0; a < this.gridPos.length; a++){
          for(var b = 0; b < this.gridPos[a].length; b++){
            let d = Math.abs(
              Math.sqrt(
                Math.pow(
                  this.gridPos[a][b].x-this.selected.row[i].pos.x,2)+
                Math.pow(
                  this.gridPos[a][b].y-this.selected.row[i].pos.y,2)
              )
            );
            if(d < md){
              this.selected.row[i].targetPos.x = this.gridPos[a][b].x;
              this.selected.row[i].targetPos.y = this.gridPos[a][b].y;
              pair.r = b; pair.c = a;
              md = d;
            }
          }
        }
        this.tiles[pair.c][pair.r] = this.selected.row[i];
      }
    } else if(dir == -1){
      for(var i = 0; i < this.selected.column.length; i++){
        let md = this.scale*10;
        let pair = {r:-1,c:-1};
        for(var a = 0; a < this.gridPos.length; a++){
          for(var b = 0; b < this.gridPos[a].length; b++){
            let d = Math.abs(
              Math.sqrt(
                Math.pow(
                  this.gridPos[a][b].x-this.selected.column[i].pos.x,2)+
                Math.pow(
                  this.gridPos[a][b].y-this.selected.column[i].pos.y,2)
              )
            );
            if(d < md){
              this.selected.column[i].targetPos.x = this.gridPos[a][b].x;
              this.selected.column[i].targetPos.y = this.gridPos[a][b].y;
              pair.r = b; pair.c = a;
              md = d;
            }
          }
        }
        this.tiles[pair.c][pair.r] = this.selected.column[i];
      }
    }
    this.clearSelected();
  }

  this.compressData = function(){
    var out = this.r + "_"+this.c;
    for(var i = 0; i < this.tiles.length; i++){
      for(var j = 0; j < this.tiles[i].length; j++){
        out += "_"+this.tiles[i][j].index;
      }
    }
    console.log(out);
    return out;
  }

  this.allReady = function(){
    for(var i = 0; i < this.tiles.length; i++){
      for(var j = 0; j < this.tiles[i].length; j++){
        if(!this.tiles[i][j].inPos){
          return false;
        }
      }
    }
    return true;
  }

  this.getNeighbors = function(t){
    //Where is this tile?
    let spot = {c:-1,r:-1};
      for(var i = 0; i < this.tiles.length; i++){
        for(var j = 0; j < this.tiles[i].length; j++){
          if(this.tiles[i][j] == t){
            spot.c = i; spot.r = j;
          }
        }
      }
    //Now let's collect the neighbors
    let n = [];
    if(spot.c > 0){ n.push(this.tiles[spot.c-1][spot.r]);} //left
    if(spot.c < this.c-1){ n.push(this.tiles[spot.c+1][spot.r]);} //right
    if(spot.r > 0){ n.push(this.tiles[spot.c][spot.r-1]);}//up
    if(spot.r < this.r-1){ n.push(this.tiles[spot.c][spot.r+1]);}//down
    return n;
  }
  this.getCount = function(index){
    let count = 0;
    for(var i = 0; i < this.tiles.length; i++){
      for(var j = 0; j < this.tiles[i].length; j++){
        if(this.tiles[i][j].index == index){
          count++;
        }
      }
    }
    return count;
  }


  this.validate = function(){
    if(!this.allReady()){
      //console.log("not ready");
      // this.canControl = false;
      return false;
    }

    let valid = true;
    this.groupings = [];
    for(let a = 0; a < this.tiles.length; a++){
      for(let b = 0; b < this.tiles[a].length; b++){
        if(this.getCount(this.tiles[a][b].index) > 1){
          if(!this.tiles[a][b].checked && this.tiles[a][b].index > 0){
            //console.log('scanning ' + a + ',' + b);
            this.currentGroup = [];
            this.createGroups(this.tiles[a][b]);
            this.groupings.push(new Grouping(this.tiles[a][b].index,this.currentGroup));
          }
        }
      }
    }
    //Now that we have all our groupings we can compare if any have a matching index
    //console.log(this.groupings.length);
    for(let g = 0; g < this.groupings.length; g++){
      let myGroup = this.groupings[g];
      for(let h = 0; h < this.groupings.length; h++){
        if(this.groupings[h] != myGroup){ //Don't scan yourself
          if(this.groupings[h].index == myGroup.index){
            valid = false; // There are two groups of the same index... bad
          }
        }
      }
    }

    //Clear all the checks
    for(let a = 0; a < this.tiles.length; a++){
      for(let b = 0; b < this.tiles[a].length; b++){
        this.tiles[a][b].checked = false;
      }
    }
    //return true;
    // this.canControl = true;
    return valid;
  }

  this.currentGroup = [];
  this.createGroups = function(tile){
    let result = false;
    let n = this.getNeighbors(tile);
    if(n.length < 1){
      console.log("BROKEN");
      return;
    }
    if(!this.currentGroup.includes(tile)){
      this.currentGroup.push(tile);
      tile.checked = true;
    }
    for(let t = 0; t < n.length; t++){
      if(n[t].index == tile.index && !this.currentGroup.includes(n[t])){
        result = this.createGroups(n[t]);
      }
    }
    return result;
  }

  this.retire = function(ctx){
    this.canControl = false;
    //Here we're going to end this grid and make way for the new
    for(var i = 0; i < this.tiles.length; i++){
      for(var j = 0; j < this.tiles[i].length; j++){
        //this.tiles[i][j].targetPos.x+=(this.rate/2);
      //  this.tiles[i][j].targetPos.y+=(this.rate/2);
        this.tiles[i][j].setScale -= this.rate;
      }
    }
    if(this.tiles[0][0].setScale < 0){
      return true;
    }

    return false;
  }
}

function Grouping(index,tiles){
  this.index = index;
  this.tiles = tiles;
}
