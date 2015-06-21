'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:HousedetailCtrl
 # @description
 # # HousedetailCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'HousedetailCtrl', ($scope, paramService, $routeParams, houseservice, wechat, $location, $log) ->
          
    #link from house list, house info in stored in session
    if paramService.get().name
      $log.debug "fetch house in paramService"
      $scope.house = paramService.get()

    #direct link with house id, then redirct by wechat as: http://qa.aghchina.com.cn:9000/#/housedetail/H001?openid=xxxx
    else if $routeParams.id
      $log.debug "fetch house by id #{$routeParams.id}"
      $scope.houseId = $routeParams.id
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

    $scope.close = () ->
      $location.path "/houses"
    
