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
    if (paramService.get()['id']) {
      $scope.house = paramService.get();
      $scope.capacity = function() {
        var highBound, i, lowBound, results;
        lowBound = 1;
        highBound = $scope.house.capacity;
        return (function() {
          results = [];
          for (var i = lowBound; lowBound <= highBound ? i < highBound : i > highBound; lowBound <= highBound ? i++ : i--){ results.push(i); }
          return results;
        }).apply(this);
      };
    } else {
      $log.debug("house id is not set, return to house list");
      $location.path('/houses');
      return;
    }
    $scope.newOrder = {};
    return $scope.orderReview = function(newOrder, house) {
      $log.debug(newOrder);
      newOrder.orderId = uuidService.generateUUID();
      flash.setMessage("加载营地预定信息成功 ！");
      newOrder.house = house;
      newOrder.dayPrices = $scope.dayPrices;
      console.log(newOrder);
      paramService.set(newOrder);
      return $location.path('/orderreview');
    };
  });

}).call(this);
