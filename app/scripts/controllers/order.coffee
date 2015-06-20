'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderCtrl
 # @description
 # # OrderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'OrderCtrl', ($scope, $location, flash, $log, orderService, paramService, uuidService, dayarray) ->
   
    #get house selected by user
    if paramService.get()['id']
      $scope.house = paramService.get()
      $scope.capacity = () ->
        lowBound = 1
        highBound = $scope.house.capacity
        return [lowBound...highBound]
    else
      $log.debug "house id is not set, return to house list"
      $location.path '/houses'
      return

    $scope.newOrder = {}
    $scope.validateMsg = ''

    checkIfDayNotContinious = (newOrder) ->
      bookingArray = dayarray.getDayArray(newOrder.checkInDay, newOrder.checkOutDay)
      for item in bookingArray 
        if !$scope.dayPrices[item]
          return true
      return false

    $scope.orderReview = (newOrder, house) ->
      if !newOrder.checkInDay
        $scope.validateMsg = "请指定入住日期|" + uuidService.generateUUID()
      else if !newOrder.checkOutDay
        $scope.validateMsg = "请指定退房日期|" + uuidService.generateUUID()
      else if !newOrder.numOfGuest
        $scope.validateMsg = "请指定客人数|" + uuidService.generateUUID()
      else if newOrder.checkInDay > newOrder.checkOutDay
        $scope.validateMsg = "入住日期不能晚于退房日期|" + uuidService.generateUUID()
      else if checkIfDayNotContinious(newOrder)
        $scope.validateMsg = "预定日期不连续，请重新选择|" + uuidService.generateUUID()
      else #goto orderreview page
        $log.debug newOrder
        newOrder.house =  house
        newOrder.dayPrices = $scope.dayPrices #store all available data and price 
        $log.debug newOrder
        paramService.set newOrder
        $location.path '/orderreview'




    
