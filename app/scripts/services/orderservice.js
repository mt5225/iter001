(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.orderService
    * @description
    * # orderService
    * Service in the iter001App.
   */
  angular.module('iter001App').service('orderService', function(wechat, $log, $http, API_ENDPOINT, uuidService, dateService) {
    console.log("[api endpoint] " + API_ENDPOINT);
    return {
      queryOrder: function(openid) {
        $log.debug("query order record for user " + openid);
        return $http({
          method: 'GET',
          url: API_ENDPOINT + "/api/orders/" + openid
        }).success(function(data) {
          return $log.debug(data);
        }).error(function(data) {
          $log.debug("[order service] failed to get order records from " + openid);
          return $log.debug(data);
        });
      },
      saveOrder: function(order) {
        var re, userInfo;
        userInfo = wechat.getUserInfo();
        order.wechatOpenID = userInfo['openid'];
        order.wechatNickName = userInfo['nickname'];
        order.status = "已提交";
        order.createDay = dateService.getTodayTime();
        order.orderId = uuidService.generateUUID();
        re = /\//g;
        order.checkInDay = order.checkInDay.replace(re, '-');
        order.checkOutDay = order.checkOutDay.replace(re, '-');
        $log.debug("[order service] save user " + (JSON.stringify(userInfo)) + " order to backend " + (JSON.stringify(order)));
        return $http({
          method: 'POST',
          url: API_ENDPOINT + "/api/orders",
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(order),
          dataType: 'json'
        }).success(function(data) {
          return $log.info("[order service] order saved to backend success !");
        }).error(function(data) {
          $log.error("[order service] failed to save order");
          return $log.debug(data);
        });
      },
      checkAvailable: function(order) {
        var re;
        $log.debug("check availability for " + order.houseName);
        re = /\//g;
        order.checkInDay = order.checkInDay.replace(re, '-');
        order.checkOutDay = order.checkOutDay.replace(re, '-');
        return $http({
          method: 'POST',
          url: API_ENDPOINT + "/api/orders/availability",
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(order),
          dataType: 'json'
        }).success(function(data) {
          return data;
        }).error(function(data) {
          $log.error("[house service] fail to get availability record from " + API_ENDPOINT);
          return $log.error(data);
        });
      }
    };
  });

}).call(this);
