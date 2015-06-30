'use strict'

###*
 # @ngdoc service
 # @name iter001App.updateuserinfo
 # @description
 # # update user info
 # Service in the iter001App.
###
angular.module 'iter001App'
  .service 'updateuserinfo', ($http, $log, API_ENDPOINT)->
    return {
      update: (userInfo) ->
        $http(
          method: 'POST'
          url: "#{API_ENDPOINT}/api/users"
          headers: {'Content-Type': 'application/json'}
          data: JSON.stringify(userInfo)
          dataType: 'json'
        ).success((data) ->
          $log.info "[userupdate service] userinfo saved to backend success !"
          $log.debug data
        ).error (data) ->
          $log.error "[userupdate service] failed to save surveyResult"
          $log.debug data
    }
