'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:MyorderCtrl
 # @description get user order list
 # # MyorderCtrl
 # Controller of the iter001App
###
angular.module('iter001App')
  .controller 'MyorderCtrl', ($scope, $log, wechat, orderService, $location, $routeParams, $window) ->
    if $routeParams.openid || wechat.getUserInfo().openid
        promise = wechat.loadUserInfo $routeParams.openid
        promise.then((payload) ->
          userInfo = wechat.getUserInfo()
          promise = orderService.queryOrder userInfo.openid
            # promise = orderService.queryOrder 'o82BBs8XqUSk84CNOA3hfQ0kNS90'
          promise.then((payload) ->
            $log.debug payload.data
            $scope.orders = payload.data
            $scope.$evalAsync()
          )
        )
    
    $scope.close = () ->
      $location.path "/close"

    $scope.refresh = () ->
      $window.location.reload();
