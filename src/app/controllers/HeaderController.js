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
      $scope.SE.searchQuery = "";
  };

  $scope.routeHome = function(){
      $state.go('home');
  };

  $scope.routeToSuggestions = function(){
      $state.go('suggestions');
  };

  $scope.processMenu = function(filterOption){
      $state.go('allFiles', {filterBY: filterOption});
  };

  $scope.routeToCreate = function(){
      $state.go('create');
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
