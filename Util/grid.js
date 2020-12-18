/* Author: Andrew Adams
 *   Date: 11/5/2020
*/

function Grid(rows,columns,spacing_x,spacing_y,origin_x,origin_y,centered = true){
    this.rows = rows; this.columns = columns;
    this.spacing = {x:spacing_x,y:spacing_y};
    this.origin = {x:origin_x,y:origin_y};
    this.centered = centered;
    this.pos = [];

    this.build = function(){
        this.pos = [];
        this.size = {x:this.spacing.x*(this.columns-1),y:this.spacing.y*(this.rows-1)};
        for(var i = 0; i < this.rows;i++){
            var col = [];
            for(var j = 0; j < this.columns; j++){
                var x = j*this.spacing.x+this.origin.x;
                var y = i*this.spacing.y+this.origin.y;
                if(this.centered){
                    x -= this.size.x/2;
                    y -= this.size.y/2;
                }
                col.push(new Pos(x,y));
            }
            this.pos.push(col);
        }
    }

    this.scale = function(origin_x = this. origin.x,origin_y = this.origin.y,spacing_x = this.spacing.x, spacing_y = this.spacing.y){
        this.origin = {x:origin_x,y:origin_y};
        this.spacing = {x:spacing_x,y:spacing_y};
        this.size = {x:this.spacing.x*(this.columns-1),y:this.spacing.y*(this.rows-1)};
        for(var i = 0; i < this.rows;i++){
            for(var j = 0; j < this.columns; j++){
                this.pos[i][j].x = j*this.spacing.x+this.origin.x;
                this.pos[i][j].y = i*this.spacing.y+this.origin.y;
                if(this.centered){
                    this.pos[i][j].x -= this.size.x/2;
                    this.pos[i][j].y -= this.size.y/2;
                }
            }
        }
    }

    this.getClosestPos = function(x,y){
        var closestDistance = 14000000;
        var out = this.pos[0][0];
        for(var i = 0; i < this.pos.length; i++){
            for(var j = 0; j < this.pos[i].length; j++){
                var px = this.pos[i][j].x;
                var py = this.pos[i][j].y;
                var distance = Math.abs(Math.sqrt(Math.pow(px-x,2)+Math.pow(py-y,2)));

                if(distance < closestDistance){
                    closestDistance = distance;
                    out = this.pos[i][j];
                }
            }
        }
        return out;
    }

    this.getCurrentRowFromPosition = function(x,y){
        var closestDistance = 14000000;
        var out = 0;
        for(var i = 0; i < this.pos.length; i++){
            for(var j = 0; j < this.pos[i].length; j++){
                var px = this.pos[i][j].x;
                var py = this.pos[i][j].y;
                var distance = Math.abs(Math.sqrt(Math.pow(px-x,2)+Math.pow(py-y,2)));

                if(distance < closestDistance){
                    closestDistance = distance;
                    out = i;
                }
            }
        }
        return out;
    }

    this.getCurrentColFromPosition = function(x,y){
        var closestDistance = 14000000;
        var out = 0;
        for(var i = 0; i < this.pos.length; i++){
            for(var j = 0; j < this.pos[i].length; j++){
                var px = this.pos[i][j].x;
                var py = this.pos[i][j].y;
                var distance = Math.abs(Math.sqrt(Math.pow(px-x,2)+Math.pow(py-y,2)));

                if(distance < closestDistance){
                    closestDistance = distance;
                    out = j;
                }
            }
        }
        return out;
    }

    //Should *IDEALLY* only be used for debug purposes and associated to a canvas / ctx refers to the context2d object onto which the grid should be drawn.
    this.draw = function(ctx,radius = 1){
        if(ctx == undefined){
            console.warn("Grid Draw Requires a context");
            return;
        }
        for(var i = 0; i < this.pos.length;i++){
            for(var j = 0; j < this.pos[i].length; j++){
                ctx.fillStyle='#00000088';
                ctx.fillRect(this.pos[i][j].x-radius, this.pos[i][j].y-radius,radius*2,radius*2);

                ctx.fillStyle='#FFF';
                ctx.fillText(i+","+j,this.pos[i][j].x-radius,this.pos[i][j].y-radius+10);
            }
        }
    }

    this.swap = function(){
        var tr = this.rows;
        this.rows = this.columns;
        this.columns = tr;
        this.build();

    }



    this.addRowToEnd = function(){
        this.rows++;
        var r = [];
        for(var n = 0; n < this.columns; n++){
            r.push(new Pos(0,0));
        }
        this.pos.push(r);
        this.scale();
    }

    this.addRowToBeginning = function(){
        this.rows++;
        var r = [];
        for(var n = 0; n < this.columns; n++){
            r.push(new Pos(0,0));
        }
        this.pos.unshift(r);
        this.scale();
    }

    this.removeRowFromEnd = function(){
        this.rows--;
        this.pos.pop();
        this.scale();
    }

    this.removeRowFromBeginning = function(){
        this.rows--;
        this.pos.shift();
        this.scale();
    }

    this.addColumnToEnd = function(){
        this.columns++;
        for(var i = 0; i < this.pos.length;i++){
            this.pos[i].push(new Pos(0,0));
        }
        this.scale();
    }

    this.addColumnToBeginning = function(){
        this.columns++;
        for(var i = 0; i < this.pos.length;i++){

            this.pos[i].unshift(new Pos(0,0));
        }
        this.scale();
    }

    this.removeColumnFromEnd = function(){
        this.columns--;
        for(var i = 0; i < this.pos.length;i++){
            this.pos[i].pop();
        }
        this.scale();
    }

    this.removeColumnFromBeginning = function(){
        this.columns--;
        for(var i = 0; i < this.pos.length;i++){
            this.pos[i].shift();
        }
        this.scale();
    }

    this.build();
}

function Pos(x,y){this.x = x; this.y = y;}
