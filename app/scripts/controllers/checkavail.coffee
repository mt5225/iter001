'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:CheckavailCtrl
 # @description
 # # CheckavailCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
.controller 'CheckavailCtrl', ($scope, uuidService, $log, orderService, houseservice, $q, $location, paramService, wechat) ->

  initState = () ->
    $scope.showResult = false
    $scope.showGotoOrder = false
    $scope.showClose = false
    $scope.currentRecord = {}

  $log.debug "CheckavailCtrl controller"
  $log.debug $scope.userInfo
  $scope.validateMsg = ''
  initState()
  
  $scope.hideResultTable = () ->
    initState()

  #seach available house during checkInDay and checkOutDay
  #return availableArray
  $scope.seachAvail = () ->
    initState()
    $log.debug "#{$scope.checkInDay} #{$scope.checkOutDay}"
    $log.debug $scope.userInfo
    if !$scope.checkInDay? or !$scope.checkOutDay? or !$scope.userInfo?
      $scope.validateMsg = "请输入完整查询信息!|" + uuidService.generateUUID() 
    else if $scope.checkOutDay <= $scope.checkInDay
      $scope.validateMsg = "退房日期不能早于或入住日期|" + uuidService.generateUUID()
    else
      houseservice.getHouseList()
      .then ((payload) ->  
        promises = _.map payload.data, (house) -> 
          order = {}
          order.checkInDay = $scope.checkInDay
          order.checkOutDay = $scope.checkOutDay
          order.houseId = house.id
          order.houseName = house.name
          order.tribeName = house.tribe
          $log.debug order
          orderService.checkAvailable order
        $q.all(promises)
        .then (results) ->
          aArray = []
          for item in results
            t = {}
            switch item.data.available
              when 'true' then t.status = "空闲"
              when 'false' then t.status = "已订满"
              when 'N/A' then t.status = "不可预订"
            t.houseInfo = JSON.parse item.config.data
            aArray.push t
          $scope.availableArray = aArray
          $log.debug aArray
          $scope.showResult = true
          $scope.showClose = true
      )  

    $scope.close = () ->
      $location.path '/frontpage'

    $scope.onRecordSelect = (record) ->
      $scope.currentRecord = record
      if record.status is "空闲"
        $scope.showGotoOrder = true
      else
        $scope.showGotoOrder = false

    $scope.gotoOrderPage = (record) ->
      houseservice.getHouseById record.houseInfo.houseId
      .then ((payload) ->
        newOrder = {}
        newOrder.house = payload.data[0]
        newOrder.userInfo = wechat.getUserInfo()
        newOrder.checkInDay = $scope.checkInDay
        newOrder.checkOutDay = $scope.checkOutDay
        $log.debug newOrder
        paramService.set newOrder
        $location.path "/order"
      )



