'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:SurveyCtrl
 # @description
 # # SurveyCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'SurveyCtrl', ($scope, $location) ->
    $scope.FinishSurvey = ->
      $location.path '/houses'
