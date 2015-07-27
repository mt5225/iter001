'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:SurveyCtrl
 # @description
 # # SurveyCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'SurveyCtrl', ($scope, $location, $log, uuidService, wechat, surveycheck, surveyservice, paramService) ->
    userInfo = wechat.getUserInfo()
    $scope.nickname = userInfo.nickname
    oldSurvey = paramService.get()
    updateOldSurvey = false
    $scope.validateMsg = ''

    if oldSurvey.type?
        $log.debug "update old survey"
        $scope.survey = oldSurvey
        updateOldSurvey = true

    $scope.FinishSurvey = ->
      survey = $scope.survey
      
      #check if survey is finished
      questionsAnswered = 0
      for k of survey
        questionsAnswered++ if k.indexOf('question') > -1
      $log.debug "questions answered = #{questionsAnswered}"

      if questionsAnswered >= 8
        if updateOldSurvey
          #note we just create an new one, while keep the old old as history
          delete survey['_id']
          surveyservice.save survey
          $location.path '/close'
        else  
          survey.userinfo = userInfo
          survey.type = "入住"
          surveyservice.save survey
          $location.path '/order'
      else
        $scope.validateMsg = "请完成所有问题|" + uuidService.generateUUID()  
        $log.debug $scope.validateMsg
        return
