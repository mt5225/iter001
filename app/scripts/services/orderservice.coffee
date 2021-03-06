'use strict'

###*
 # @ngdoc service
 # @name iter001App.orderService
 # @description
 # # orderService
 # Service in the iter001App.
###
angular.module('iter001App')
  .service 'orderService', (wechat, $log, $http,API_ENDPOINT, uuidService, dateService)->
    console.log "[api endpoint] #{API_ENDPOINT}"
    return {
      #Query orders given wechat open id
      queryOrder: (openid) ->
        $log.debug "query order record for user #{openid}"
        $http(
          method: 'GET'
          url: "#{API_ENDPOINT}/api/orders/#{openid}"
        ).success((data) ->
          $log.debug data
        ).error (data) ->
          $log.debug "[order service] failed to get order records from #{openid}"
          $log.debug data

      queryOrderById: (orderId) ->
        $log.debug "query order record by id #{orderId}"
        $http(
          method: 'GET'
          url: "#{API_ENDPOINT}/api/orders/orderid/#{orderId}"
        ).success((data) ->
          $log.debug data
        ).error (data) ->
          $log.debug "[order service] failed to get order record from #{orderId}"
          $log.debug data

      #Save order to backend database
      saveOrder: (order) ->
        userInfo = wechat.getUserInfo()
        order.wechatOpenID = userInfo['openid']
        order.wechatNickName = userInfo['nickname']
        order.status = "已提交"
        order.createDay = dateService.getTodayTime()
        order.orderId = uuidService.generateUUID()
        re = /\//g
        order.checkInDay = order.checkInDay.replace re, '-'
        order.checkOutDay = order.checkOutDay.replace re, '-'
        $log.debug "[order service] save user #{JSON.stringify(userInfo)} order to backend #{JSON.stringify(order)}"
        $http(
          method: 'POST'
          url: "#{API_ENDPOINT}/api/orders"
          headers: {'Content-Type': 'application/json'}
          data: JSON.stringify(order)
          dataType: 'json'
        ).success((data) ->
          $log.info "[order service] order saved to backend success !"
        ).error (data) ->
          $log.error "[order service] failed to save order"
          $log.debug data

      #Cancel order
      cancelOrder: (order) ->
        $log.debug "cancel order #{order.orderId}"
        $http(
          method: 'POST'
          url: "#{API_ENDPOINT}/api/orders/#{order.orderId}"
          headers: {'Content-Type': 'application/json'}
          data: JSON.stringify({ status: '订单取消'})
          dataType: 'json'
        ).success((data) ->
          $log.info "[order service] order cancel success  !"
        ).error (data) ->
          $log.error "[order service] failed to cancel order"
          $log.debug data

      checkAvailable: (order) ->
        $log.debug "check availability for #{order.houseName}"
        re = /\//g
        order.checkInDay = order.checkInDay.replace re, '-'
        order.checkOutDay = order.checkOutDay.replace re, '-'
        $http(
          method: 'POST'
          url: "#{API_ENDPOINT}/api/orders/availability"
          headers: {'Content-Type': 'application/json'}
          data: JSON.stringify(order)
          dataType: 'json'
        ).success((data) ->
          return data
        ).error (data) ->
          $log.error "[house service] fail to get availability record from #{API_ENDPOINT}"
          $log.error data
    }
