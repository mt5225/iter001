
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
      loadUserInfo: function(uoid) {
        if (userInfo.openid) {
          $log.debug("[wechat service] cached user info");
          return userInfo;
        }
        return $http({
          method: 'GET',
          url: API_ENDPOINT + "/api/users/" + uoid
        }).success(function(data) {
          $log.debug(data);
          return userInfo = data;
        }).error(function(data) {
          $log.debug("[wechat service] failed to get userinfo from " + uoid);
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
      }
    };
  });

}).call(this);
