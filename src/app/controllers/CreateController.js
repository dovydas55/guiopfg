angular.module('GUIOPFG').controller('CreateController', ['$scope', '$interval', 'DefaultParticle', function($scope, $interval, DefaultParticle) {
  "use strict"; //strick javascript mode
  $scope.init = function(){
      $scope.render();
      $scope.numberOFparticles = 10;
      $scope.particleSize = 10;
      $scope.particleLife = 50;
  };

  $scope.setParticleSize = function(){
      DefaultParticle.setParticleSize($scope.particleSize);
  };

  $scope.setParticleLife = function(){
      DefaultParticle.setParticleLife($scope.particleLife, $scope.randomParticleLife);
  };

  $scope.setRandomLife = function(){
      DefaultParticle.setParticleLife(null, $scope.randomParticleLife);
  };


  $scope.render = function(){
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var particles = DefaultParticle.returnAllParticles();

      $interval(function(){
          /*optional*/
          //ctx.globalCompositeOperatin = "source-over";
          /***/
          ctx.fillStyle = "rgba(0,0,0,0.2)"; /*clear rectangle */
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          DefaultParticle.createNumberOfParticles($scope.numberOFparticles);

          //ctx.globalCompositeOperatin = "lighter";
          for(var i in particles){
              particles[i].draw();
          }

      }, 30); /*how many are we spawning every 30 seconds */
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
