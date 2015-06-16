'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:HousedetailCtrl
 # @description
 # # HousedetailCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'HousedetailCtrl', ($scope, paramService, $routeParams, houseservice, $location, $log) ->
    #get house selected by user in house list,  or direct link with param :houseid
    if paramService.get().name
      $log.debug "fetch house in paramService"
      $scope.house = paramService.get()

    #direct link with house id, from wechat rich text message: http://qa.aghchina.com.cn:9000/#/housedetail?id=H001
    else if $routeParams.id   
      $log.debug "fetch house by id #{$routeParams.id}"
      promise = houseservice.getHouseById($routeParams.id)
      promise.then ((payload) ->
        $log.debug payload.data
        $scope.house = payload.data[0]
        paramService.set payload.data[0]
      ), (errorPayload) ->
          $log.error 'failure loading house detail', errorPayload
          return
    else
      $log.debug "could not locate an specify house, goto house list"
      $location.path "/houses"
    
    $scope.order = () ->
      $log.debug "goto order page"
      $location.path "/order"
    
