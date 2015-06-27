(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderCtrl
    * @description
    * # OrderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderCtrl', function($scope, $location, flash, $log, orderService, paramService, uuidService, dayarray, wechat, surveycheck) {
    var userInfo;
    userInfo = wechat.getUserInfo();
    $scope.house = paramService.get();
    if (!userInfo['openid'] || !$scope.house['id']) {
      $log.debug(userInfo);
      $log.debug($scope.house);
      $log.debug("cannot load user info or house info, got back to houses list page");
      $location.path('/houses');
      return;
    }
    $scope.currentShow = "main";
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
    $scope.newOrder = {};
    $scope.validateMsg = '';
    $scope.orderCheck = function(newOrder, house) {
      if (!newOrder.checkInDay) {
        return $scope.validateMsg = "请指定入住日期|" + uuidService.generateUUID();
      } else if (!newOrder.checkOutDay) {
        return $scope.validateMsg = "请指定退房日期|" + uuidService.generateUUID();
      } else if (!newOrder.numOfGuest) {
        return $scope.validateMsg = "请指定客人数|" + uuidService.generateUUID();
      } else if (newOrder.checkInDay > newOrder.checkOutDay) {
        return $scope.validateMsg = "入住日期不能晚于退房日期|" + uuidService.generateUUID();
      } else {
        $log.debug(newOrder);
        newOrder.house = house;
        newOrder.dayPrices = $scope.dayPrices;
        $log.debug(newOrder);
        paramService.set(newOrder);
        return $scope.currentShow = "warnning";
      }
    };
    $scope.close = function() {
      return $location.path("/houses");
    };
    $scope.exitApp = function() {
      return $location.path("/close");
    };
    return $scope.orderReview = function() {
      return $location.path("/orderreview");
    };
  });

}).call(this);
