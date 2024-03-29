angular.module('GUIOPFG').factory('DefaultParticle', [function() {
    /* https://www.youtube.com/watch?v=YCI8uqePkrc */
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var particleIndex = 0;
    var particles = {};
    var emmiter = {};
    var deflector = {
      isActive: false,
      bounce: 1.0
    };
    var randomizer = {
      rand: 1,
      scope: 0
    };

    var directionVector = {
        x: 0,
        y: 0,
        speed: 1,
        angle: 0
    };

    var options = {
        width: 10,
        height: 10
    };

    var timeToLive = {
        value: 50,
        random: false
    };

    var customGravity = {
        xComponent: 0,
        yComponent: 0
    };

    var customCords = {x: canvas.width / 2, y: canvas.height / 2};
    var customColor = 'rgba(255,255,255,1)';


    var DefaultParticle = function(){
        this.x = customCords.x;
        this.y = customCords.y;
        if(emmiter.type === 'point'){
            this.x = customCords.x;
            this.y = customCords.y;
        }
        else if(emmiter.type === 'box'){
            this.x = emmiter.startX + Math.ceil(Math.random() * (emmiter.w * -1));
            this.y = emmiter.startY + Math.ceil(Math.random() * (emmiter.h * -1));
        } else if(emmiter.type === 'ring'){
          var randNum = Math.random();
          if(randNum <= 0.50){
              var angle = Math.random() * (Math.PI);
              this.x = emmiter.startX + emmiter.r * Math.cos(angle);
              this.y = emmiter.startY + emmiter.r * Math.sin(angle);
          } else {
              var angle2 = Math.random() * (Math.PI);
              this.x = emmiter.startX - emmiter.r * Math.cos(angle2);
              this.y = emmiter.startY - emmiter.r * Math.sin(angle2);
          }
        }

        if(timeToLive.random === false || timeToLive.random === undefined || timeToLive.startTime === undefined || timeToLive.endTime === undefined ||
        timeToLive.endTime === null || timeToLive.startTime === null || timeToLive.startTime > timeToLive.endTime){
            this.maxLife = timeToLive.value;
        } else {
            this.maxLife = Math.floor(Math.random()*(timeToLive.endTime - timeToLive.startTime + 1) + timeToLive.startTime);
        }

        /* for randomizinf width + height use: */
        /* this.width = Math.ceil(Math.random() * options.width )*/
        this.width = options.width;
        this.height = options.height;
        this.radius = options.width;

        if(Math.random() <= randomizer.scope){
            if(directionVector.x === 0 && directionVector.y === 0){
              this.vx = Math.ceil(Math.random() * randomizer.rand - (randomizer.rand * 0.6));
              this.vy = Math.ceil(Math.random() * randomizer.rand - (randomizer.rand * 0.6));
            } else {

                if(directionVector.angle === 0){
                  this.vx = Math.ceil(Math.random() * randomizer.rand - (randomizer.rand * 0.6)) + directionVector.x * directionVector.speed;
                  this.vy = Math.ceil(Math.random() * randomizer.rand - (randomizer.rand * 0.6)) + directionVector.y * directionVector.speed;
                } else {
                  this.vx = Math.ceil(Math.random() * directionVector.angle * randomizer.rand - (randomizer.rand * 0.6)) + directionVector.x * directionVector.speed;
                  this.vy = Math.ceil(Math.random() * directionVector.angle * randomizer.rand - (randomizer.rand * 0.6)) + directionVector.y * directionVector.speed;
                }
            }
        } else {
            if(directionVector.x === 0 && directionVector.y === 0){
              this.vx = Math.random() * 5 -3;
              this.vy = Math.random() * 5 -3;
            } else {

                if(directionVector.angle === 0){
                  this.vx = directionVector.x * directionVector.speed;
                  this.vy = directionVector.y * directionVector.speed;
                } else {
                  this.vx = Math.ceil(Math.random() * directionVector.angle) + directionVector.x * directionVector.speed;
                  this.vy = Math.ceil(Math.random() * directionVector.angle) + directionVector.y * directionVector.speed;
                }
            }
        }

        this.vy *= -1; /************* inverting y coordinate for OGRE ********************/

        this.gravity = customGravity;
        this.color = customColor;

        this.life = 0;
        particleIndex++;
        this.id = particleIndex;
        particles[particleIndex] = this;

    };

    DefaultParticle.setDeflector = function(obj){
        console.log(obj);
        deflector = obj;
    };

    DefaultParticle.setDirectionVector = function(obj){
        directionVector = obj;
    };

    DefaultParticle.updateGravity = function(updatedGravity){
        customGravity = updatedGravity;
    };

    DefaultParticle.setRandomizer = function(obj){
        randomizer = obj;
    };

    DefaultParticle.DisplayEmmiterType = function(emmiterObj){
        emmiter = emmiterObj;
    };

    DefaultParticle.dragTheParticle = function(cords){
        customCords = cords;
    };



    DefaultParticle.setCustomColor = function(newcolor){
        customColor = newcolor;
    };

/*
    DefaultParticle.randomRGBA = function(obj){
        randomRGBA = obj;
        randomRGBA_bool = true;
        staticColor = false;
    };
*/
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

        if(deflector.isActive){
          if(obj.y > 400){
              obj.y = 400;
              obj.vy *= (deflector.bounce * -1);
          }
        }

        obj.life++;

        obj.vy += Number(obj.gravity.yComponent);
        obj.vx += Number(obj.gravity.xComponent);

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
