'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:MyorderCtrl
 # @description get user order list
 # # MyorderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
.controller 'MyorderCtrl', ($scope, $log, orderService, $location, $route, $anchorScroll, paramService, wechat, $routeParams, WEB_ENDPOINT, houseservice, $window) ->

    dataloaded = false
    $scope.orderId = null
    
    $scope.$watch 'userInfo', ->
      if $scope.userInfo && !dataloaded #wechat directive got the userInfo     
        openid = $scope.userInfo.openid
        $log.debug "found openid: #{openid}" 
        if $routeParams.orderId?  #go direct to pay 
          promise = orderService.queryOrderById $routeParams.orderId
          promise.then((payload) ->
            orderDetails = payload.data[0]
            houseservice.getHouseById(orderDetails.houseId)
            .then ((payload) -> 
              orderdetail.house = payload.data[0]
              paramService.set orderDetails
              $location.path "pay"
            )
          )
        else #list all orders by user TODO: filtering
          promise = orderService.queryOrder openid
          promise.then((payload) ->
            sortedArray = payload.data
            sortedArray.sort (t1, t2) ->
              switch t1.createDay > t2.createDay
                when true then return -1
                when false then return 1
            $scope.orders = sortedArray
            $log.debug sortedArray
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
        show = orderdetail.status not in ["订单取消", "预订成功"] 
      show

    $scope.gotoPay = (orderDetails) ->
      $log.debug orderDetails
      promise = houseservice.getHouseById orderDetails.houseId
      promise.then ((payload) -> 
        orderDetails.house = payload.data[0]
        paramService.set orderDetails
        $location.path "/pay"
      )


    #notify user order cancel
    msgOrderCancel = (orderDetails) ->
      msg = {}
      msg.touser = $scope.userInfo.openid
      msg.template_name = "order_cancel"
      msg.url = "#{WEB_ENDPOINT}/#/myorder?openid=#{msg.touser}"
      msg.data = 
        first: value: "您的#{orderDetails.houseName}订单已取消"
        HotelName: value: "#{orderDetails.houseName}"
        CheckInDate: value: "#{orderDetails.checkInDay}"
        CheckOutDate: value: "#{orderDetails.checkOutDay}"
        remark: value: "编号为#{orderDetails.orderId} 的订单已成功取消"
      #add some color
      for item of msg.data
        msg.data[item].color = "#01579b"
      $log.debug msg
      wechat.sendMessage msg

    $scope.cancelOrder = (orderdetail) ->
      promise = orderService.cancelOrder orderdetail
      promise.then((payload) ->
        $log.debug payload
        orderdetail.status = "订单取消"
        $scope.orderdetail = orderdetail
        msgOrderCancel orderdetail
        $scope.showdetail = true
      )

    $scope.map = (orderdetail) ->
      $log.debug orderdetail
      promise = houseservice.getHouseById(orderdetail.houseId)
      promise.then ((payload) -> 
        house =  payload.data[0]
        $window.location.href = "#{WEB_ENDPOINT}/static/map.html?tribe=#{house.tribe}"
      )




