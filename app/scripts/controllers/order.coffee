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

    $scope.orderConfirm = (newOrder, houseId) ->
      $log.debug newOrder
      newOrder.orderId = uuidService.generateUUID()
      newOrder.houseId = houseId
      orderService.saveOrder newOrder
      flash.setMessage "订单提交成功！"
      $location.path '/houses'
    
