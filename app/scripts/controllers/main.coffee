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
  $scope.$watch 'userInfo', ->
    if $scope.userInfo #wechat directive got the userInfo
      promise = houseservice.getHouseList()
      promise.then ((payload) ->
        $log.debug payload
        $scope.houses = payload.data
        ), (errorPayload) ->
          $log.error 'failure loading house list', errorPayload
          return

  #user click the order button, navigate the order page
  #with house parameter
  $scope.detail = (house) ->
    paramService.set house
    $location.path '/housedetail'


