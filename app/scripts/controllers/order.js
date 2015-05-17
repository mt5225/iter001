(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderCtrl
    * @description
    * # OrderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderCtrl', function($scope, $location, flash, $log, myorderService, houseService, uuidService, paramService) {
    $scope.flash = flash;
    $scope.house = paramService.get();
    $scope.newOrder = {};
    $scope.orderConfirm = function(newOrder, houseId) {
      $log.debug(newOrder);
      newOrder.id = uuidService.generateUUID();
      newOrder.houseId = houseId;
      myorderService.saveOrder(newOrder);
      flash.setMessage("订单提交成功！");
      return $location.path('/houses');
    };
  });

}).call(this);
