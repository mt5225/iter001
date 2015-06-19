'use strict'

###*
 # @ngdoc service
 # @name iter001App.surveyservice
 # @description
 # # surveyservice
 # Service in the iter001App.
###
getToday = () ->
  today = new Date
  dd = today.getDate()
  mm = today.getMonth() + 1
  yyyy = today.getFullYear()
  dd = '0' + dd if dd < 10
  mm = '0' + mm if mm < 10  
  today = yyyy + '-' + mm + '-' + dd
  return today

angular.module 'iter001App'
  .service 'surveyservice', ($http, $log, wechat, API_ENDPOINT)->
    return {
      save: (surveyResult) ->
        surveyResult.userinfo = wechat.getUserInfo()
        if !surveyResult.userinfo['openid']
          surveyResult.userinfo['openid'] = 'unknown'
        surveyResult.createDay = getToday()
        $log.debug "[survey service] save survey result to backend #{JSON.stringify(surveyResult)}"
        $http(
          method: 'POST'
          url: "#{API_ENDPOINT}/api/surveys"
          headers: {'Content-Type': 'application/json'}
          data: JSON.stringify(surveyResult)
          dataType: 'json'
        ).success((data) ->
          $log.info "[survey service] surveyResult saved to backend success !"
          $log.debug data
        ).error (data) ->
          $log.error "[survey service] failed to save surveyResult"
          $log.debug data
    }
