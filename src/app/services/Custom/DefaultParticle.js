angular.module('GUIOPFG').factory('DefaultParticle', [function() {
    /* https://www.youtube.com/watch?v=YCI8uqePkrc */
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var particles = {};
    var particleIndex = 0;

    var DefaultParticle = function(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.vx = Math.random() * 10 - 5; /* let the user to set the velocity */
        this.vy = Math.random() * 10 - 5;
        this.gravity = 0.30; /*gravity */

        this.life = 0;
        this.maxLife = Math.random() *45-5; /* let user to kill off the particle whenever he wants */

        particleIndex++;
        this.id = particleIndex;
        particles[particleIndex] = this;

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

        if(this.life >= this.maxLife){
            delete particles[this.id];
        }
        console.log("------------");
        console.log(this.x);
        console.log(this.y);
        console.log("------------");
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, 10, 10); /*TODO: let the user to set the particle size */
    };

    return DefaultParticle;
}]);
