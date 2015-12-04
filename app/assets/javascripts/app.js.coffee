angular.module('catalog', [
  'ui.router'
  'angularUtils.directives.dirPagination'
]).config([
  '$stateProvider'
  '$urlRouterProvider'
  ($stateProvider, $urlRouterProvider) ->
    $stateProvider.state('root',
      url: '/root'
      templateUrl: '/root.html'
      controller: 'MainCtrl'
      resolve: productPromise: [
        'products'
        (products) ->
          products.getAll()
      ]).state 'products',
      url: '/products/{id}'
      templateUrl: '/products.html'
      controller: 'ProductsCtrl'
      resolve: product: [
        '$stateParams'
        'products'
        ($stateParams, products) ->
          products.get $stateParams.id
      ]
    $urlRouterProvider.otherwise 'root'
    return
]).controller('MainCtrl', [
  '$scope'
  'products'
  ($scope, products) ->
    $scope.products = products.products
    return
]).controller('ProductsCtrl', [
  '$scope'
  'product'
  ($scope, product) ->
    $scope.product = product
    return
]).factory 'products', [
  '$http'
  ($http) ->
    o = products: []

    o.getAll = ->
      $http.get('/products.json').success (data) ->
        angular.copy data, o.products
        return

    o.get = (id) ->
      $http.get('/products/' + id + '.json').then (res) ->
        res.data

    o
]
