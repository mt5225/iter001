'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:HousedetailCtrl
 # @description
 # # HousedetailCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
  .controller 'HousedetailCtrl', ($scope, paramService, $routeParams, houseservice, wechat, $location, $log, surveycheck) ->
          
    #link from house list, house info in stored in session
    # if paramService.get().name
    #   $log.debug "fetch house in paramService"
    #   $scope.house = paramService.get()

    #direct link with house id, then redirct by wechat as: http://qa.aghchina.com.cn:9000/#/housedetail/H001?openid=xxxx
    
    $scope.$watch 'userInfo', ->
      $log.debug "userInfo value changed!"
      if $scope.userInfo #wechat directive got the userInfo
        $log.debug "check if house is stored in paramService"
        house = paramService.get()
        $log.debug house
        $log.debug $routeParams.id 
        if house.id
          $scope.house = house
        else if $routeParams.id == undefined
          $location.path "/houses"
        else
          promise = houseservice.getHouseById $routeParams.id
          promise.then ((payload) ->
            $log.debug payload.data
            $scope.house = payload.data[0]
            paramService.set payload.data[0]
          ), (errorPayload) ->
            $log.error 'failure loading house detail', errorPayload
            return

    $scope.next = () ->
        #check if user have take survey before
      userInfo = wechat.getUserInfo()
      promise = surveycheck.check(userInfo.openid)
      promise.then ((payload) ->
        $log.debug payload.data
        for survey in payload.data
          $log.debug survey.type
          if survey.type == '入住'
            $location.path '/order'
            return
        $location.path "/survey"
      ), (errorPayload) ->
        $log.error 'failure loading surveycheck detail', errorPayload

    $scope.close = () ->
      $location.path "/houses"

    
