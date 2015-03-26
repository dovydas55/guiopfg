angular.module('GUIOPFG').controller('CreateController', ['$scope', function($scope) {
  "use strict"; //strick javascript mode
  $scope.init = function(){
      var el = document.getElementById("myCanvas");
      var ctx = el.getContext("2d");

  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
