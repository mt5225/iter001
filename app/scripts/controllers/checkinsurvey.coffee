'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:CheckinsurveyCtrl
 # @description
 # # CheckinsurveyCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
.controller 'CheckinsurveyCtrl', ($scope, $log, $location, paramService, surveyservice, sortByKey) ->
  $scope.$watch 'userInfo', ->
    if $scope.userInfo #wechat directive got the userInfo     
      openid = $scope.userInfo.openid
      $log.debug "found openid: #{openid}"  
      promise = surveyservice.loadByOpenID openid
      promise.then((payload) ->
        surveys = []
        for item in payload.data
          surveys.push item if item.type is "入住"       
        if surveys.length > 0
          t = sortByKey.sort surveys, 'createDay'
          $log.debug t
          paramService.set t[0]
          $log.debug "survey data loaded, redirect to survey page"
          $location.path '/survey'
        else
          $scope.msg = "您尚未提交入住问卷，请通过[服务号］->[营地预定] 完成问卷" 
      )
  
  $scope.close = () ->
    $location.path "/close"
