app.controller('HomeController', ['$scope', '$http', 'FoodFactory', '$location', function ($scope, $http, FoodFactory, $location) {
  console.log('homeController is running');

  $scope.foodFactory = FoodFactory;
  $scope.selectedIngredients = [];
  $scope.results = [];

  if ($scope.foodFactory.inventory() === undefined) {
    console.log('Get inventory from the DB');
    $scope.foodFactory.getInventory().then(function (response) {
      $scope.pantry = $scope.foodFactory.inventory();
    });
  } else {
    $scope.pantry = $scope.foodFactory.inventory();
  }

  $scope.getIngredients = function () {
    var query = $scope.selectedIngredients.join();
    $scope.foodFactory.setQuery(query);
    $scope.foodFactory.getQuery().then(function(){
      $location.path('/results');
    });
  };


}]);
