'use strict'

###*
 # @ngdoc service
 # @name iter001App.availableroom
 # @description
 # # available room
 # Service in the iter001App.
###
angular.module 'iter001App'
  .service 'availableroom', ($log, $http, API_ENDPOINT)->
    console.log "[api endpoint] #{API_ENDPOINT}"
    return {  
      getAvailableDateById: (id) ->   
        if id
          $log.debug "loading available dates by house id=#{id}"
          $http(
            method: 'GET'
            url: "#{API_ENDPOINT}/api/available/#{id}"
          ).success((data) ->
            return data
          ).error (data) ->
            $log.error "[availableroom service] fail to get available room record from #{API_ENDPOINT}"
            $log.error data
        else
          return {}
    }