(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:PayCtrl
    * @description
    * # PayCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('PayCtrl', function($scope, $log, paramService, $location) {
    var orderDetails;
    $log.debug("===> PayCtrl <===");
    orderDetails = paramService.get();
    $log.debug(orderDetails);
    $scope.openid = orderDetails.wechatOpenID;
    $scope.orderId = orderDetails.orderId;

    /*
    test only, 1 = 一元
     */
    $scope.totalPrice = 1;
    $scope.activatePayDirective = false;
    $scope.pay = function() {
      return $scope.activatePayDirective = true;
    };
    return $scope.close = function() {
      return $location.path("/close");
    };
  });

}).call(this);
