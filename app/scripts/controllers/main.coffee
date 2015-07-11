'use strict'

###*
# @ngdoc function
# @name iter001App.controller:MainCtrl
# @description
# # MainCtrl
# Controller of the iter001App
###

angular.module('iter001App')
.controller 'MainCtrl', ($scope, $location, $log, flash, houseservice, paramService) ->
  promise = houseservice.getHouseList()
  promise.then ((payload) ->
    tribe = paramService.get()
    $log.debug payload
    records = []
    for item in payload.data
      records.push item if tribe.name is item.tribe
    $scope.houses = records
    ), (errorPayload) ->
      $log.error 'failure loading house list', errorPayload
      return

  #user click the order button, navigate the order page
  #with house parameter
  $scope.detail = (house) ->
    paramService.set house
    $location.path '/housedetail'


