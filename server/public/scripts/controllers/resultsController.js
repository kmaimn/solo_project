app.controller('ResultsController', ['$scope', '$http', 'FoodFactory', '$uibModal', function ($scope, $http, FoodFactory, $uibModal) {
  console.log('resultsController is running');

    $scope.foodFactory = FoodFactory;
    $scope.ingredients = $scope.foodFactory.results();

    // console.log($scope.ingredients.hits.length);

    if($scope.ingredients.hits.length === 0) {
      $scope.message = 'Your choices were too weird... Try again.';
    };

    //modal;
    $scope.animationsEnabled = true;

    $scope.open = function (_result) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/public/views/partials/recipe.html',
        controller: 'PopUpController',
        resolve: {
          result: function () {
            console.log(_result);
            return _result;
          }
        }
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);
