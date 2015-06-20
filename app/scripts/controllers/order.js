(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderCtrl
    * @description
    * # OrderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderCtrl', function($scope, $location, flash, $log, orderService, paramService, uuidService, dayarray) {
    var checkIfDayNotContinious;
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
    $scope.validateMsg = '';
    checkIfDayNotContinious = function(newOrder) {
      var bookingArray, i, item, len;
      bookingArray = dayarray.getDayArray(newOrder.checkInDay, newOrder.checkOutDay);
      for (i = 0, len = bookingArray.length; i < len; i++) {
        item = bookingArray[i];
        if (!$scope.dayPrices[item]) {
          return true;
        }
      }
      return false;
    };
    return $scope.orderReview = function(newOrder, house) {
      if (!newOrder.checkInDay) {
        return $scope.validateMsg = "请指定入住日期|" + uuidService.generateUUID();
      } else if (!newOrder.checkOutDay) {
        return $scope.validateMsg = "请指定退房日期|" + uuidService.generateUUID();
      } else if (!newOrder.numOfGuest) {
        return $scope.validateMsg = "请指定客人数|" + uuidService.generateUUID();
      } else if (newOrder.checkInDay > newOrder.checkOutDay) {
        return $scope.validateMsg = "入住日期不能晚于退房日期|" + uuidService.generateUUID();
      } else if (checkIfDayNotContinious(newOrder)) {
        return $scope.validateMsg = "预定日期不连续，请重新选择|" + uuidService.generateUUID();
      } else {
        $log.debug(newOrder);
        newOrder.house = house;
        newOrder.dayPrices = $scope.dayPrices;
        $log.debug(newOrder);
        paramService.set(newOrder);
        return $location.path('/orderreview');
      }
    };
  });

}).call(this);
