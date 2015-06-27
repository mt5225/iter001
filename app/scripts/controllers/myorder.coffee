'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:MyorderCtrl
 # @description get user order list
 # # MyorderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'MyorderCtrl', ($scope, $log, wechat, orderService, $location, $routeParams, $window) ->

    $scope.$watch 'userInfo', ->
      if $scope.userInfo #wechat directive got the userInfo     
        openid = $scope.userInfo.openid
        $log.debug openid  
        promise = orderService.queryOrder openid
        promise.then((payload) ->
          $scope.orders = payload.data
        )
           
    $scope.close = () ->
      $location.path "/close"

    $scope.refresh = () ->
      $window.location.reload();

    $scope.showOrderDetail = (order) ->
      $log.debug order
      $scope.showdetail = 'true'
      $scope.orderdetail = order
