angular.module('GUIOPFG').controller('SE_Controller', ['$scope', '$rootScope', 'Utility', function($scope, $rootScope, Utility) {
  "use strict"; //strick javascript mode
  $scope.init = function(){
      /*TODO: get from the database searched values*/
      console.log(Utility.getSearchQuery());
  };


  $rootScope.$on('$locationChangeSuccess', function(event){
      Utility.removeSearchQuery(); 
  });

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
