angular.module('GUIOPFG').controller('CreateController', ['$scope', '$interval', 'DefaultParticle', 'Converter', function($scope, $interval, DefaultParticle, Converter) {
  "use strict"; //strick javascript mode

  var EmmiterLoop;
  var durationInterval;
  var randomDurationInterval;

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var emmiter = document.getElementById("emmiterType");
  var emmiterCtx = emmiter.getContext("2d");

  var gravity = document.getElementById("gravity");
  var gravityCtx = gravity.getContext("2d");


  $scope.init = function(){
      $scope.script = {};
      $scope.script.position = {};
      $scope.script.timeToLive = {
          value: 50,
          random: false,
          startTime: 0,
          endTime: 50
      };
      $scope.script.duration = {
          value: 0,
          random: false,
          startTime: 1000,
          endTime: 1500
      };

      $scope.script.randomizer = {
          randomness: 1,
          scope: 0
      };

      $scope.script.emmiter = {
          type: "box"
      };

      $scope.script.direction = {
          x: 0,
          y: 0,
          speed: 1,
          angle: 0
      };

      $scope.script.quota = 1;
      $scope.script.width = 10;
      $scope.script.height = 10;
      $scope.script.emmisionRate = $scope.script.quota;
      $scope.script.defaultParticleType = 'circle';


      $scope.customGravity = 0;

      /* for dragging the particles */
      $scope.isMoving = false;
      $scope.isEmmiterMoving = false;
      $scope.isGravityUpdating = false;

      $scope.shape = {
        startX: 0,
        startY: 0
      };
      /* ************************** */
      Converter.debug();
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

  /*--------------------------------------------*/
  /*mouse down*/
  $scope.emmiterStart = function(start){
      $scope.clearEmmiterCanvas();
      $scope.isEmmiterMoving = true;
      $scope.shape.startX = start.offsetX;
      $scope.shape.startY = start.offsetY;
  };
  /*mouse up*/
  $scope.emmiterStop = function(){
      $scope.isEmmiterMoving = false;
  };
  /*mouse move*/
  $scope.emmiterDefine = function(cords){
      if($scope.script.emmiter.type === 'box' && $scope.isEmmiterMoving){
          $scope.drawBox(cords);
      } else if ($scope.script.emmiter.type === 'ring' && $scope.isEmmiterMoving){
          $scope.drawRing(cords);
      } else if($scope.script.emmiter.type === 'point' && $scope.isEmmiterMoving){
          //NOT SURE WHAT TO DO HERE
      }
  };

  /*-------------------------------------*/
  $scope.gravityStart = function(event){
      $scope.isGravityUpdating = true;
  };

  $scope.gravityStop = function(){
      $scope.isGravityUpdating = false;
  };

  $scope.setGravity = function(event){
      if($scope.isGravityUpdating){
          $scope.drawGravityLine(event);
      }
  };

  $scope.drawGravityLine = function(event){
      gravityCtx.beginPath();
      gravityCtx.strokeStyle = "red";
      gravityCtx.lineWidth = 2;

      gravityCtx.moveTo(gravity.width / 2, gravity.height / 2);
      gravityCtx.lineTo(event.offsetX, event.offsetY);
      $scope.clearGravityCanvas();

      var xdiff = event.offsetX - (gravity.width / 2);
      var ydiff = event.offsetY - (gravity.height / 2);

      DefaultParticle.updateGravity({xComponent: xdiff * 0.03, yComponent: ydiff * 0.03});

 //***TODO: Check out bias effects in OGRE
      Converter.setLineForceAffector({x: xdiff, y: ydiff});
      
      gravityCtx.stroke();
      gravityCtx.closePath();
  };

  $scope.clearGravityCanvas = function(){
      gravityCtx.clearRect(0, 0, gravity.width, gravity.height);
  };

  $scope.clearEmmiterCanvas = function(){
      emmiterCtx.clearRect(0, 0, emmiter.width, emmiter.height);
  };

  $scope.drawRing = function(cords){
    var xLength = $scope.shape.startX - cords.offsetX;
    var yLength = $scope.shape.startY - cords.offsetY;
    emmiterCtx.beginPath();
    var radius = Math.sqrt( Math.pow(Math.abs(xLength), 2) + Math.pow(Math.abs(yLength), 2) );
    emmiterCtx.arc(cords.offsetX, cords.offsetY, radius, 0, 2 * Math.PI, false );
    emmiterCtx.lineWidth = 2;
    emmiterCtx.strokeStyle = "red";
    $scope.clearEmmiterCanvas();

    DefaultParticle.DisplayEmmiterType({startX: $scope.shape.startX, startY: $scope.shape.startY, w: null, h: null, r: radius, type: "ring"});
    

//***TODO: Add set function

    emmiterCtx.stroke();
    emmiterCtx.closePath();
  };

  $scope.drawBox = function(cords){
    emmiterCtx.beginPath();
    emmiterCtx.lineWidth = 2;
    emmiterCtx.strokeStyle = "red";

    var width = $scope.shape.startX - cords.offsetX;
    var height = $scope.shape.startY - cords.offsetY;

    $scope.clearEmmiterCanvas();

    DefaultParticle.DisplayEmmiterType({startX: $scope.shape.startX, startY: $scope.shape.startY, w: width, h: height, r: null, type: "box"});
//***TODO: Add set function

    emmiterCtx.strokeRect(cords.offsetX, cords.offsetY, width, height);
    emmiterCtx.closePath();

  };


  /**********************************************/
  $scope.setRandomizer = function(){
      console.log('randFunc');
      DefaultParticle.setRandomizer({rand: $scope.script.randomizer.randomness, scope: $scope.script.randomizer.scope});
      Converter.setRandomizer({rand: $scope.script.randomizer.randomness, scope: $scope.script.randomizer.scope});
  };

  $scope.setDirecton = function(){
      var xDir = ($scope.script.direction.x * 10) - (canvas.width / 2);
      var yDir = ($scope.script.direction.y * 10) - (canvas.height / 2);

      DefaultParticle.setDirectionVector({x: xDir * 0.1, y: yDir * 0.1 * -1, speed: $scope.script.direction.speed / 10, angle: $scope.script.direction.angle / 10});
      Converter.setDirection({x: xDir, y: yDir});
      Converter.setVelocity({velocity: $scope.script.direction.speed});
      Converter.setAngle({angle: $scope.script.direction.angle});
  };

  $scope.setDuration = function(){
      $interval.cancel(durationInterval);
      if($scope.script.duration.random === true){
        $scope.RandomDurationInterval();
      }
      else if($scope.script.duration.value === 0 || $scope.script.duration.value === null || $scope.script.duration.value <= 500 || $scope.script.duration === false){
          Converter.setDuration({duration: $scope.script.duration});
          $interval.cancel(EmmiterLoop);
          $interval.cancel(durationInterval);
          $interval.cancel(randomDurationInterval);
          $scope.render();
      } else{
          Converter.setDuration({duration: $scope.script.duration});
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
      Converter.setRandomDuration({max: $scope.script.duration.endTime, min: $scope.script.duration.startTime});
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
      Converter.setHeightAndWidth({width: $scope.script.width, height: $scope.script.height});
  };

  $scope.setParticleLife = function(){
        //console.log('asdf');
        DefaultParticle.setParticleLife($scope.script.timeToLive);
        Converter.setTimeToLive({time: $scope.script.timeToLive});
  };


  $scope.updateColor = function(){
      if($scope.rgbaPicker === undefined){
          DefaultParticle.setCustomColor('rgba(255,255,255,1)', $scope.randomParticleColor);
          Converter.setColor({x: 1, y: 1, z: 1, a: 1});
      } else {
          DefaultParticle.setCustomColor($scope.rgbaPicker.color, $scope.randomParticleColor);
          //console.log($scope.rgbaPicker.color);
          Converter.setColor({string: $scope.rgbaPicker.color});
      }
  };


  $scope.updateGravity = function(){
      DefaultParticle.createGravity($scope.customGravity);
 //***TODO: Add set function
  };

  //To emulate OGRE3D fade-out effect in particles (bright in the center and fades to the end)
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

  $scope.getName = function(){
    Converter.setName({name: $scope.script.name});
  };

  $scope.getPosition = function(){
    Converter.setPosition({x: $scope.script.position.x, 
                          y: $scope.script.position.y, 
                          z: $scope.script.position.z});
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
