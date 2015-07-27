'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:VolunteerCtrl
 # @description
 # # VolunteerCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'VolunteerCtrl', ($scope, $log, flash, $location, surveyservice, wechat, uuidService) ->
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
      #check if survey is finished
      questionsAnswered = 0
      for k of $scope.survey
        questionsAnswered++ if k.indexOf('question') > -1
      $log.debug "questions answered = #{questionsAnswered}"
      if questionsAnswered <= 8
        $scope.validateMsg = "请完成所有问题|" + uuidService.generateUUID()  
        $log.debug $scope.validateMsg
        return
        
      $scope.currentShow = 'finish'
      $scope.$evalAsync()
      $scope.survey.userinfo = wechat.getUserInfo()
      surveyservice.save $scope.survey

    $scope.gotoFrontPage = () ->
      $location.path "/"

    $scope.closeWindow = () ->
      $location.path "/close"



