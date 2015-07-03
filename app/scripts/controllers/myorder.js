(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:MyorderCtrl
    * @description get user order list
    * # MyorderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('MyorderCtrl', function($scope, $log, wechat, orderService, $location, $route, $anchorScroll, paramService) {
    var dataloaded;
    dataloaded = false;
    $scope.$watch('userInfo', function() {
      var openid, promise;
      if ($scope.userInfo && !dataloaded) {
        openid = $scope.userInfo.openid;
        $log.debug("found openid: " + openid);
        promise = orderService.queryOrder(openid);
        return promise.then(function(payload) {
          $scope.orders = payload.data;
          dataloaded = true;
          return $log.debug("order data loaded");
        });
      }
    });
    $scope.close = function() {
      return $location.path("/close");
    };
    $scope.refresh = function() {
      return $route.reload();
    };
    $scope.showOrderDetail = function(order) {
      var old;
      $log.debug("scroll to order details");
      old = $location.hash();
      $location.hash("buttom");
      $anchorScroll.yOffset = 100;
      $anchorScroll();
      $location.hash(old);
      $scope.orderdetail = order;
      return $scope.showdetail = true;
    };
    $scope.allowPay = function(orderdetail) {
      var ref;
      if (!orderdetail) {
        return false;
      } else if ((ref = orderdetail.status) === '支付失败' || ref === '支付已取消' || ref === '已提交') {
        return true;
      } else {
        return false;
      }
    };
    return $scope.gotoPay = function(orderdetail) {
      $log.debug(orderdetail);
      paramService.set(orderdetail);
      return $location.path("/pay");
    };
  });

}).call(this);
