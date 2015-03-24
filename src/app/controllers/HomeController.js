angular.module('GUIOPFG').controller('HomeController', ['$scope', '$modal', function($scope, $modal) {
  "use strict"; //strick javascript mode
  $scope.init = function(){

  };

  $scope.addSuggestion = function(size){
    var modalInstance = $modal.open({
       templateUrl: 'src/templates/NewSuggestionTemplate.html',
       controller: 'ModalInstanceController',
       size: size
    });

    modalInstance.result.then(function(suggestion){
        console.log("TODO: proccess suggestion");
        console.log(suggestion);
    },function (obj){
        //user has pressed cancel!
        //Do we want to do anything?
    });
  };

  //iniliatize the variables after everything has loaded
  $scope.init();

}]);
