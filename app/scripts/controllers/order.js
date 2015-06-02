(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderCtrl
    * @description
    * # OrderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderCtrl', function($scope, $location, flash, $log, houseService, orderService, uuidService, paramService, wechat) {
    $scope.flash = flash;
    $scope.house = paramService.get();
    $scope.newOrder = {};
    $scope.orderConfirm = function(newOrder, houseId) {
      $log.debug(newOrder);
      newOrder.orderId = uuidService.generateUUID();
      newOrder.houseId = houseId;
      orderService.saveOrder(newOrder);
      flash.setMessage("订单提交成功！");
      return $location.path('/houses');
    };
  });

}).call(this);
