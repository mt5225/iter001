###
 # @ngdoc service
 # @name iter001App.wechat
 # @description
  # wechat
  Service in the iter001App.
###
angular.module('iter001App')
.service 'wechat', ($log, $http)->
  userInfo = {}
  signData = {}
  env = {
    local: "http://localhost:3000"
    www: "http://www.mt5225.cc:3000"
  }
  endPointURL = env.www  #env setting for endpoint
  return {
  loadUserInfo: (uoid)->
    if userInfo.openid
      $log.debug "[wechat service] cached user info"
      return userInfo
    $log.debug "[wechat service] User OpenId = #{uoid}"
    #get user info from openid
    $http(
      method: 'GET'
      url: "#{endPointURL}/api/userinfo?user_openid=#{uoid}"
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
      url: "#{endPointURL}/api/sign"
    ).success((data) ->
      $log.debug "get sign data success"
      signData = data
      return data
    ).error (data) ->
      $log.debug "[wechat service] failed to get sign message"
      $log.debug data
      return

  ###
  Query orders given wechat open id
  ###
  queryOrder: (openid, callback) ->
    $log.debug "query order record for user #{openid}"
    $http(
      method: 'GET'
      url: "#{endPointURL}/orders/#{openid}"
    ).success((data) ->
      $log.debug data
      callback data
    ).error (data) ->
      $log.debug "[wechat service] failed to get order records from #{openid}"
      $log.debug data
      return

  ###
  Save order to backend database
  ###
  saveOrder: (order) ->
    order.wechatOpenID = userInfo['openid']
    order.wechatNickName = userInfo['nickname']
    $log.debug "[wechat service] save user order to backend"
    $log.debug order
    $http(
      method: 'POST'
      url: "#{endPointURL}/orders"
      headers: {'Content-Type': 'application/json'}
      data: JSON.stringify(order)
      dataType: 'json'
    ).success((data) ->
      $log.info "[wechat service] order save to backend"
      $log.debug data
    ).error (data) ->
      $log.error "[wechat service] failed to save order"
      $log.debug data
      return
  }
