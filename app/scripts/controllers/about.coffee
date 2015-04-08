'use strict'

###*
# @ngdoc function
# @name iter001App.controller:AboutCtrl
# @description
# # AboutCtrl
# Controller of the iter001App
###

angular.module('iter001App').controller 'AboutCtrl', ($scope) ->
  $scope.awesomeThings = [
    'HTML5 Boilerplate'
    'AngularJS'
    'Karma'
  ]
  return
