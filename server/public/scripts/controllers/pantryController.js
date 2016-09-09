app.controller('PantryController', ['$scope', '$http', 'FoodFactory', function ($scope, $http, FoodFactory) {
  console.log('pantryController is running');

  $scope.foodFactory = FoodFactory;

}]);
