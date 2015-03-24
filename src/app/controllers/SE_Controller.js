angular.module('GUIOPFG').controller('SE_Controller', ['$scope', 'Utility', function($scope, Utility) {
  "use strict"; //strick javascript mode
  $scope.init = function(){
      /*TODO: get from the database searched values*/
      console.log(Utility.getSearchQuery());
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
