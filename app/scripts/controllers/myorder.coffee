'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:MyorderCtrl
 # @description get user order list
 # # MyorderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
.controller 'MyorderCtrl', ($scope, $log, orderService, $location, $route, $anchorScroll, paramService) ->

    dataloaded = false
    $scope.orderId = null
    
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
      $log.debug "show order details"
      $scope.orderdetail = order
      $scope.orderId = order.orderId
      $scope.showdetail = true
      $('html, body').animate { scrollTop: $("#bottom").offset().top }, 1000
      return
       

    $scope.allowPay = (orderdetail) ->
      show = false
      if orderdetail? 
        show = orderdetail.status in ['支付失败', '支付已取消', '已提交']
      show

    $scope.allowCancel = (orderdetail) ->
      show = false
      if orderdetail? 
        show = orderdetail.status not in ["订单取消", "支付成功"] 
      show

    $scope.gotoPay = (orderdetail) ->
      $log.debug orderdetail
      paramService.set orderdetail
      $location.path "/pay"

    $scope.cancelOrder = (orderdetail) ->
      promise = orderService.cancelOrder orderdetail
      promise.then((payload) ->
        $log.debug payload
        orderdetail.status = "订单取消"
        $scope.orderdetail = orderdetail
        $scope.showdetail = true
      )



