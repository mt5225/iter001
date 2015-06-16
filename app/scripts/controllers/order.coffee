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
    $scope.house = paramService.get()

    $scope.newOrder = {}

    $scope.orderReview = (newOrder, house) ->
      $log.debug newOrder
      newOrder.orderId = uuidService.generateUUID()
      #orderService.saveOrder newOrder
      flash.setMessage "加载预定信息成功 ！"
      newOrder.house =  house
      newOrder.dayPrices = $scope.dayPrices
      console.log newOrder
      paramService.set newOrder
      $location.path '/orderreview'
    
