'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:SurveyCtrl
 # @description
 # # SurveyCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'SurveyCtrl', ($scope, $location, $log, wechat, surveycheck, surveyservice) ->
    userInfo = wechat.getUserInfo()
    $scope.nickname = userInfo.nickname

    $scope.FinishSurvey = ->
      survey = $scope.survey
      survey.userInfo = userInfo
      survey.type = "入住"
      surveyservice.save survey
      $location.path '/order'
