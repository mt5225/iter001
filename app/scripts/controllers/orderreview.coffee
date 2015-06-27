'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderreviewCtrl
 # @description
 # # OrderreviewCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'OrderreviewCtrl', ($scope, $log, $location, paramService, dayarray, orderService) ->
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
    for item in bookingArray #for each day from checkin day to checkout day
      dayprice = {}
      dayprice.day = item
      if orderDetails.dayPrices[item]
        dayprice.price = orderDetails.dayPrices[item]
        totalPrice = totalPrice + parseInt(dayprice.price)       
        bookingDayPriceArray.push(dayprice)

    $log.debug bookingDayPriceArray
    $scope.bookingDayPriceArray = bookingDayPriceArray
    $scope.totalPrice = totalPrice

    #todo, get pay result
    $scope.submitOrder = ()->
      $scope.currentShow = "payResult"
      orderDetails.houseId = orderDetails.house['id']
      orderDetails.houseName = orderDetails.house['name']
      orderDetails.totalPrice = totalPrice
      orderDetails.priceByDayArray = JSON.stringify bookingDayPriceArray
      #check if house is available
      promise = orderService.checkAvailable orderDetails
      promise.then((payload) ->
        $log.debug payload.data
        if payload.data.available == 'false'
          $scope.payMessage = "很抱歉，#{orderDetails.houseName}已经被人捷足先登了！"
          $scope.$evalAsync()
        else
         #save order to backend
          promise = orderService.saveOrder orderDetails
          promise.then ((payload) ->
            $log.debug payload
            $scope.payMessage = "支付成功，订单号为#{payload.data['orderId']} 您可以通过[客服]->[订单查询] 查看订单状态。 亲，#{$scope.house.name}见！"
            $scope.$evalAsync()
          ), (errorPayload) ->
              $log.error 'failure to save submit Order', errorPayload
              $scope.payMessage = "订单提交失败!"

      )

    $scope.close = () ->
      $location.path "/close"

