'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:FrontpageCtrl
 # @description
 # # FrontpageCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'FrontpageCtrl', ($scope, $location, $log, paramService) ->
    #list of tribes
    $scope.tribes = [
      {name: "石舍香樟", image: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/%E7%9F%B3%E8%88%8D%E9%A6%99%E6%A8%9Fwith%20name.jpg'}
      {name: "芦茨土屋", image: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/%E8%8A%A6%E8%8C%A8%E5%9C%9F%E5%B1%8Bwith%20name.jpg'}
      {name: "凤溪玫瑰", image: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/%E7%8E%AB%E7%91%B0%E9%83%A8%E8%90%BDwith%20name.jpg'}
    ]

    $scope.toHouseList = (tribe)->
      $log.debug "go to house list filter:tribe=#{tribe.name}"
      paramService.set tribe
      $location.path '/houses'

    $scope.toSearchPage = () ->
      $location.path '/checkavail'

