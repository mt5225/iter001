'use strict'

###*
# @ngdoc function
# @name iter001App.controller:MainCtrl
# @description
# # MainCtrl
# Controller of the iter001App
###

angular.module('iter001App').controller 'MainCtrl', ($scope, $location, flash, houseService, paramService) ->

  $scope.houses = houseService.getHouseList()
  $scope.toOrderPage = (house) ->
    paramService.set house
    $location.path '/order'

  return
