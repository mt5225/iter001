(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderCtrl
    * @description
    * # OrderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderCtrl', function($scope, $location, flash, $log, orderService, paramService, uuidService, dayarray, wechat, surveycheck, updateuserinfo) {
    if (paramService.get().house) {
      $scope.newOrder = paramService.get();
      $scope.house = $scope.newOrder.house;
      $scope.userInfo = $scope.newOrder.userInfo;
    } else {
      $scope.newOrder = {};
      $scope.house = paramService.get();
      $scope.userInfo = wechat.getUserInfo();
    }
    if (!$scope.userInfo['openid'] || !$scope.house['id']) {
      $log.debug("cannot load user info or house info, got back to houses list page");
      $location.path('/houses');
    }
    $scope.currentShow = "main";
    $scope.capacity = function() {
      var highBound, i, lowBound, results;
      lowBound = 1;
      highBound = (parseInt($scope.house.capacity)) + 1;
      return (function() {
        results = [];
        for (var i = lowBound; lowBound <= highBound ? i < highBound : i > highBound; lowBound <= highBound ? i++ : i--){ results.push(i); }
        return results;
      }).apply(this);
    };
    $scope.validateMsg = '';
    $scope.orderCheck = function(newOrder, house) {
      var promise;
      if (!newOrder.checkInDay) {
        return $scope.validateMsg = "请指定入住日期|" + uuidService.generateUUID();
      } else if (!newOrder.checkOutDay) {
        return $scope.validateMsg = "请指定退房日期|" + uuidService.generateUUID();
      } else if (!newOrder.numOfGuest) {
        return $scope.validateMsg = "请指定客人数|" + uuidService.generateUUID();
      } else if (newOrder.checkInDay > newOrder.checkOutDay) {
        return $scope.validateMsg = "入住日期不能晚于退房日期|" + uuidService.generateUUID();
      } else {
        promise = updateuserinfo.update($scope.userInfo);
        return promise.then((function(payload) {
          newOrder.house = house;
          newOrder.userInfo = $scope.userInfo;
          newOrder.dayPrices = $scope.dayPrices;
          $log.debug(newOrder);
          paramService.set(newOrder);
          return $scope.currentShow = "warnning";
        }));
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
