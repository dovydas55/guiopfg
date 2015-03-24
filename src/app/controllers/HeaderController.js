angular.module('GUIOPFG').controller('HeaderController', ['$scope', '$state', 'Utility', function($scope, $state, Utility) {
  "use strict"; //strick javascript mode
  $scope.init = function(){
      $scope.SE = {
          searchQuery: ""
      };
  };

  $scope.search = function(){
      Utility.backupSearchQuery($scope.SE.searchQuery);
      $state.go('searchResults');
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
