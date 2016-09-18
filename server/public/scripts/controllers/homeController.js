app.controller('HomeController', ['$scope', '$http', 'FoodFactory', 'ArrayFactory', '$location', function ($scope, $http, FoodFactory, ArrayFactory, $location) {
  console.log('homeController is running');

  $scope.arrayFactory = ArrayFactory;
  $scope.foodFactory = FoodFactory;
  $scope.selectedIngredients = [];

  $scope.removedItem = '';
  //options for select;
  $scope.categories = ['', 'dairy', 'grains', 'produce', 'proteins', 'other'];

  //gets the inventory from the DB;
  if ($scope.foodFactory.inventory() === undefined) {
    console.log('Get inventory from the DB');
    $scope.foodFactory.getInventory().then(function (response) {
      $scope.pantry = $scope.foodFactory.inventory();
    });
  } else {
    $scope.pantry = $scope.foodFactory.inventory();
  }

  //API request that will set the query based on ingredents selected; will redirect to result page;
  $scope.getIngredients = function () {

    //animation to make the user feel better;
    $scope.foodFactory.move();
    var query = $scope.selectedIngredients.join();
    $scope.foodFactory.setQuery(query);
    $scope.foodFactory.getQuery().then(function(){
      $location.path('/results');
    });
  };

  //removes last thing in the ingredients array;
  $scope.removeLast = function () {
    $scope.selectedIngredients.pop();
  };

  //post new ingredients to DB
  $scope.addIngredients = function () {

    var newItem = {
      category: $scope.selectedData.category,
      item: $scope.selectedData.item
    };

    $http({
      method: 'POST',
      url: 'foodRoutes/result',
      data: newItem
    }).then(function (response){
      $scope.foodFactory.getInventory().then(function (response) {
        $scope.pantry = $scope.foodFactory.inventory();
      });
      console.log('new food item sent to DB');
    })
    $scope.$broadcast('simple-autocomplete:clearInput')
  };

  //remove used ingredient from the DB;
  $scope.removeIngredients = function() {

    var deletedItem = {
      category: $scope.selectedData.category,
      item: $scope.selectedData.item
    };
    console.log(deletedItem);
    $http({
      method: 'DELETE',
      url: 'foodRoutes/' + deletedItem.item,
      data: {name: deletedItem.item}
    }).then(function (response){
      console.log(response.data)
      //updates inventory;
      $scope.foodFactory.getInventory().then(function (response) {
        $scope.pantry = $scope.foodFactory.inventory();
      });
      console.log('item deleted from DB');
    })
    $scope.$broadcast('simple-autocomplete:clearInput')
  };

  $scope.selectedData = null;
	$scope.datas = $scope.arrayFactory.data();
  console.log($scope.datas);

	$scope.onSelect = function(selection) {
		console.log(selection);
		$scope.selectedData = selection;
	};

}]);
