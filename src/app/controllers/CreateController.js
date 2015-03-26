angular.module('GUIOPFG').controller('CreateController', ['$scope', '$interval', 'DefaultParticle', function($scope, $interval, DefaultParticle) {
  "use strict"; //strick javascript mode
  $scope.init = function(){
      $scope.render();
  };

  $scope.render = function(){
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var particles = DefaultParticle.returnAllParticles();

      $interval(function(){
          ctx.fillStyle = "black"; /*clear rectangle */
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          DefaultParticle.createNumberOfParticles(15);
          for(var i in particles){
              particles[i].draw();
          }

      }, 30);
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
