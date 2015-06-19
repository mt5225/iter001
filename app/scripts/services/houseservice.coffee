'use strict'

###*
 # @ngdoc service
 # @name iter001App.houseservice
 # @description
 # # houseservice
 # Service in the iter001App.
###
angular.module 'iter001App'
  .service 'houseservice', ($log, $http, API_ENDPOINT)->    
    return {
      getHouseList: ->       
        $log.debug "loading houses list by $http"
        $http(
          method: 'GET'
          url: "#{API_ENDPOINT}/api/houses"
        ).success((data) ->
          return data
        ).error (data) ->
          $log.error "[house  service] failed to get houses list from #{API_ENDPOINT}"
          $log.error data
       
      getHouseById: (id) -> 
        $log.debug "loading house id=#{id}"
        $http(
          method: 'GET'
          url: "#{API_ENDPOINT}/api/houses/#{id}"
        ).success((data) ->
          return data
        ).error (data) ->
          $log.error "[house service] fail to get house record from #{API_ENDPOINT}"
          $log.error data
    }
