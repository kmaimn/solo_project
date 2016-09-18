app.factory('FoodFactory', ['$http', function($http) {

    var inventoryFF = undefined;
    var kim = {};
    var queryResults = [];

    //GET inventory to homepage;
    var getInventoryFF = function() {
        console.log('FoodFactory is getting my inventory');
        var promise = $http.get('/foodRoutes/').then(function(response) {
            console.log('FoodFactory has a response of', response);
            inventoryFF = response.data;
        });
        return promise;
    }
    //GET recipies from API to results page;
    var findRecipe = function() {

        var key = '&app_key=7e25e5b3daa1a52fcdfb6074da5303fe';
        var id = '&app_id=f2babc1d';
        var baseUrl = 'https://api.edamam.com/search?q=';
        var showMany = '&to=60';

        var request = baseUrl + encodeURI(kim.query) + showMany + id + key + '&callback=JSON_CALLBACK';

        var promise = $http.jsonp(request).then(
            function(response) {
                console.log(request);
                console.log('query response', response);
                queryResults = response.data;

            });
        return promise;
    }

    //fake progres bar;
    var animation = function () {
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 20);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }

    //returns to the controllers
    return {

        inventory: function() {
            return inventoryFF;
        },

        getInventory: function() {
            return getInventoryFF();
        },

        getQuery: function() {
            return findRecipe();
        },

        setQuery: function(query) {
            kim.query = query;
        },

        results: function() {
            return queryResults;
        },

        //pretend status bar;
        move: function() {
            return animation();
        }

    }

}]);
