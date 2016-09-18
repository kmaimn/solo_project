app.controller('FavoritesController', ['$scope', '$http', 'FavoriteFactory', '$uibModal', function ($scope, $http, FavoriteFactory, $uibModal) {
  console.log('favoritesController is running');

  $scope.favoriteFactory = FavoriteFactory;
  $scope.value = true;

  //gets the favorites from the DB;
  if ($scope.favoriteFactory.favorites() === undefined) {
    console.log('Get favorites from the DB');
    $scope.favoriteFactory.getFavorites().then(function (response) {
      $scope.favorites = $scope.favoriteFactory.favorites();

      //Message if there are no favorites;
      if($scope.favorites.length === 0) {
        $scope.value = false;
      }

      console.log('Favorites from the DB:', $scope.favorites);
    });
  } else {
    $scope.favoriteFactory.getFavorites().then(function (response) {
      $scope.favorites = $scope.favoriteFactory.favorites();
    });
  }

  //remove favorite from the DB;
  $scope.removeFavorite = function(image, label, url, source, ingredients) {

    var deletedItem = {
      image: image,
      label: label,
      url: url,
      source: source,
      ingredients: ingredients
    };
    console.log(deletedItem);
    $http({
      method: 'DELETE',
      url: 'foodRoutes/favorite/' + deletedItem.label,
      data: {name: deletedItem.label}
    }).then(function (response){
      console.log(response.data)
      //updates favorites;
      $scope.favoriteFactory.getFavorites().then(function (response) {
        $scope.favorites = $scope.favoriteFactory.favorites();
      });
      console.log('favorite deleted from DB');

    })
  };

  //animation for the modal transition;
  $scope.animationsEnabled = true;

  //modal stuff;
  $scope.open = function (favorite) {
    console.log('on modal open, favorite is:', favorite);
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/public/views/partials/favoriteRecipes.html',
      controller: 'FavoriteRecipeController',
      resolve: {
        result: function () {
          console.log('ID sent to DF:', favorite.id)
          $scope.favoriteFactory.setFavorite(favorite.id);
          $scope.favoriteFactory.getDetail();
        }
      }
    });
  };

}]);
