'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderCtrl
 # @description
 # # OrderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'OrderCtrl', ($scope, $location, flash, myorderService, houseService, uuidService, paramService) ->
    console.log "in order controller #{$location.path()}"
    $scope.flash = flash


    #TODO: get house info from last user selection
    $scope.house = paramService.get()
    $scope.newOrder = {}

    $scope.orderConfirm = (newOrder, houseId) ->
#      console.log newOrder
      newOrder.id = uuidService.generateUUID()
      newOrder.houseId = houseId
      myorderService.saveOrder newOrder
      flash.setMessage "订单提交成功！"
      $location.path '/'


    return
