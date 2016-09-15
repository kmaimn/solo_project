app.factory('FavoriteFactory', ['$http', function($http) {

    var favoriteRecipes = undefined;
    var favoriteID = '';
    var detail = {};

  //GET favorites from DB;
    var favorites = function (){
      var promise = $http.get('foodRoutes/favorite').then(function (response) {
        favoriteRecipes = response.data;
        console.log('Favorites from DB:', favoriteRecipes);
      });

      return promise;
    };

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
        
        setFavorite: function(something) {
            favoriteID = something;
            return something;
        },

        getDetail: function(){
            return favoriteID;
        },

        getFavorites: function() {
            return favorites();
        },

        favorites: function(){
            return favoriteRecipes;
        }

    }

}]);
