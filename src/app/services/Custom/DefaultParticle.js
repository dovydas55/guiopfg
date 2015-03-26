angular.module('GUIOPFG').factory('DefaultParticle', [function() {
    /* https://www.youtube.com/watch?v=YCI8uqePkrc */
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var particles = {};
    var particleIndex = 0;
    var particleSize = 10;
    var particleLife = 50;
    var custom = false;


    var DefaultParticle = function(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

        if(custom){
            this.maxLife = particleLife;
        } else {
            this.maxLife = Math.random() *75-5;
        }

        this.vx = Math.random() * 10 - 5; /* let the user to set the velocity */
        this.vy = Math.random() * 10 - 5;
        this.gravity = 0; /*TODO: let user set the gravity */

        this.color = "hsla("+ parseInt(Math.random()*360,10) + ",100%, 50%, 0.4)"; /*saturation - lightness - alpha*/

        this.life = 0;
        particleIndex++;
        this.id = particleIndex;
        particles[particleIndex] = this;

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

    DefaultParticle.prototype.draw = function(){
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        this.vy += this.gravity;

        /*add more randomness to the particle motion */
        if(Math.random() < 0.1){
            this.vx = Math.random() * 10-5;
            this.vy = Math.random() * 10-5;
        }

        if(this.life >= this.maxLife){
            delete particles[this.id];
        }

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, particleSize, particleSize);
    };

    return DefaultParticle;
}]);
