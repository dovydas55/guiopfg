angular.module('GUIOPFG').controller('CreateController', ['$scope', '$interval', 'DefaultParticle', function($scope, $interval, DefaultParticle) {
  "use strict"; //strick javascript mode
  $scope.init = function(){
      $scope.render();
      $scope.script = {};
      $scope.script.timeToLive = {
          value: 50,
          random: false
      };
      $scope.script.timeToLive.value = 50;

      $scope.script.quota = 1;
      $scope.script.width = 10;
      $scope.script.height = 10;
      $scope.script.emmisionRate = $scope.script.quota;
      $scope.script.defaultParticleType = 'circle';


      $scope.customGravity = 0;
      $scope.emmisionRate = 30;

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
      DefaultParticle.setParticleSize({width: $scope.script.width, height: $scope.script.height});
  };

  $scope.setParticleLife = function(){
        DefaultParticle.setParticleLife($scope.script.timeToLive);
  };



  $scope.updateColor = function(){
      if($scope.randomRed || $scope.randomGreen || $scope.randomBlue || $scope.randomAlpha){
          DefaultParticle.randomRGBA({R: $scope.randomRed, G:$scope.randomGreen, B:$scope.randomBlue});
      } else if($scope.rgbaPicker === undefined){
          DefaultParticle.setCustomColor('rgba(255,255,255,1)', $scope.randomParticleColor);
      }
      else {
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
          ctx.globalCompositeOperation = "source-over";
          /***/
          ctx.fillStyle = "rgba(0,0,0,0.2)"; /*clear rectangle */
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          DefaultParticle.createNumberOfParticles($scope.script.emmisionRate);

          /*https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation*/
          ctx.globalCompositeOperation = "lighter";
          for(var i in particles){
              if($scope.script.defaultParticleType === 'circle'){
                  particles[i].drawCircles();
              } else if ($scope.script.defaultParticleType === 'square'){
                  particles[i].drawSquares();
              }

          }

      }, 33); /*how many are we spawning every 30 milli seconds */
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
