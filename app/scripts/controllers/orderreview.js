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
    var bookingArray, bookingDayPriceArray, dayprice, i, item, len, orderDetails, re, totalPrice;
    $log.debug("===> OrderreviewCtrl <===");
    $scope.currentShow = "orderReview";
    if (!paramService.get().house) {
      $location.path("/houses");
    }
    orderDetails = paramService.get();
    $log.debug(orderDetails);
    re = /\//g;
    $scope.checkInDay = orderDetails.checkInDay.replace(re, '-');
    $scope.checkOutDay = orderDetails.checkOutDay.replace(re, '-');
    $scope.house = orderDetails.house;
    bookingDayPriceArray = [];
    bookingArray = dayarray.getDayArray(orderDetails.checkInDay, orderDetails.checkOutDay);
    bookingArray.pop();
    $log.debug(bookingArray);
    totalPrice = 0;
    for (i = 0, len = bookingArray.length; i < len; i++) {
      item = bookingArray[i];
      dayprice = {};
      dayprice.day = item;
      if (orderDetails.dayPrices[item]) {
        dayprice.price = orderDetails.dayPrices[item];
        totalPrice = totalPrice + parseInt(dayprice.price);
        bookingDayPriceArray.push(dayprice);
      }
    }
    $log.debug(bookingDayPriceArray);
    $scope.bookingDayPriceArray = bookingDayPriceArray;
    $scope.totalPrice = totalPrice;
    $scope.submitOrder = function() {
      var promise;
      $scope.currentShow = "payResult";
      orderDetails.houseId = orderDetails.house['id'];
      orderDetails.houseName = orderDetails.house['name'];
      orderDetails.totalPrice = totalPrice;
      orderDetails.priceByDayArray = JSON.stringify(bookingDayPriceArray);
      promise = orderService.checkAvailable(orderDetails);
      return promise.then(function(payload) {
        $log.debug(payload.data);
        if (payload.data.available === 'false') {
          $scope.payMessage = "很抱歉，" + orderDetails.houseName + "已经被人捷足先登了！";
          return $scope.$evalAsync();
        } else {
          promise = orderService.saveOrder(orderDetails);
          return promise.then((function(payload) {
            $log.debug(payload);
            $scope.payMessage = "支付成功，订单号为" + payload.data['orderId'] + " 您可以通过[客服]->[订单查询] 查看订单状态。 亲，" + $scope.house.name + "见！";
            return $scope.$evalAsync();
          }), function(errorPayload) {
            $log.error('failure to save submit Order', errorPayload);
            return $scope.payMessage = "订单提交失败!";
          });
        }
      });
    };
    return $scope.close = function() {
      return $location.path("/close");
    };
  });

}).call(this);
