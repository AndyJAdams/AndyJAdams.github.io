function Unit(name,x,y,r,t,game,parent,playable=true){
    this.x = x; this.y = y; this.r = r;
    this.game = game;
    this.playable = playable;
    this.selected = false;
    this.name = name;
    this.timestep = Date.now();
    this.delay = t;
    this.parent = parent;
    this.cost = 50;
    this.award = 5;

    this.state = 0;
    this.engines = [];

    this.draw = function(){
        switch(this.state){
            case 0:
            default:
                ctx.lineWidth = 4;
                ctx.strokeRect(this.x-this.r/2-5,this.y-this.r/2-5,this.r+10,this.r+10);
                let w = this.r/this.engines.length;
                for(let e = 0; e < this.engines.length;e++){
                    ctx.fillRect(this.x-this.r/2+(e*w),this.y+(this.r/2)-(this.r*this.engines[e].percentage),w,this.r*this.engines[e].percentage);
                }
                ctx.fillText(this.cost,this.x-this.r/2,this.y+this.r/2+20);
                break;
        }
    }

    this.update=function(){
        if(this.selected){
            if(this.game.currency > this.cost){
                this.game.currency -= this.cost;
            }
            this.addEngine();
            this.selected = false;
        }

        for(let e = 0; e < this.engines.length;e++){
            this.engines[e].update();
        }
        this.draw();
    }

    this.addEngine = function(){
        if(this.engines.length > 4){
            this.delay /= 1.05;
            this.cost *= 1.1;
            this.engines = [];
        }
        this.engines.push(new Engine(this,this.delay));
    }

    this.reward = function(){
        this.game.currency += this.award;
    }

    this.addEngine();
}

function Engine(unit,delay){
    this.unit = unit;
    this.start = Date.now();
    this.timestep = Date.now();
    this.delay = delay;
    this.percentage = 0;

    this.update = function(){
        this.percentage = (Date.now()-this.timestep)/this.delay;
        if(this.percentage > 1){
            this.unit.reward();
            this.timestep = Date.now();
        }
    }
}

function Game(){
    this.currency=100;
    this.start = Date.now();
    this.paused = false;
    this.units = [];
    this.playableCount = 0;
    this.offset = {x: 0,y: 0};

    this.createUnit = function(x,y,parent,playable){
        let newU = new Unit("A"+this.playableCount,x,y,60,10000,this,parent,playable);
        this.units.push(newU);
        this.playableCount++;
    }

    this.update =function(){
        for(let i = 0; i < this.units.length; i++){
            this.units[i].update();
        }
    }

    this.createUnit(innerWidth/2,innerHeight/2,undefined,true);
}