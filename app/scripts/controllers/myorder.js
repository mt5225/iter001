(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:MyorderCtrl
    * @description get user order list
    * # MyorderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('MyorderCtrl', function($scope, $log, wechat) {
    var userInfo;
    userInfo = wechat.getUserInfo();
    $log.debug("[MyorderCtrl] query order record with user " + userInfo.nickname + " openid = " + userInfo.openid);
    return wechat.queryOrder(userInfo.openid, function(data) {
      $log.debug(data);
      return $scope.orders = data;
    });
  });

}).call(this);
