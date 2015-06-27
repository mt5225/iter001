(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:MyorderCtrl
    * @description get user order list
    * # MyorderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('MyorderCtrl', function($scope, $log, wechat, orderService, $location, $routeParams, $window) {
    $scope.$watch('userInfo', function() {
      var openid, promise;
      if ($scope.userInfo) {
        openid = $scope.userInfo.openid;
        $log.debug(openid);
        promise = orderService.queryOrder(openid);
        return promise.then(function(payload) {
          return $scope.orders = payload.data;
        });
      }
    });
    $scope.close = function() {
      return $location.path("/close");
    };
    $scope.refresh = function() {
      return $window.location.reload();
    };
    return $scope.showOrderDetail = function(order) {
      $log.debug(order);
      $scope.showdetail = 'true';
      return $scope.orderdetail = order;
    };
  });

}).call(this);
