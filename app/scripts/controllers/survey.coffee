'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:SurveyCtrl
 # @description
 # # SurveyCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'SurveyCtrl', ($scope, $location, $log, wechat) ->
    userinfo = wechat.getUserInfo()
    $scope.nickname = userinfo.nickname

    $scope.FinishSurvey = ->
      $location.path '/houses'
