var app = angular.module('app', ['checklist-model', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'simple-autocomplete']);

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
    .when('/favorites', {
      templateUrl: '/public/views/partials/favorites.html',
      controller: 'FavoritesController'
    })
    .otherwise({
      redirectTo: "/home"
    });
}]);

//filter to fix two-letter ingredients for query;
app.filter('concat', function () {
  return function (input) {
    return input.replace(/ /g, '+');
  }
});

//unconcat for display purposes;
app.filter('unconcat', function () {
  return function (input) {
    return input.replace('+', ' ');
  }
});

//not sure what this is for..
app.filter('encode', function () {
  return function (input) {
    return input.replace(',', ' ');
  }
});
