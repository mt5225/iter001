(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderCtrl
    * @description
    * # OrderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderCtrl', function($scope, $location, flash, $log, orderService, uuidService, paramService) {
    $scope.flash = flash;
    $scope.house = paramService.get();
    $scope.newOrder = {};
    return $scope.orderReview = function(newOrder, house) {
      $log.debug(newOrder);
      newOrder.orderId = uuidService.generateUUID();
      flash.setMessage("加载预定信息成功 ！");
      newOrder.house = house;
      newOrder.dayPrices = $scope.dayPrices;
      console.log(newOrder);
      paramService.set(newOrder);
      return $location.path('/orderreview');
    };
  });

}).call(this);
