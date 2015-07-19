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

  $log.debug "api endpoint = #{API_ENDPOINT}"

  return {
    loadUserInfo: (openid)->
      if userInfo.openid?
        $log.debug "[wechat service] cached user info"
        return userInfo
      #get user info from openid
      $http(
        method: 'GET'
        url: "#{API_ENDPOINT}/api/users/#{openid}"
      ).success((data) ->
        $log.debug data
        userInfo = data
      ).error (data) ->
        $log.debug "[wechat service] failed to get userinfo from #{openid}"
        $log.debug data
        return

    getUserInfo: ->
      userInfo

    getSignString: ->
      if signData.signature
        $log.debug "[wechat service] cached sign data"
        return signData
      else  
        $http(
          method: 'GET'
          url: "#{API_ENDPOINT}/api/sign"
        ).success((data) ->
          $log.debug "get sign data success"
          signData = data
          return data
        ).error (data) ->
          $log.debug "[wechat service] failed to get sign message at #{API_ENDPOINT}/api/sign"
          $log.debug data
          return

    sendMessage: (body) ->
      $http(
          method: 'POST'
          url: "#{API_ENDPOINT}/api/sendmsg"
          headers: {'Content-Type': 'application/json'}
          data: JSON.stringify(body)
          dataType: 'json'
        ).success((data) ->
          $log.info "[wechat service] wechat message success"
        ).error (data) ->
          $log.error "[wechat service] failed to send wechat message"
          $log.debug data
  }
