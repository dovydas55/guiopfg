angular.module('GUIOPFG').controller('CreateController', ['$scope', '$interval', 'DefaultParticle', function($scope, $interval, DefaultParticle) {
  "use strict"; //strick javascript mode
  $scope.init = function(){
      $scope.render();
      $scope.numberOFparticles = 1;
      $scope.particleSize = 10;
      $scope.particleLife = 50;
      $scope.defaultParticleType = 'circle';
      $scope.customGravity = 0;

      /* for dragging the particles */
      $scope.isMoving = false;
      /* ************************** */
  };

  /*mouse operations for moving particle effects*/
  $scope.dragTheParticle = function(cords){
      if($scope.isMoving){
          //console.log(cords.offsetX);
          //console.log(cords.offsetY);
          DefaultParticle.dragTheParticle({x: cords.offsetX, y: cords.offsetY});

      }
  };

  $scope.startMoving = function(){
      $scope.isMoving = true;
  };

  $scope.stopMoving = function(){
      $scope.isMoving = false;
  };

  /**********************************************/

  $scope.setParticleSize = function(){
      DefaultParticle.setParticleSize($scope.particleSize);
  };

  $scope.setParticleLife = function(){
      DefaultParticle.setParticleLife($scope.particleLife, $scope.randomParticleLife);
  };

  $scope.setRandomLife = function(){
      DefaultParticle.setParticleLife(50, $scope.randomParticleLife); /*send in default value for particle life*/
  };

  $scope.updateColor = function(){
      if($scope.rgbaPicker === undefined){
          DefaultParticle.setCustomColor('rgba(255,255,255,1)', $scope.randomParticleColor);
      } else {
          DefaultParticle.setCustomColor($scope.rgbaPicker.color, $scope.randomParticleColor);
      }

  };

  $scope.updateGravity = function(){
      DefaultParticle.createGravity($scope.customGravity);
  };


  $scope.render = function(){
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var particles = DefaultParticle.returnAllParticles();

      $interval(function(){
          /*optional*/
          //ctx.globalCompositeOperation = "source-over";
          /***/
          ctx.fillStyle = "rgba(0,0,0,0.2)"; /*clear rectangle */
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          DefaultParticle.createNumberOfParticles($scope.numberOFparticles);

          //ctx.globalCompositeOperation = "lighter";
          for(var i in particles){
              if($scope.defaultParticleType === 'circle'){
                  particles[i].drawCircles();
              } else if ($scope.defaultParticleType === 'square'){
                  particles[i].drawSquares();
              }

          }

      }, 30); /*how many are we spawning every 30 seconds */
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
