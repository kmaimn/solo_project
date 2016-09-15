app.controller('NavController', ['$scope', '$http', 'FoodFactory', '$location', function ($scope, $http, FoodFactory, $location) {
  console.log('navController is running');

  $scope.foodFactory = FoodFactory;
  $scope.genericInput = '';

  //search bar based on input;
  $scope.genericSearch = function () {
    $scope.foodFactory.move();
    var genericInput = $scope.genericInput;
    $scope.foodFactory.setQuery(genericInput);
    $scope.foodFactory.getQuery().then(function(){
      $location.path('/results');
      $scope.genericInput = '';
    });
  };

}]);
