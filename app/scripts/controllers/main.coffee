'use strict'

###*
# @ngdoc function
# @name iter001App.controller:MainCtrl
# @description
# # MainCtrl
# Controller of the iter001App
###

angular.module('iter001App').controller 'MainCtrl', ($scope, $location) ->
  $scope.houses = [
    {name: '喜乐屋', likes: '16', price: '1050', image: 'images/xile.jpg'}
    {name: '向日葵', likes: '22', price: '850', image: 'images/xrk.jpg'}
  ]

  $scope.isActive = (viewLocation)->
    console.log "in isActive"
    $location.path() in viewLocation

  return
