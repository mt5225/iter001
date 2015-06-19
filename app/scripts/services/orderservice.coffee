'use strict'

###*
 # @ngdoc service
 # @name iter001App.orderService
 # @description
 # # orderService
 # Service in the iter001App.
###
angular.module('iter001App')
  .service 'orderService', (wechat, $log, $http,API_ENDPOINT)->
    console.log "[api endpoint] #{API_ENDPOINT}"
    return {
      #Query orders given wechat open id
      queryOrder: (openid, callback) ->
        $log.debug "query order record for user #{openid}"
        $http(
          method: 'GET'
          url: "#{API_ENDPOINT}/api/orders/#{openid}"
        ).success((data) ->
          $log.debug data
          callback data
        ).error (data) ->
          $log.debug "[order service] failed to get order records from #{openid}"
          $log.debug data


      #Save order to backend database
      saveOrder: (order) ->
        userInfo = wechat.getUserInfo()
        order.wechatOpenID = userInfo['openid']
        order.wechatNickName = userInfo['nickname']
        order.status = "submitted"
        $log.debug "[order service] save user #{JSON.stringify(userInfo)} order to backend #{JSON.stringify(order)}"
        $http(
          method: 'POST'
          url: "#{API_ENDPOINT}/api/orders"
          headers: {'Content-Type': 'application/json'}
          data: JSON.stringify(order)
          dataType: 'json'
        ).success((data) ->
          $log.info "[order service] order saved to backend success !"
          $log.debug data
        ).error (data) ->
          $log.error "[order service] failed to save order"
          $log.debug data
    }
