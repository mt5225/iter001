(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.wechat
    * @description
    * # wechat
    * Service in the iter001App.
   */
  angular.module('iter001App').service('wechat', function($log, $http) {
    var UserInfo;
    UserInfo = {};
    return {
      loadUserInfo: function(uoid) {
        $log.debug("[wechat service] User OpenId = " + uoid);
        return $http({
          method: 'GET',
          url: "http://www.mt5225.cc:3000/api/userinfo?user_openid=" + uoid
        }).success(function(data) {
          $log.debug(data);
          return UserInfo = data;
        }).error(function(data) {
          $log.debug("[wechat service] failed to get userinfo from " + uoid);
        });
      },
      getUserInfo: function() {
        return UserInfo;
      },
      getSignString: function() {
        return "yyy";
      }
    };
  });

}).call(this);
