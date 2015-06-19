'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:VolunteerCtrl
 # @description
 # # VolunteerCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'VolunteerCtrl', ($scope, $log, flash, $location, surveyservice) ->
    $scope.currentShow = 'survey'
    $scope.survey = {
        type: '志愿者'
        question3: '过程'
        question4: '城市'
        question9: '空闲时间参与'
    }
    
    $scope.switchToSurvey = () ->
      $scope.currentShow = 'survey'
      $scope.$evalAsync()

    $scope.finishSurvey = () ->
      $scope.currentShow = 'finish'
      $scope.$evalAsync()
      surveyservice.save $scope.survey

    $scope.gotoFrontPage = () ->
      $location.path "/"

    $scope.closeWindow = () ->
      $location.path "/close"



