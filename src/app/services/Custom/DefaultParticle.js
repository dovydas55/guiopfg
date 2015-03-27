angular.module('GUIOPFG').factory('DefaultParticle', [function() {
    /* https://www.youtube.com/watch?v=YCI8uqePkrc */
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var particles = {};
    var particleIndex = 0;
    var particleSize = 10;
    var particleLife = 50;
    var customColor = 'rgba(255,255,255,1)';
    var custom = false;
    var customClr = false;
    var customGravity = 0;
    var customCords = {x: canvas.width / 2, y: canvas.height / 2};


    var DefaultParticle = function(){
        //this.x = canvas.width / 2;
        //this.y = canvas.height / 2;
        this.x = customCords.x;
        this.y = customCords.y;

        if(custom){
            this.maxLife = particleLife;
        } else {
            this.maxLife = Math.ceil(Math.random() * 75);
        }

        this.size = Math.ceil(Math.random() * Number(particleSize));

        this.vx = Math.random() * 5 - 3; /* let the user to set the velocity */
        this.vy = Math.random() * 5 - 3;

        this.gravity = customGravity;

        if(customClr){
            this.color = customColor;
        } else { /*user wants to use a custom color */
            //this.color = "hsla("+ parseInt(Math.random()*360,10) + ",100%, 50%, 1.0)"; /*saturation - lightness - alpha*/
            this.color = 'rgba(255,255,255,1)';
        }

        this.life = 0;
        particleIndex++;
        this.id = particleIndex;
        particles[particleIndex] = this;

    };

    DefaultParticle.dragTheParticle = function(cords){
        customCords = cords;
    };

    DefaultParticle.createGravity = function(newgravity){
        customGravity = newgravity;
    };

    DefaultParticle.setCustomColor = function(newcolor, bool_color){
        customColor = newcolor;
        customClr = bool_color;
    };

    DefaultParticle.setParticleSize = function(newsize){
        particleSize = newsize;
    };

    DefaultParticle.setParticleLife = function(newlife, bool_custom){
        particleLife = newlife;
        custom = bool_custom;
    };

    DefaultParticle.returnAllParticles = function(){
        return particles;
    };

    DefaultParticle.createNumberOfParticles = function(num){
        for(var i = 0; i < num; i++){
            new DefaultParticle();
        }
    };

    DefaultParticle.prototype.drawSquares = function(){
        DefaultParticle.setDrawingParameters(this);
        ctx.beginPath();
        ctx.fillStyle = this.color;

        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.closePath();
    };

    DefaultParticle.prototype.drawCircles = function(){
        DefaultParticle.setDrawingParameters(this);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

    };

    DefaultParticle.setDrawingParameters = function(obj){
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.life++;
        obj.vy += Number(obj.gravity);

        if(Math.random() < 0.1){ /*add more randomness to the particle motion */
          obj.vx = Math.random() * 10-5;
          obj.vy = Math.random() * 10-5;
        }

        if(obj.life >= obj.maxLife){
            delete particles[obj.id];
        }
    };


    return DefaultParticle;
}]);
