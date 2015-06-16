'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderreviewCtrl
 # @description
 # # OrderreviewCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'OrderreviewCtrl', ($scope, $log, $location, flash, paramService, dayarray) ->
    $log.debug "===> OrderreviewCtrl <==="
    $scope.flash = flash
    orderDetails = paramService.get()

    $scope.house = orderDetails.house
    #get booking day and price
    bookingDayPriceArray = []
    bookingArray = dayarray.getDayArray(orderDetails.checkInDay, orderDetails.checkOutDay)
    $log.debug orderDetails.dayPrices 
    $log.debug bookingArray
    totalPrice = 0
    for item in bookingArray
      if orderDetails.dayPrices[item]
        dayprice = {}
        dayprice.day = item 
        dayprice.price = orderDetails.dayPrices[item]
        totalPrice = totalPrice + parseInt(dayprice.price)
        bookingDayPriceArray.push(dayprice) 
    $log.debug bookingDayPriceArray
    $log.debug "total = #{totalPrice}"
    $scope.bookingDayPriceArray = bookingDayPriceArray
    $scope.totalPrice = totalPrice

