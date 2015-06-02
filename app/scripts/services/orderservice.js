(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.orderService
    * @description
    * # orderService
    * Service in the iter001App.
   */
  angular.module('iter001App').service('orderService', function(wechat, $log, $http, API_ENDPOINT) {
    console.log("[api endpoint] " + API_ENDPOINT);
    return {
      queryOrder: function(openid, callback) {
        $log.debug("query order record for user " + openid);
        return $http({
          method: 'GET',
          url: API_ENDPOINT + "/api/orders/" + openid
        }).success(function(data) {
          $log.debug(data);
          return callback(data);
        }).error(function(data) {
          $log.debug("[order service] failed to get order records from " + openid);
          return $log.debug(data);
        });
      },
      saveOrder: function(order) {
        var userInfo;
        userInfo = wechat.getUserInfo();
        order.wechatOpenID = userInfo['openid'];
        order.wechatNickName = userInfo['nickname'];
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
          $log.info("[order service] order saved to backend success !");
          return $log.debug(data);
        }).error(function(data) {
          $log.error("[order service] failed to save order");
          return $log.debug(data);
        });
      }
    };
  });

}).call(this);
