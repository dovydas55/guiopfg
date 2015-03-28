angular.module('GUIOPFG').controller('CreateController', ['$scope', '$interval', 'DefaultParticle', function($scope, $interval, DefaultParticle) {

  var EmmiterLoop;
  var durationInterval;
  var randomDurationInterval;

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  $scope.init = function(){
      $scope.script = {};
      $scope.script.timeToLive = {
          value: 50,
          random: false
      };
      $scope.script.duration = {
          value: 0,
          random: false,
          startTime: 1000,
          endTime: 1500
      };

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
      $scope.render();
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
  $scope.setDuration = function(){
      $interval.cancel(durationInterval);
      if($scope.script.duration.random === true){
        $scope.RandomDurationInterval();
      }
      else if($scope.script.duration.value === 0 || $scope.script.duration.value === null || $scope.script.duration.value <= 500 || $scope.script.duration === false){
          $interval.cancel(EmmiterLoop);
          $interval.cancel(durationInterval);
          $interval.cancel(randomDurationInterval);
          $scope.render();
          console.log("donnneee");
      } else{
          $interval.cancel(randomDurationInterval);
          durationInterval = $interval(function(){
              $interval.cancel(EmmiterLoop);
              $scope.cleanCanvas();
              DefaultParticle.clearParticles();
              $scope.render();
          }, $scope.script.duration.value);
      }
  };

  $scope.RandomDurationInterval = function(){
      var itr = Number(Math.floor(Math.random()*($scope.script.duration.endTime - $scope.script.duration.startTime + 1) + $scope.script.duration.startTime));
      //$interval.cancel(EmmiterLoop);
      $interval.cancel(durationInterval);
      $interval.cancel(randomDurationInterval);
      console.log(itr);
      randomDurationInterval = $interval(function(){
          $interval.cancel(EmmiterLoop);
          $scope.cleanCanvas();
          DefaultParticle.clearParticles();
          $scope.render();
          $scope.RandomDurationInterval();
      }, itr);
  };

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
      var particles = DefaultParticle.returnAllParticles();
      EmmiterLoop = $interval(function(){
          /*optional*/
          ctx.globalCompositeOperation = "source-over";
          /***/

          DefaultParticle.createNumberOfParticles($scope.script.emmisionRate);
          $scope.cleanCanvas();
          ctx.globalCompositeOperation = "lighter";
          $scope.AnimateParticles(particles);

      }, 33); /*how many are we spawning every 30 milli seconds */
  };

  $scope.cleanCanvas = function(){
      //ctx.fillStyle = "rgba(0,0,0,1)"; /*clear rectangle */
      //ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  $scope.AnimateParticles = function(particles){
    /*https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation*/
      for(var i in particles){
          if($scope.script.defaultParticleType === 'circle'){
              particles[i].drawCircles();
          } else if ($scope.script.defaultParticleType === 'square'){
              particles[i].drawSquares();
          }

      }
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
