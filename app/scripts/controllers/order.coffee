'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderCtrl
 # @description
 # # OrderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'OrderCtrl', ($scope, $location, flash, $log, orderService, paramService, uuidService, dayarray, wechat, surveycheck, updateuserinfo) ->
   

    if paramService.get().house #back from order review
      $scope.newOrder = paramService.get()
      $scope.house = $scope.newOrder.house
      $scope.userInfo = $scope.newOrder.userInfo 
    else #from house list
      $scope.newOrder = {}
      $scope.house = paramService.get()
      $scope.userInfo = wechat.getUserInfo() 

    if !$scope.userInfo['openid'] or !$scope.house['id']
      $log.debug "cannot load user info or house info, got back to houses list page"
      $location.path '/houses'

    $scope.currentShow = "main"
    $scope.capacity = () ->
      lowBound = 1
      highBound = (parseInt $scope.house.capacity) + 1
      [lowBound...highBound]

    
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
      else # update user info then goto orderreview page or survey page
        promise = updateuserinfo.update($scope.userInfo)
        promise.then ((payload) ->
          newOrder.house =  house
          newOrder.userInfo = $scope.userInfo
          newOrder.dayPrices = $scope.dayPrices #store all available data and price 
          $log.debug newOrder
          paramService.set newOrder #store order infomation in session
          $scope.currentShow = "warnning"
        )

          

    $scope.close = () ->
      $location.path "/houses"

    $scope.exitApp = () ->
      $location.path "/close"

    $scope.orderReview = () ->
      $location.path "/orderreview"




    
