angular.module('catalog', ['ui.router'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('root', {
      url: '/root',
      templateUrl: '/root.html',
      controller: 'MainCtrl',
      resolve: {
        productPromise: ['products', function(products){
          return products.getAll();
        }]
      }
    })
    .state('products', {
      url: '/products/{id}',
      templateUrl: '/products.html',
      controller: 'ProductsCtrl',
      resolve: {
        product: ['$stateParams', 'products', function($stateParams, products) {
          return products.get($stateParams.id);
        }]
      }
    });

  $urlRouterProvider.otherwise('root');
}])
.controller('MainCtrl', [
'$scope', 'products',
function($scope, products){
  $scope.products = products.products;
  $scope.addProduct = function(){
    if(!$scope.name || $scope.name === '' ||
       !$scope.description || $scope.description === '' ||
       !$scope.price || $scope.price === '') { return; }

    products.create({
      name: $scope.name,
      description: $scope.description,
      price: $scope.price
    });
    $scope.name = '';
    $scope.description = '';
    $scope.price = '';
  };
}])
.controller('ProductsCtrl', [
'$scope',
'product',
function($scope, product){
  $scope.product = product;
}])
.factory('products', ['$http', function($http){
  var o = {
    products: []
  };
  o.getAll = function() {
    return $http.get('/products.json').success(function(data){
      angular.copy(data, o.products);
    });
  };
  o.get = function(id) {
    return $http.get('/products/' + id + '.json').then(function(res){
      return res.data;
    });
  };
  o.create = function(product) {
    return $http.product('/products.json', product).success(function(data){
      o.products.push(data);
    });
  };
  return o;
}]);
