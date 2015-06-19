'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderCtrl
 # @description
 # # OrderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'OrderCtrl', ($scope, $location, flash, $log, orderService,uuidService, paramService) ->

    $scope.flash = flash

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

    $scope.orderReview = (newOrder, house) ->
      $log.debug newOrder
      newOrder.orderId = uuidService.generateUUID()
      flash.setMessage "加载营地预定信息成功 ！"
      newOrder.house =  house
      newOrder.dayPrices = $scope.dayPrices
      console.log newOrder
      paramService.set newOrder
      $location.path '/orderreview'
    
