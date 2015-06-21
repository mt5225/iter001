(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:MyorderCtrl
    * @description get user order list
    * # MyorderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('MyorderCtrl', function($scope, $log, wechat, orderService, $location, $routeParams, $window) {
    var promise;
    if ($routeParams.openid || wechat.getUserInfo().openid) {
      promise = wechat.loadUserInfo($routeParams.openid);
      promise.then(function(payload) {
        var userInfo;
        userInfo = wechat.getUserInfo();
        promise = orderService.queryOrder(userInfo.openid);
        return promise.then(function(payload) {
          $log.debug(payload.data);
          $scope.orders = payload.data;
          return $scope.$evalAsync();
        });
      });
    }
    $scope.close = function() {
      return $location.path("/close");
    };
    return $scope.refresh = function() {
      return $window.location.reload();
    };
  });

}).call(this);
