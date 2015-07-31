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
    param = paramService.get()
    $log.debug payload
    records = []
    for item in payload.data
      if param.tribe?  #back from housedetail
        records.push item if param.tribe is item.tribe
      else if param.name? #from frontpage
        records.push item if param.name is item.tribe
      else
        $location.path "/"
    $log.debug records
    $scope.houses = records
    ), (errorPayload) ->
      $log.error 'failure loading house list', errorPayload
      return

  #user click the order button, navigate the order page
  #with house parameter
  $scope.detail = (house) ->
    paramService.set house
    $location.path '/housedetail'