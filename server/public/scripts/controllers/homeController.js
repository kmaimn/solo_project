app.controller('HomeController', ['$scope', '$http', 'FoodFactory', '$location', function ($scope, $http, FoodFactory, $location) {
  console.log('homeController is running');

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

    //resets value to empty;
    // $scope.category = '';
    // $scope.item = '';

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
        $scope.removedItem = '';
      });
      console.log('item deleted from DB');

    })
  };

  $scope.selectedData = null;
	$scope.datas = [
    {item:'acorn squash', category: 'produce'},
    {item:'alfredo sauce', category: 'other'},
    {item:'alligator', category: 'proteins'},
    {item:'almond butter', category: 'other'},
    {item:'almonds', category: 'proteins'},
    {item:'ancho chile peppers', category: 'produce'},
    {item:'anchovies', category: 'other'},
    {item:'andouille sausage', category: 'proteins'},
    {item:'apple butter', category: 'other'},
    {item:'apples', category: 'produce'},
    {item:'applesauce', category: 'other'},
    {item:'apricots', category: 'produce'},
    {item:'artichokes', category: 'produce'},
    {item:'arugula', category: 'produce'},
    {item:'asiago cheese', category: 'dairy'},
    {item:'asparagus', category: 'produce'},
    {item:'avocados', category: 'produce'},
    {item:'bacon', category: 'proteins'},
    {item:'bagels', category: 'grains'},
    {item:'baguette', category: 'grains'},
    {item:'bananas', category: 'produce'},
    {item:'barley', category: 'grains'},
    {item:'basil', category: 'produce'},
    {item:'bass', category: 'proteins'},
    {item:'bean sauce', category: 'other'},
    {item:'bean sprouts', category: 'produce'},
    {item:'beans', category: 'proteins'},
    {item:'beef', category: 'proteins'},
    {item:'beets', category: 'produce'},
    {item:'berries', category: 'produce'},
    {item:'black beans', category: 'proteins'},
    {item:'black olives', category: 'other'},
    {item:'black-eyed peas', category: 'proteins'},
    {item:'blackberries', category: 'produce'},
    {item:'blue cheese', category: 'dairy'},
    {item:'blueberries', category: 'produce'},
    {item:'bok choy', category: 'produce'},
    {item:'brazil nuts', category: 'proteins'},
    {item:'breadfruit', category: 'produce'},
    {item:'broccoli raab', category: 'produce'},
    {item:'broccoli', category: 'produce'},
    {item:'broth', category: 'proteins'},
    {item:'brown rice', category: 'grains'},
    {item:'bruschetta', category: 'other'},
    {item:'brussels sprouts', category: 'produce'},
    {item:'buckwheat', category: 'grains'},
    {item:'buttermilk', category: 'dairy'},
    {item:'cabbage', category: 'produce'},
    {item:'cactus', category: 'produce'},
    {item:'canadian bacon', category: 'proteins'},
    {item:'cannellini beans', category: 'proteins'},
    {item:'cantaloupes', category: 'produce'},
    {item:'capers', category: 'other'},
    {item:'carrots', category: 'produce'},
    {item:'cashews', category: 'proteins'},
    {item:'catfish', category: 'proteins'},
    {item:'cauliflower', category: 'produce'},
    {item:'caviar', category: 'proteins'},
    {item:'celery', category: 'produce'},
    {item:'chard', category: 'produce'},
    {item:'chaurice sausage', category: 'proteins'},
    {item:'cheddar cheese', category: 'dairy'},
    {item:'cherries', category: 'produce'},
    {item:'chestnuts', category: 'proteins'},
    {item:'chicken', category: 'proteins'},
    {item:'chickpeas', category: 'proteins'},
    {item:'chile peppers', category: 'other'},
    {item:'chili sauce', category: 'other'},
    {item:'chipotle peppers', category: 'other'},
    {item:'chives', category: 'produce'},
    {item:'chocolate', category: 'other'},
    {item:'chutney', category: 'other'},
    {item:'cilantro', category: 'produce'},
    {item:'clams', category: 'proteins'},
    {item:'coconut milk', category: 'dairy'},
    {item:'coconuts', category: 'produce'},
    {item:'cod', category: 'proteins'},
    {item:'colby cheese', category: 'dairy'},
    {item:'condensed milk', category: 'dairy'},
    {item:'cookies', category: 'other'},
    {item:'coriander', category: 'produce'},
    {item:'corn', category: 'produce'},
    {item:'corned beef', category: 'proteins'},
    {item:'cottage cheese', category: 'dairy'},
    {item:'couscous', category: 'grains'},
    {item:'crabs', category: 'proteins'},
    {item:'cranberries', category: 'produce'},
    {item:'crayfish', category: 'proteins'},
    {item:'cream cheese', category: 'dairy'},
    {item:'cream', category: 'dairy'},
    {item:'creme fraiche', category: 'dairy'},
    {item:'cremini mushrooms', category: 'produce'},
    {item:'croutons', category: 'grains'},
    {item:'cucumbers', category: 'produce'},
    {item:'custard', category: 'other'},
    {item:'dates', category: 'produce'},
    {item:'dill', category: 'produce'},
    {item:'duck', category: 'proteins'},
    {item:'dumpling', category: 'other'},
    {item:'eel', category: 'proteins'},
    {item:'eggplants', category: 'produce'},
    {item:'eggs', category: 'proteins'},
    {item:'english muffins', category: 'grains'},
    {item:'fennel', category: 'produce'},
    {item:'feta cheese', category: 'dairy'},
    {item:'figs', category: 'produce'},
    {item:'fish sauce', category: 'other'},
    {item:'flounder', category: 'proteins'},
    {item:'focaccia', category: 'grains'},
    {item:'french fries', category: 'other'},
    {item:'garlic', category: 'produce'},
    {item:'geese', category: 'proteins'},
    {item:'ginger', category: 'produce'},
    {item:'goji berry', category: 'produce'},
    {item:'gorgonzola', category: 'dairy'},
    {item:'gouda', category: 'dairy'},
    {item:'graham crackers', category: 'other'},
    {item:'granola', category: 'other'},
    {item:'grapefruits', category: 'produce'},
    {item:'grapes', category: 'produce'},
    {item:'green beans', category: 'produce'},
    {item:'green onions', category: 'produce'},
    {item:'grits', category: 'grains'},
    {item:'grouper', category: 'proteins'},
    {item:'guavas', category: 'produce'},
    {item:'habanero chilies', category: 'produce'},
    {item:'haddock', category: 'proteins'},
    {item:'halibut', category: 'proteins'},
    {item:'ham', category: 'proteins'},
    {item:'hamburger', category: 'proteins'},
    {item:'hash browns', category: 'other'},
    {item:'havarti cheese', category: 'dairy'},
    {item:'hazelnuts', category: 'proteins'},
    {item:'heavy cream', category: 'dairy'},
    {item:'herring', category: 'proteins'},
    {item:'honeydew melons', category: 'produce'},
    {item:'horseradish', category: 'produce'},
    {item:'huckleberries', category: 'produce'},
    {item:'ice cream', category: 'dairy'},
    {item:'jack cheese', category: 'dairy'},
    {item:'jicama', category: 'produce'},
    {item:'kale', category: 'produce'},
    {item:'kidney beans', category: 'proteins'},
    {item:'kiwi', category: 'produce'},
    {item:'kumquats', category: 'produce'},
    {item:'lamb', category: 'proteins'},
    {item:'leeks', category: 'produce'},
    {item:'lemongrass', category: 'produce'},
    {item:'lemons', category: 'produce'},
    {item:'lentils', category: 'grains'},
    {item:'lettuce', category: 'produce'},
    {item:'lima beans', category: 'proteins'},
    {item:'limes', category: 'produce'},
    {item:'liver', category: 'proteins'},
    {item:'lobsters', category: 'proteins'},
    {item:'macaroni', category: 'grains'},
    {item:'mackerel', category: 'proteins'},
    {item:'mandarin oranges', category: 'produce'},
    {item:'maraschino cherries', category: 'other'},
    {item:'marshmallows', category: 'other'},
    {item:'mascarpone', category: 'dairy'},
    {item:'melons', category: 'produce'},
    {item:'mesclun greens', category: 'produce'},
    {item:'milk', category: 'dairy'},
    {item:'mint', category: 'produce'},
    {item:'monkfish', category: 'proteins'},
    {item:'moo shu wrappers', category: 'other'},
    {item:'mozzarella', category: 'dairy'},
    {item:'mushrooms', category: 'produce'},
    {item:'mussels', category: 'proteins'},
    {item:'navy beans', category: 'proteins'},
    {item:'nectarines', category: 'produce'},
    {item:'oatmeal', category: 'grains'},
    {item:'octopus', category: 'proteins'},
    {item:'okra', category: 'produce'},
    {item:'olives', category: 'other'},
    {item:'onions', category: 'produce'},
    {item:'oranges', category: 'produce'},
    {item:'pancetta', category: 'proteins'},
    {item:'papayas', category: 'produce'},
    {item:'parmesan cheese', category: 'dairy'},
    {item:'parsley', category: 'produce'},
    {item:'parsnips', category: 'produce'},
    {item:'passion fruit', category: 'produce'},
    {item:'pasta', category: 'grains'},
    {item:'pea beans', category: 'proteins'},
    {item:'peaches', category: 'produce'},
    {item:'peanut butter', category: 'other'},
    {item:'peanuts', category: 'proteins'},
    {item:'pears', category: 'produce'},
    {item:'peas', category: 'produce'},
    {item:'pecans', category: 'proteins'},
    {item:'pesto', category: 'other'},
    {item:'pheasants', category: 'proteins'},
    {item:'pickles', category: 'other'},
    {item:'pico de gallo', category: 'other'},
    {item:'pine nuts', category: 'proteins'},
    {item:'pineapples', category: 'produce'},
    {item:'pink beans', category: 'proteins'},
    {item:'pinto beans', category: 'proteins'},
    {item:'pistachios', category: 'proteins'},
    {item:'plantains', category: 'produce'},
    {item:'plum tomatoes', category: 'produce'},
    {item:'plums', category: 'produce'},
    {item:'pomegranates', category: 'produce'},
    {item:'pork', category: 'proteins'},
    {item:'portabella mushrooms', category: 'produce'},
    {item:'potato chips', category: 'other'},
    {item:'potatoes', category: 'produce'},
    {item:'prawns', category: 'proteins'},
    {item:'prosciutto', category: 'proteins'},
    {item:'provolone', category: 'dairy'},
    {item:'prunes', category: 'produce'},
    {item:'pumpkin seeds', category: 'proteins'},
    {item:'pumpkins', category: 'produce'},
    {item:'quail', category: 'proteins'},
    {item:'rabbits', category: 'proteins'},
    {item:'radishes', category: 'produce'},
    {item:'raisins', category: 'produce'},
    {item:'raspberries', category: 'produce'},
    {item:'red beans', category: 'proteins'},
    {item:'red cabbage', category: 'produce'},
    {item:'red snapper', category: 'proteins'},
    {item:'remoulade', category: 'dairy'},
    {item:'rhubarb', category: 'produce'},
    {item:'rice paper', category: 'grains'},
    {item:'rice', category: 'grains'},
    {item:'ricotta cheese', category: 'dairy'},
    {item:'romaine lettuce', category: 'produce'},
    {item:'romano cheese', category: 'dairy'},
    {item:'rosemary', category: 'produce'},
    {item:'sage', category: 'produce'},
    {item:'salmon', category: 'proteins'},
    {item:'salsa', category: 'other'},
    {item:'sardines', category: 'proteins'},
    {item:'sauerkraut', category: 'other'},
    {item:'sausages', category: 'proteins'},
    {item:'scallops', category: 'proteins'},
    {item:'sea cucumbers', category: 'proteins'},
    {item:'shallots', category: 'produce'},
    {item:'shitakes', category: 'produce'},
    {item:'shrimp', category: 'proteins'},
    {item:'snap peas', category: 'produce'},
    {item:'snapper', category: 'proteins'},
    {item:'snow peas', category: 'produce'},
    {item:'sour cream', category: 'dairy'},
    {item:'soybeans', category: 'produce'},
    {item:'soymilk', category: 'dairy'},
    {item:'spaghetti squash', category: 'produce'},
    {item:'spearmint', category: 'produce'},
    {item:'spinach', category: 'produce'},
    {item:'split peas', category: 'produce'},
    {item:'squash', category: 'produce'},
    {item:'squid', category: 'proteins'},
    {item:'steak', category: 'proteins'},
    {item:'strawberries', category: 'produce'},
    {item:'succotash', category: 'other'},
    {item:'summer squash', category: 'produce'},
    {item:'sunflower seeds', category: 'proteins'},
    {item:'sushi', category: 'other'},
    {item:'sweet peppers', category: 'produce'},
    {item:'sweet potatoes', category: 'produce'},
    {item:'swiss cheese', category: 'dairy'},
    {item:'swordfish', category: 'proteins'},
    {item:'tofu', category: 'proteins'},
    {item:'tomatoes', category: 'produce'},
    {item:'tortillas', category: 'grains'},
    {item:'trout', category: 'proteins'},
    {item:'truffles', category: 'produce'},
    {item:'tuna', category: 'proteins'},
    {item:'turkeys', category: 'proteins'},
    {item:'turnips', category: 'produce'},
    {item:'unsweetened chocolate', category: 'other'},
    {item:'veal', category: 'proteins'},
    {item:'venison', category: 'proteins'},
    {item:'walnuts', category: 'proteins'},
    {item:'water chestnuts', category: 'other'},
    {item:'watermelons', category: 'produce'},
    {item:'white beans', category: 'proteins'},
    {item:'white chocolate', category: 'other'},
    {item:'wild rice', category: 'grains'},
    {item:'wonton skins', category: 'other'},
    {item:'yogurt', category: 'dairy'},
	];

	$scope.onSelect = function(selection) {
		console.log(selection);
		$scope.selectedData = selection;
	};

	$scope.clearInput = function() {
		$scope.$broadcast('simple-autocomplete:clearInput');
	};

}]);
