app.factory('FoodFactory', ['$http', function ($http) {

var inventoryFF = undefined;
var kim = {};
var queryResults = [];

//GET inventory;
var getInventoryFF = function () {
  console.log('FoodFactory is getting my inventory');
  var promise = $http.get('/foodRoutes').then(function (response) {
    console.log('FoodFactory has a response of', response);
    inventoryFF = response.data;
  });
  return promise;
}

var findRecipe = function () {

  var key = '';
  var id = '';
  var baseUrl = 'https://api.edamam.com/search?q=';

  var request = baseUrl + encodeURI(kim.query) + id + key + '&callback=JSON_CALLBACK';

  // api call;
  var promise = $http.jsonp(request).then(
    function (response) {
      console.log('query response', response);
      queryResults = response.data;

    });
    return promise;
}


//returns to the controllers
return{
  inventory: function () {
    return inventoryFF;
  },

  getInventory: function () {
    return getInventoryFF();
  },

  getQuery: function () {
    return findRecipe();
  },

  setQuery: function (query) {
    kim.query = query;
  },

  results: function () {
    return queryResults;
  }

}

}]);
