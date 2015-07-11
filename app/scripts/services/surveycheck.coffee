'use strict'

###*
 # @ngdoc service
 # @name iter001App.surveycheck
 # @description
 # # surveycheck
 # check if user have fill the survey before place order
###
angular.module 'iter001App'
  .service 'surveycheck', ($log, $http, API_ENDPOINT)->
    return {
      check: (openid) ->
        $http(
          method: 'GET'
          url: "#{API_ENDPOINT}/api/surveys/#{openid}"
        ).success((data) ->
          $log.debug "get survey data success"
          return data
        ).error (data) ->
          $log.debug "[surveycheck service] failed to get surveycheck info #{API_ENDPOINT}/api/surveys/#{openid}"
          $log.debug data
          return data
    }
