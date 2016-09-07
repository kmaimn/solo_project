app.controller('HomeController', ['$scope', '$http', 'FoodFactory', function ($scope, $http, FoodFactory) {
  console.log('homeController is running');

  $scope.foodFactory = FoodFactory;
}]);
