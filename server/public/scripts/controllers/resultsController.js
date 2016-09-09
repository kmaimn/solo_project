app.controller('ResultsController', ['$scope', '$http', 'FoodFactory', function ($scope, $http, FoodFactory) {
  console.log('resultsController is running');

    $scope.foodFactory = FoodFactory;

    $scope.ingredients = $scope.foodFactory.results();

}]);
