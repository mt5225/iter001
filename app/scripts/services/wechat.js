
/*
  * @ngdoc service
  * @name iter001App.wechat
  * @description
   * wechat
  Service in the iter001App.
 */

(function() {
  angular.module('iter001App').service('wechat', function($log, $http) {
    var endPointURL, env, signData, userInfo;
    userInfo = {};
    signData = {};
    env = {
      local: "http://localhost:3000",
      www: "http://www.mt5225.cc:3000"
    };
    endPointURL = env.www;
    return {
      loadUserInfo: function(uoid) {
        if (userInfo.openid) {
          $log.debug("[wechat service] cached user info");
          return userInfo;
        }
        $log.debug("[wechat service] User OpenId = " + uoid);
        return $http({
          method: 'GET',
          url: endPointURL + "/api/userinfo?user_openid=" + uoid
        }).success(function(data) {
          $log.debug(data);
          return userInfo = data;
        }).error(function(data) {
          $log.debug("[wechat service] failed to get userinfo from " + uoid);
          $log.debug(data);
        });
      },
      getUserInfo: function() {
        $log.debug(userInfo);
        return userInfo;
      },
      getSignString: function() {
        if (signData.signature) {
          $log.debug("[wechat service] cached sign data");
          return signData;
        }
        return $http({
          method: 'GET',
          url: endPointURL + "/api/sign"
        }).success(function(data) {
          $log.debug("get sign data success");
          signData = data;
          return data;
        }).error(function(data) {
          $log.debug("[wechat service] failed to get sign message");
          $log.debug(data);
        });
      },

      /*
      Query orders given wechat open id
       */
      queryOrder: function(openid, callback) {
        $log.debug("query order record for user " + openid);
        return $http({
          method: 'GET',
          url: endPointURL + "/orders/" + openid
        }).success(function(data) {
          $log.debug(data);
          return callback(data);
        }).error(function(data) {
          $log.debug("[wechat service] failed to get order records from " + openid);
          $log.debug(data);
        });
      },

      /*
      Save order to backend database
       */
      saveOrder: function(order) {
        order.wechatOpenID = userInfo['openid'];
        order.wechatNickName = userInfo['nickname'];
        $log.debug("[wechat service] save user order to backend");
        $log.debug(order);
        return $http({
          method: 'POST',
          url: endPointURL + "/orders",
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(order),
          dataType: 'json'
        }).success(function(data) {
          $log.info("[wechat service] order save to backend");
          return $log.debug(data);
        }).error(function(data) {
          $log.error("[wechat service] failed to save order");
          $log.debug(data);
        });
      }
    };
  });

}).call(this);
