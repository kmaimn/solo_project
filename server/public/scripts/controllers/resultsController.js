app.controller('ResultsController', ['$scope', '$http', 'FoodFactory', '$uibModal', function ($scope, $http, FoodFactory, $uibModal) {
  console.log('resultsController is running');

    $scope.foodFactory = FoodFactory;
    $scope.ingredients = $scope.foodFactory.results();
    $scope.value = true;

    //error message if query returns no results;
    if($scope.ingredients.hits.length === 0) {
      $scope.value = false;
    };

    //add favorite to favs page and DB;
    $scope.addFavorite = function(image, label, url, source, ingredients){
      var favorite = {
        image: image,
        label: label,
        url: url,
        source: source,
        ingredients: ingredients
      };

      $http({
        method: 'POST',
        url: 'foodRoutes/favorite',
        data: favorite
      }).then(function (response){
        console.log('New favorite to send to DB', favorite);
      })
    }

    //animation for the modal transition;
    $scope.animationsEnabled = true;

    //modal stuff;
    $scope.open = function (_result) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/public/views/partials/recipe.html',
        controller: 'RecipeController',
        resolve: {
          result: function () {
            console.log('Favorite sent to DB from Results:', _result);
            return _result;
          }
        }
      });
    };

}]);
