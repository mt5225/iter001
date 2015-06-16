(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderreviewCtrl
    * @description
    * # OrderreviewCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderreviewCtrl', function($scope, $log, $location, flash, paramService, dayarray) {
    var bookingArray, bookingDayPriceArray, dayprice, i, item, len, orderDetails, totalPrice;
    $log.debug("===> OrderreviewCtrl <===");
    $scope.flash = flash;
    orderDetails = paramService.get();
    $scope.house = orderDetails.house;
    bookingDayPriceArray = [];
    bookingArray = dayarray.getDayArray(orderDetails.checkInDay, orderDetails.checkOutDay);
    $log.debug(orderDetails.dayPrices);
    $log.debug(bookingArray);
    totalPrice = 0;
    for (i = 0, len = bookingArray.length; i < len; i++) {
      item = bookingArray[i];
      if (orderDetails.dayPrices[item]) {
        dayprice = {};
        dayprice.day = item;
        dayprice.price = orderDetails.dayPrices[item];
        totalPrice = totalPrice + parseInt(dayprice.price);
        bookingDayPriceArray.push(dayprice);
      }
    }
    $log.debug(bookingDayPriceArray);
    $log.debug("total = " + totalPrice);
    $scope.bookingDayPriceArray = bookingDayPriceArray;
    return $scope.totalPrice = totalPrice;
  });

}).call(this);
