angular.module('catalog',
  ['ui.router', 'angularUtils.directives.dirPagination'])
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
  return o;
}]);
