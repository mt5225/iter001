'use strict'

###*
 # @ngdoc service
 # @name iter001App.wechat
 # @description
 # # wechat
 # Service in the iter001App.
###
angular.module('iter001App')
  .service 'wechat', ($log, $http)->
    UserInfo = {}
    return {
      loadUserInfo: (uoid)->
        $log.debug "[wechat service] User OpenId = #{uoid}"
        #get user info from openid
        $http(
          method: 'GET'
          url: "http://www.mt5225.cc:3000/api/userinfo?user_openid=#{uoid}"
        ).success((data) ->
          $log.debug data
          UserInfo = data

        ).error (data) ->
          $log.debug "[wechat service] failed to get userinfo from #{uoid}"
          return

      getUserInfo: ->
        UserInfo

      getSignString: ->
        "yyy"
    }
