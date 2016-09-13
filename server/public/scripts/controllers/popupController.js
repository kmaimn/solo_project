app.controller('PopUpController', ['$scope', '$http', '$uibModalInstance', 'result', function ($scope, $http, $uibModalInstance, result) {
  console.log('popupController is running');

  $scope.toBuy = [];
  $scope.result = result;

  $scope.ok = function () {
    $uibModalInstance.close($scope.toBuy);
    $scope.sendText();
    console.log('Things to buy:', $scope.toBuy);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    console.log('Nevermind.');
  };

  $scope.sendText = function () {

    var list = $scope.toBuy;
    console.log(list);

    $http({
      method: 'POST',
      url: '/messageRoute',
      data: list
    }).then(function (response) {
      console.log('Ingredients were sent..?');
    });
  };

}]);
