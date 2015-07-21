'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:OrderCtrl
 # @description
 # # OrderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'OrderCtrl', ($scope, $location, flash, $log, orderService, paramService, uuidService, dayarray, wechat, surveycheck, updateuserinfo, verifyService) ->
    if paramService.get().submitOrder?
      $location.path '/'
    else if paramService.get().house #back from order review or available query
      $scope.newOrder = paramService.get()
      $scope.house = $scope.newOrder.house
      $scope.userInfo = $scope.newOrder.userInfo 
    else #from house list
      $scope.newOrder = {}
      $scope.newOrder.numOfGuest = 2
      $scope.house = paramService.get()
      $scope.userInfo = wechat.getUserInfo() 

    if !$scope.userInfo['openid'] or !$scope.house['id']
      $log.debug "cannot load user info or house info, got back to houses list page"
      $location.path '/houses'

    $scope.currentShow = "main"
    $scope.capacity = () ->
      lowBound = 1
      highBound = (parseInt $scope.house.capacity) + 1
      [lowBound...highBound]

    
    $scope.validateMsg = ''

    #watch for navigation event 
    $scope.$on '$routeChangeStart', (scope, next, current) ->
      if next.$$route.controller isnt 'OrderCtrl'
        $('.hasDatepicker').datepicker('hide')
      return

    $scope.orderCheck = (newOrder, house, userInfo) ->
      if !newOrder.checkInDay?.length
        $scope.validateMsg = "请指定入住日期|" + uuidService.generateUUID()
      else if !newOrder.checkOutDay?.length
        $scope.validateMsg = "请指定退房日期|" + uuidService.generateUUID()
      else if !newOrder.numOfGuest?
        $scope.validateMsg = "请指定客人数|" + uuidService.generateUUID()
      else if !userInfo.realname?.length or !userInfo.identity?.length or !userInfo.cell?.length
        $scope.validateMsg = "请完整填写联系信息|" + uuidService.generateUUID()
      else if !userInfo.identity_type.length or !userInfo.identity.length
        $scope.validateMsg = "请选择证件类型并填写相应证件号|" + uuidService.generateUUID()
      else if userInfo.identity_type is "身份证" and !verifyService.isIdCardNo(userInfo.identity).status
        $scope.validateMsg =  verifyService.isIdCardNo(userInfo.identity).msg + "|" + uuidService.generateUUID()
      else if !userInfo.cell?.length or not verifyService.isPhone(userInfo.cell)
        $scope.validateMsg = "请输入合法手机号|" + uuidService.generateUUID()
      else if !userInfo.email?.length or not verifyService.isEmail(userInfo.email)
        $scope.validateMsg = "请输入合法email地址|" + uuidService.generateUUID()
     
      else # update user info then goto orderreview page or survey page
        promise = updateuserinfo.update($scope.userInfo)
        promise.then ((payload) ->
          newOrder.house =  house
          newOrder.userInfo = $scope.userInfo
          newOrder.dayPrices = $scope.dayPrices #store all available data and price 
          $log.debug newOrder
          paramService.set newOrder #store order infomation in session
          $scope.currentShow = "warnning"
        )

    $scope.close = () ->
      $location.path "/"

    $scope.orderReview = () ->
      $location.path "/orderreview"




    
