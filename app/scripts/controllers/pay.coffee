'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:PayCtrl
 # @description
 # # PayCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'PayCtrl', ($scope, $log, paramService, $location) ->
    $log.debug "===> PayCtrl <==="
    orderDetails = paramService.get()
    $log.debug orderDetails
    #$scope.totalPrice = orderDetails.totalPrice
    $scope.openid = orderDetails.wechatOpenID
    $scope.orderId = orderDetails.orderId
    $scope.totalPrice = orderDetails.totalPrice
    #$scope.totalPrice = 1     
    # $scope.openid = "osIpsuPO6L9VIJAH0SIRjzz97Ww0"
    # $scope.orderId = "eiew-2eu3"
    
    $scope.activatePayDirective = false

    $scope.pay = () ->
      $scope.activatePayDirective = true

    $scope.close = () ->
      $location.path "/close"