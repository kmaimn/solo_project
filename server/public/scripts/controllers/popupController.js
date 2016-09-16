app.controller('RecipeController', ['$scope', '$http', '$uibModalInstance', 'result', function ($scope, $http, $uibModalInstance, result) {
  console.log('recipeController is running');

  $scope.toBuy = [];
  $scope.result = result;

  //OK button;
  $scope.ok = function () {
    $uibModalInstance.close($scope.toBuy);
    $scope.sendText();
    console.log('Things to buy:', $scope.toBuy);
  };

  //cancel button;
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    console.log('Nevermind.');
  };

  //texting function;
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

app.controller('FavoriteRecipeController', ['$scope', '$http', '$uibModalInstance', 'FavoriteFactory',
 function ($scope, $http, $uibModalInstance, FavoriteFactory) {
  console.log('favoriterecipeController is running');

  $scope.favoriteFactory = FavoriteFactory;
  $scope.toBuy = [];

  //gets list of favorites from the DB;
  $scope.favorites = $scope.favoriteFactory.favorites();
  console.log('entire favorites list:', $scope.favorites);

  //gets the ID of the favorite you want to view;
  $scope.detailInfo = $scope.favoriteFactory.getDetail();
  console.log('id number of favorite selected:', $scope.detailInfo);

  //OK button, sends text;
  $scope.ok = function () {
    $uibModalInstance.close($scope.toBuy);
    $scope.sendText();
    console.log('Things to buy:', $scope.toBuy);
  };

  //cancel button;
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    console.log('Nevermind.');
  };

  //texting function;
  $scope.sendText = function () {

    var list = $scope.toBuy;

    $http({
      method: 'POST',
      url: '/messageRoute',
      data: list
    }).then(function (response) {
      console.log('Ingredients were sent..with:', list);
    });
  };

}]);
