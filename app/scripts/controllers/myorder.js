(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:MyorderCtrl
    * @description get user order list
    * # MyorderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('MyorderCtrl', function($scope, $log, wechat, orderService, $location, $routeParams) {
    var promise;
    if ($routeParams.openid) {
      promise = wechat.loadUserInfo($routeParams.openid);
      return promise.then(function(payload) {
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
  });

}).call(this);
