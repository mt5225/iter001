'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:MyorderCtrl
 # @description get user order list
 # # MyorderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'MyorderCtrl', ($scope, $log, wechat) ->
    userInfo = wechat.getUserInfo()
    $log.debug "[MyorderCtrl] query order record with user #{userInfo.nickname} openid = #{userInfo.openid}"
    wechat.queryOrder userInfo.openid, (data) ->
      $log.debug data
      $scope.orders = data
