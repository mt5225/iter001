'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:LoadwechatCtrl
 # @description
 # # LoadwechatCtrl
 # Controller of the iter001App
###
angular.module 'iter001App'
.controller 'LoadwechatCtrl', ($scope, $location, $log) ->
  $scope.$watch 'userInfo', ->
      $log.debug "userInfo value changed!"
      if $scope.userInfo? 
        $location.path "/frontpage"
    

