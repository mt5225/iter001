###
 # @ngdoc service
 # @name iter001App.wechat
 # @description
  # wechat
  Service in the iter001App.
###
angular.module('iter001App')
.service 'wechat', ($log, $http, API_ENDPOINT)->
  userInfo = {}
  signData = {}

  console.log "[api endpoint] #{API_ENDPOINT}"

  return {
    loadUserInfo: (uoid)->
      if userInfo.openid
        $log.debug "[wechat service] cached user info"
        return userInfo
      $log.debug "[wechat service] User OpenId = #{uoid}"
      #get user info from openid
      $http(
        method: 'GET'
        url: "#{API_ENDPOINT}/api/userinfo?user_openid=#{uoid}"
      ).success((data) ->
        $log.debug data
        userInfo = data
      ).error (data) ->
        $log.debug "[wechat service] failed to get userinfo from #{uoid}"
        $log.debug data
        return

    getUserInfo: ->
      $log.debug userInfo
      userInfo

    getSignString: ->
      if signData.signature
        $log.debug "[wechat service] cached sign data"
        return signData
      $http(
        method: 'GET'
        url: "#{API_ENDPOINT}/api/sign"
      ).success((data) ->
        $log.debug "get sign data success"
        signData = data
        return data
      ).error (data) ->
        $log.debug "[wechat service] failed to get sign message"
        $log.debug data
        return
  }
