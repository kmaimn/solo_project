var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  //routes will go here: home, search results, add, favorites

  $routeProvider
    .when('/home', {
      templateUrl: '/public/views/partials/home.html',
      controller: 'HomeController'
    })
    .when('/results', {
      templateUrl: '/public/views/partials/results.html',
      controller: 'ResultsController'
    })
    .when('/pantry', {
      templateUrl: '/public/views/partials/pantry.html',
      controller: 'PantryController'
    })
    .when('/favorites', {
      templateUrl: '/public/views/partials/favorites.html',
      controller: 'FavoritesController'
    })
    .otherwise({
      redirectTo: "/home"
    });
}]);
