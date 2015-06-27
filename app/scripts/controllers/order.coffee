'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderCtrl
 # @description
 # # OrderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'OrderCtrl', ($scope, $location, flash, $log, orderService, paramService, uuidService, dayarray, wechat, surveycheck) ->
   
    #gate: check if we have user id and house id
    userInfo = wechat.getUserInfo()   
    $scope.house = paramService.get()
    if !userInfo['openid'] || !$scope.house['id']
      $log.debug userInfo
      $log.debug $scope.house
      $log.debug "cannot load user info or house info, got back to houses list page"
      $location.path '/houses'
      return

    $scope.currentShow = "main"
    $scope.capacity = () ->
      lowBound = 1
      highBound = $scope.house.capacity
      [lowBound...highBound]

    $scope.newOrder = {}
    $scope.validateMsg = ''

    # checkIfDayNotContinious = (newOrder) ->
    #   bookingArray = dayarray.getDayArray(newOrder.checkInDay, newOrder.checkOutDay)
    #   for item in bookingArray 
    #     if !$scope.dayPrices[item]
    #       return true
    #   return false

    $scope.orderCheck = (newOrder, house) ->
      if !newOrder.checkInDay
        $scope.validateMsg = "请指定入住日期|" + uuidService.generateUUID()
      else if !newOrder.checkOutDay
        $scope.validateMsg = "请指定退房日期|" + uuidService.generateUUID()
      else if !newOrder.numOfGuest
        $scope.validateMsg = "请指定客人数|" + uuidService.generateUUID()
      else if newOrder.checkInDay > newOrder.checkOutDay
        $scope.validateMsg = "入住日期不能晚于退房日期|" + uuidService.generateUUID()
      # else if checkIfDayNotContinious(newOrder)
      #   $scope.validateMsg = "预定日期不连续，请重新选择|" + uuidService.generateUUID()
      else #goto orderreview page or survey page
        $log.debug newOrder
        newOrder.house =  house
        newOrder.dayPrices = $scope.dayPrices #store all available data and price 
        $log.debug newOrder
        paramService.set newOrder #store order infomation in session
        $scope.currentShow = "warnning"
          

    $scope.close = () ->
      $location.path "/houses"

    $scope.exitApp = () ->
      $location.path "/close"

    $scope.orderReview = () ->
      $location.path "/orderreview"




    
