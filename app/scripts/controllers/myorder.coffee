'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:MyorderCtrl
 # @description get user order list
 # # MyorderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'MyorderCtrl', ($scope, myorderService) ->

    $scope.orders = myorderService.getOrder()
