'use strict'

###*
# @ngdoc function
# @name iter001App.controller:MainCtrl
# @description
# # MainCtrl
# Controller of the iter001App
###

angular.module('iter001App').controller 'MainCtrl', ($scope) ->
  $scope.houses = [
    {name: '喜乐屋', likes: '12', price: '1050', image: 'images/xile.jpg'}
    {name: '向日葵', likes: '10', price: '850', image: 'images/xrk.jpg'}
  ]
  return
