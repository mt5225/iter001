'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderreviewCtrl
 # @description
 # # OrderreviewCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'OrderreviewCtrl', ($scope, $log, $location, wechat, paramService, dayarray, orderService, WEB_ENDPOINT) ->
    $log.debug "===> OrderreviewCtrl <==="
    $scope.currentShow = "orderReview"

    #if order is empty, return to house list
    if !paramService.get().house
      $location.path "/houses"

    orderDetails = paramService.get()
    $log.debug orderDetails
    re = /\//g
    $scope.checkInDay = orderDetails.checkInDay.replace re, '-'
    $scope.checkOutDay = orderDetails.checkOutDay.replace re, '-'
    $scope.house = orderDetails.house


    #get booking day and price, caculate total price
    bookingDayPriceArray = []
    bookingArray = dayarray.getDayArray(orderDetails.checkInDay, orderDetails.checkOutDay)
    #pop the checkout day
    bookingArray.pop()
    $log.debug bookingArray

    totalPrice = 0
    $log.debug "<-- day price list [ALL] in orderDetails -->"
    $log.debug orderDetails.dayPrices
    for item in bookingArray #for each day from checkin day to checkout day
      dayprice = {}
      dayprice.day = item
      if orderDetails.dayPrices[item]?
        dayprice.price = orderDetails.dayPrices[item]
        totalPrice = totalPrice + parseInt(dayprice.price)       
        bookingDayPriceArray.push(dayprice)

    $log.debug bookingDayPriceArray
    $scope.bookingDayPriceArray = bookingDayPriceArray
    $scope.totalPrice = totalPrice

    #notify user resv success
    msgResvSuccess = (orderDetails) ->
      msg = {}
      msg.touser = orderDetails.userInfo.openid
      msg.template_name = "resv_success"
      msg.url = "#{WEB_ENDPOINT}/#/myorder/#{orderDetails.orderId}?openid=#{msg.touser}"
      msg.data = 
        first: value: "您有最新订单，请及时处理"
        keyword1: value: "#{orderDetails.house.tribe}"
        keyword2: value: "#{orderDetails.houseName}"
        keyword3: value: "入住日期#{orderDetails.checkInDay}，退房日期#{orderDetails.checkOutDay}"
        keyword4: value: "1"
        keyword5: value: "#{orderDetails.totalPrice}元"
        remark: value: "订单号为#{orderDetails.orderId},请在24小时内完成支付，否则订单会被系统自动取消，支付请点击本消息"
      #add some color
      for item of msg.data
        msg.data[item].color = "#01579b"
      $log.debug msg
      wechat.sendMessage msg


    #get pay result
    $scope.submitOrder = ()->
      paramService.set {submitOrder: true}
      $scope.currentShow = "submitResult"
      orderDetails.houseId = orderDetails.house['id']
      orderDetails.houseName = orderDetails.house['name']
      orderDetails.totalPrice = totalPrice
      orderDetails.priceByDayArray = JSON.stringify bookingDayPriceArray
      #check if house is available
      promise = orderService.checkAvailable orderDetails
      promise.then((payload) ->
        $log.debug payload.data
        if payload.data.available is 'false'
          $scope.payMessage = "很抱歉，#{orderDetails.houseName}已经被人捷足先登了！"
          $scope.$evalAsync()
        else
         #save order to backend
          promise = orderService.saveOrder orderDetails
          promise.then ((payload) ->
            $scope.submitResult = "success"
            $log.debug payload
            $scope.payMessage = "感谢预订#{$scope.house.name}，订单号为#{payload.data['orderId']} 。请在24小时内完成支付，否则预订会被系统自动取消"
            $scope.$evalAsync()
            msgResvSuccess(orderDetails)
          ), (errorPayload) ->
              $log.error 'failure to save submit Order', errorPayload
              $scope.payMessage = "订单提交失败!"
      )

    $scope.close = () ->
      $location.path "/close"

    $scope.back = () ->
      $location.path "/order"

    $scope.gotoPay = () ->
      paramService.set orderDetails
      $location.path "/pay"

    $scope.showBarcode = () ->
      false

      

