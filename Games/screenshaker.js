function ScreenShaker(context){
    this.intensity = 0; this.elapsedFrames = 0;
    this.totalFrames = 0;
    this.ctx = context;
    this.x = 0;
    this.y = 0;

    this.shake = function(amt=0.236,dur=485){
        if(amt < 0){
            console.warn('ScreenShaker.js will not accept negative values for intesity');
            return;
        }
        this.intensity += amt;
        if(this.intensity > 1){
            this.intensity == 1;
        }
        this.totalFrames += dur;
    }

    this.update = function(){
        if(this.elapsedFrames < this.totalFrames){
            if(this.elapsedFrames == 0){
                this.ctx.save();
            }
            this.ctx.translate(-this.x,-this.y);
            this.x = Math.floor((Math.random()-0.5)*this.intensity)*(this.totalFrames-this.elapsedFrames);
            this.y = Math.floor((Math.random()-0.5)*this.intensity)*(this.totalFrames-this.elapsedFrames);
            this.ctx.translate(this.x,this.y);
            this.elapsedFrames++;
        } else {
            this.ctx.restore();
            this.newShake = true;
            this.intensity = 0;
            this.elapsedFrames = this.totalFrames = 0;
            return false;
        }

    }

}
