app.controller('HomeController', ['$scope', '$http', 'FoodFactory', '$location', function ($scope, $http, FoodFactory, $location) {
  console.log('homeController is running');

  $scope.foodFactory = FoodFactory;
  $scope.selectedIngredients = [];
  $scope.results = [];

  $scope.categories = ['', 'Dairy', 'Grains', 'Produce', 'Proteins', 'Other'];

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

  $scope.addIngredients = function () {

    var newItem = {
      category: $scope.category,
      item: $scope.item
    };
    //
    // $scope.category = '';
    // $scope.item = '';

    $http({
      method: 'POST',
      url: 'foodRoutes',
      data: newItem
    }).then(function (response){
      $scope.pantry = $scope.foodFactory.inventory()
      console.log('new food item sent to DB');
    })
  }


}]);
