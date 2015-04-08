'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderCtrl
 # @description
 # # OrderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'OrderCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
