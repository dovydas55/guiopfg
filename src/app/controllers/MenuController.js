angular.module('GUIOPFG').controller('MenuController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
  "use strict"; //strick javascript mode
  $scope.init = function(){
      $scope.filterBy = "all"; /* default filtering */
      if($state.includes('suggestions')){
          //TODO: process suggestions
      } else if ($state.includes('allFiles')){
          if($stateParams.filterBY === 'all'){
              $scope.filterBy = "ALL";
          } else if ($stateParams.filterBY === 'popular'){
              $scope.filterBy = "POPULAR";
          } else if ($stateParams.filterBY === 'latest'){
              $scope.filterBy = "LATEST";
          }
          console.log($stateParams.filterBY);
      }

  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
