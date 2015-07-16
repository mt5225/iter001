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
        $scope.imageArray = {}
        $scope.imageArray['house_pic'] = {_Index: 0, img: house.house_pic_list}
        $scope.imageArray['owner_pic'] = {_Index: 0, img: house.owner_pic_list}
        $scope.imageArray['facility_pic'] = {_Index: 0, img: house.facility_pic_list}
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
      $location.path "/"


    # if a current image is the same as requested image
    $scope.isActive = (kind,index) ->
      $scope.imageArray[kind]._Index is index

    # show prev image
    $scope.showPrev = (kind)->
      $scope.imageArray[kind]._Index = $scope.imageArray[kind]._Index - 1
      $scope.imageArray[kind]._Index = ($scope.imageArray[kind].img.length - 1) if $scope.imageArray[kind]._Index < 0
      $log.debug "prev #{$scope.imageArray[kind]._Index}"
      return

    # show next image
    $scope.showNext = (kind)->
      $scope.imageArray[kind]._Index = $scope.imageArray[kind]._Index + 1
      $scope.imageArray[kind]._Index = 0 if $scope.imageArray[kind]._Index > ($scope.imageArray[kind].img.length - 1)
      $log.debug "next #{$scope.imageArray[kind]._Index}"
      return




    
