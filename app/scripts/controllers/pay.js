(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:PayCtrl
    * @description
    * # PayCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('PayCtrl', function($scope, $log, paramService, $location, wechat, houseservice) {
    var orderDetails;
    $log.debug("===> PayCtrl <===");
    orderDetails = paramService.get();
    $log.debug(orderDetails);
    $scope.orderDetails = orderDetails;
    $scope.openid = orderDetails.wechatOpenID;
    $scope.orderId = orderDetails.orderId;
    $scope.totalPrice = orderDetails.totalPrice;
    $scope.activatePayDirective = false;
    $scope.pay = function() {
      $log.debug("activate Pay Directive");
      return $scope.activatePayDirective = true;
    };
    $scope.close = function() {
      return $location.path("/close");
    };
    return $scope.notifyUser = function(msgStr) {
      var item, msg;
      msg = JSON.parse(msgStr);
      for (item in msg.data) {
        msg.data[item].color = "#01579b";
      }
      $log.debug(msg);
      return wechat.sendMessage(msg);
    };
  });

}).call(this);
