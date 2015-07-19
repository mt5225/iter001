
/*
  * @ngdoc service
  * @name iter001App.wechat
  * @description
   * wechat
  Service in the iter001App.
 */

(function() {
  angular.module('iter001App').service('wechat', function($log, $http, API_ENDPOINT) {
    var signData, userInfo;
    userInfo = {};
    signData = {};
    $log.debug("api endpoint = " + API_ENDPOINT);
    return {
      loadUserInfo: function(openid) {
        if (userInfo.openid != null) {
          $log.debug("[wechat service] cached user info");
          return userInfo;
        }
        return $http({
          method: 'GET',
          url: API_ENDPOINT + "/api/users/" + openid
        }).success(function(data) {
          $log.debug(data);
          return userInfo = data;
        }).error(function(data) {
          $log.debug("[wechat service] failed to get userinfo from " + openid);
          $log.debug(data);
        });
      },
      getUserInfo: function() {
        return userInfo;
      },
      getSignString: function() {
        if (signData.signature) {
          $log.debug("[wechat service] cached sign data");
          return signData;
        } else {
          return $http({
            method: 'GET',
            url: API_ENDPOINT + "/api/sign"
          }).success(function(data) {
            $log.debug("get sign data success");
            signData = data;
            return data;
          }).error(function(data) {
            $log.debug("[wechat service] failed to get sign message at " + API_ENDPOINT + "/api/sign");
            $log.debug(data);
          });
        }
      },
      sendMessage: function(body) {
        return $http({
          method: 'POST',
          url: API_ENDPOINT + "/api/sendmsg",
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(body),
          dataType: 'json'
        }).success(function(data) {
          return $log.info("[wechat service] wechat message success");
        }).error(function(data) {
          $log.error("[wechat service] failed to send wechat message");
          return $log.debug(data);
        });
      }
    };
  });

}).call(this);
