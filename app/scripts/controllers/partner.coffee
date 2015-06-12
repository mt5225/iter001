'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:PartnerCtrl
 # @description
 # # PartnerCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'PartnerCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
