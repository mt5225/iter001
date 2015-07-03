'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:MyorderCtrl
 # @description get user order list
 # # MyorderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'MyorderCtrl', ($scope, $log, wechat, orderService, $location, $route, $anchorScroll, paramService) ->

    dataloaded = false
    
    $scope.$watch 'userInfo', ->
      if $scope.userInfo && !dataloaded #wechat directive got the userInfo     
        openid = $scope.userInfo.openid
        $log.debug "found openid: #{openid}"  
        promise = orderService.queryOrder openid
        promise.then((payload) ->
          $scope.orders = payload.data
          dataloaded = true
          $log.debug "order data loaded"
        )
           
    $scope.close = () ->
      $location.path "/close"

    $scope.refresh = () ->
      $route.reload()

    $scope.showOrderDetail = (order) ->
      #scroll to buttom
      $log.debug "scroll to order details"
      old = $location.hash()
      $location.hash("buttom")
      $anchorScroll.yOffset = 100
      $anchorScroll()
      $location.hash(old)
      #show order details
      $scope.orderdetail = order
      $scope.showdetail = true


    $scope.allowPay = (orderdetail) ->
      if !orderdetail
        return false
      else if orderdetail.status in ['支付失败', '支付已取消', '已提交']
        return true
      else
        return false

    $scope.gotoPay = (orderdetail) ->
      $log.debug orderdetail
      paramService.set orderdetail
      $location.path "/pay"
