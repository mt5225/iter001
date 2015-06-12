'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:VolunteerCtrl
 # @description
 # # VolunteerCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'VolunteerCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
