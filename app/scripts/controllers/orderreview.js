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
    $log.debug("<-- day price list [ALL] in orderDetails -->");
    $log.debug(orderDetails.dayPrices);
    for (i = 0, len = bookingArray.length; i < len; i++) {
      item = bookingArray[i];
      dayprice = {};
      dayprice.day = item;
      if (orderDetails.dayPrices[item] != null) {
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
      $scope.currentShow = "submitResult";
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
            $scope.submitResult = "success";
            $log.debug(payload);
            $scope.payMessage = "恭喜您，［" + $scope.house.name + "］预订成功，订单号为" + payload.data['orderId'] + " 。请点击右下方支付按钮，在30分钟内完成支付，否则您的预订可能被取消哦。 另外您还可以通过漫生活服务号[客服]->[订单查询] 查看订单状态。亲，我们[" + $scope.house.name + "]见！";
            return $scope.$evalAsync();
          }), function(errorPayload) {
            $log.error('failure to save submit Order', errorPayload);
            return $scope.payMessage = "订单提交失败!";
          });
        }
      });
    };
    $scope.close = function() {
      return $location.path("/close");
    };
    $scope.back = function() {
      return $location.path("/order");
    };
    return $scope.gotoPay = function() {
      paramService.set(orderDetails);
      return $location.path("/pay");
    };
  });

}).call(this);
