(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderreviewCtrl
    * @description
    * # OrderreviewCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderreviewCtrl', function($scope, $log, $location, paramService, dayarray, orderService) {
    var bookingArray, bookingDayPriceArray, dayprice, i, item, len, orderDetails, totalPrice;
    $log.debug("===> OrderreviewCtrl <===");
    $scope.currentShow = "orderReview";
    if (!paramService.get().house) {
      $location.path("/houses");
    }
    orderDetails = paramService.get();
    $scope.house = orderDetails.house;
    bookingDayPriceArray = [];
    bookingArray = dayarray.getDayArray(orderDetails.checkInDay, orderDetails.checkOutDay);
    $log.debug(orderDetails.dayPrices);
    $log.debug(bookingArray);
    totalPrice = 0;
    for (i = 0, len = bookingArray.length; i < len; i++) {
      item = bookingArray[i];
      dayprice = {};
      dayprice.day = item;
      if (orderDetails.dayPrices[item]) {
        dayprice.price = orderDetails.dayPrices[item];
        totalPrice = totalPrice + parseInt(dayprice.price);
      } else {
        dayprice.price = 'N/A';
      }
      bookingDayPriceArray.push(dayprice);
    }
    $log.debug(bookingDayPriceArray);
    $scope.bookingDayPriceArray = bookingDayPriceArray;
    $scope.totalPrice = totalPrice;
    $scope.submitOrder = function() {
      var promise;
      $scope.currentShow = "payResult";
      orderDetails.houseId = $scope.house['id'];
      orderDetails.houseName = $scope.house['name'];
      promise = orderService.saveOrder(orderDetails);
      promise.then((function(payload) {
        $log.debug(payload);
        return $scope.payMessage = "支付成功，订单号为" + payload.data['orderId'] + " 您可以通过[客服]->[订单查询] 查看订单状态。 亲，" + $scope.house.name + "见！";
      }), function(errorPayload) {
        $log.error('failure to save submit Order', errorPayload);
        return $scope.payMessage = "订单提交失败!";
      });
      return $scope.$evalAsync();
    };
    return $scope.close = function() {
      return $location.path("/close");
    };
  });

}).call(this);
