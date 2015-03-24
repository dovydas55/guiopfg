angular.module('GUIOPFG').controller('ModalInstanceController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

  $scope.ok = function (suggestion) {
      $modalInstance.close(suggestion);
  };

  $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
  };
}]);
