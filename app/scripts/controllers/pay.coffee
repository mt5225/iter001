'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:PayCtrl
 # @description
 # # PayCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'PayCtrl', ($scope, $log, paramService, $location, wechat, houseservice) ->
    $log.debug "===> PayCtrl <==="
    orderDetails = paramService.get()
    $log.debug orderDetails
    $scope.orderDetails = orderDetails
    $scope.openid = orderDetails.wechatOpenID
    $scope.orderId = orderDetails.orderId
    $scope.totalPrice = orderDetails.totalPrice
    $scope.activatePayDirective = false

    $scope.pay = () ->
      $log.debug "activate Pay Directive"
      $scope.activatePayDirective = true

    $scope.close = () ->
      $location.path "/close"

    $scope.notifyUser = (msgStr) ->     
      msg = JSON.parse msgStr
      for item of msg.data
        msg.data[item].color = "#01579b"
      $log.debug msg
      wechat.sendMessage msg