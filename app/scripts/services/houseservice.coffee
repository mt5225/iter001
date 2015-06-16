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
          $log.error "[house  service] failed to get houses list from API_ENDPOINT"
          $log.error data
       
      getHouseById: (id) -> 
        $log.debug "loading house id=#{id}"
        $http(
          method: 'GET'
          url: "#{API_ENDPOINT}/api/houses/#{id}"
        ).success((data) ->
          return data
        ).error (data) ->
          $log.error "[house service] fail to get house record from API_ENDPOINT"
          $log.error data
      # @TODO fetch record from backend database 
      getSlideShow: ->
        slides = 
          'H001':
            currentIndex: 0
            images:
              [
                {image: 'images/xile.jpg', description: 'Image 00'}
                {image: 'images/xile02.jpg', description: 'Image 01'}
                {image: 'images/xile03.jpg', description: 'Image 02'}
                {image: 'images/xile04.jpg', description: 'Image 03'}
              ]
          'H002':
            currentIndex: 0
            images:
              [
                {image: 'images/xrk.jpg', description: 'Image 00'}
                {image: 'images/xrk02.jpg', description: 'Image 01'}
                {image: 'images/xrk03.jpg', description: 'Image 02'}
                {image: 'images/xrk04.jpg', description: 'Image 03'}
              ]
          'H003':
            currentIndex: 0
            images:
              [
                {image: 'images/greentea.jpg', description: 'Image 00'}
                {image: 'images/greentea02.jpg', description: 'Image 01'}
                {image: 'images/greentea03.jpg', description: 'Image 02'}
                {image: 'images/greentea04.jpg', description: 'Image 03'}
              ]
        return slides
    }
