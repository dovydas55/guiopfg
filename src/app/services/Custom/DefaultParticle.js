angular.module('GUIOPFG').factory('DefaultParticle', [function() {
    /* https://www.youtube.com/watch?v=YCI8uqePkrc */
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var particles = {};
    var particleIndex = 0;

    var options = {
        width: 10,
        height: 10
    };

    var timeToLive = {
        value: 50,
        random: false
    };

    var customCords = {x: canvas.width / 2, y: canvas.height / 2};
    var customColor = 'rgba(255,255,255,1)';
    var customGravity = 0;

    var DefaultParticle = function(){
        this.x = customCords.x;
        this.y = customCords.y;

        if(timeToLive.random === false || timeToLive.random === undefined || timeToLive.startTime === undefined || timeToLive.endTime === undefined ||
        timeToLive.endTime === null || timeToLive.startTime === null || timeToLive.startTime > timeToLive.endTime){
            this.maxLife = timeToLive.value;
        } else {
            this.maxLife = Math.floor(Math.random()*(timeToLive.endTime - timeToLive.startTime + 1) + timeToLive.startTime);
            console.log(this.maxLife);
        }

        /* for randomizinf width + height use: */
        /* this.width = Math.ceil(Math.random() * options.width )*/
        this.width = options.width;
        this.height = options.height;
        this.radius = options.width;



        this.vx = Math.random() * 5 - 3; /* let the user to set the velocity */
        this.vy = Math.random() * 5 - 3;

        this.gravity = customGravity;

        this.color = customColor;

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

    DefaultParticle.setCustomColor = function(newcolor){
        customColor = newcolor;
    };

    DefaultParticle.randomRGBA = function(obj){
        randomRGBA = obj;
        randomRGBA_bool = true;
        staticColor = false;
    };

    DefaultParticle.setParticleSize = function(newsize){
        options.width = newsize.width;
        options.height = newsize.height;
    };

    DefaultParticle.setParticleLife = function(newlife){
        timeToLive = newlife;
    };

    DefaultParticle.returnAllParticles = function(){
        return particles;
    };

    DefaultParticle.clearParticles = function(){
        particles = {};
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

        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    };

    DefaultParticle.prototype.drawCircles = function(){
        DefaultParticle.setDrawingParameters(this);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

    };

    DefaultParticle.setDrawingParameters = function(obj){
        obj.x += obj.vx;
        obj.y += obj.vy;

        /* making like a fauntain
        if(obj.y > 300){
            obj.y = 300;
            obj.vy *= -0.85;
        }
        */
        obj.life++;
        obj.vy += Number(obj.gravity);

        /*add more randomness to the particle motion */
        /*
        if(Math.random() < 0.1){
          obj.vx = Math.random() * 10-5;
          obj.vy = Math.random() * 10-5;
        }
        */

        if(obj.life >= obj.maxLife){
            delete particles[obj.id];
        }
    };


    return DefaultParticle;
}]);
