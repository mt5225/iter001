(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:wechatOAuth
    * @description
    * fill userInfo by openid and put in scope
   */
  angular.module('iter001App').directive('wechatoauth', function(API_ENDPOINT, APP_ID, wechat, $log, $location, $window, paramService) {
    return {
      template: '',
      restrict: 'AE',
      link: function(scope, element, attrs) {
        var REDIRECT_URI, backurl, openid, promise, url;
        $log.debug("in wechatoauth directive");
        $log.debug("API_ENDPOINT = " + API_ENDPOINT);
        if (wechat.getUserInfo().openid) {
          $log.debug("user info " + (wechat.getUserInfo().openid) + " cached, put into session");
          scope.userInfo = wechat.getUserInfo();
          return;
        }
        openid = $location.search().openid;
        if (openid) {
          $log.debug("load user info by openid " + openid);
          promise = wechat.loadUserInfo(openid);
          return promise.then(function(payload) {
            $log.debug("get user info, put in scope.userInfo");
            $log.debug(payload.data);
            return scope.userInfo = payload.data;
          });
        } else {
          backurl = attrs['wechatoauth'];
          if (backurl === 'housedetail') {
            $log.debug(scope.houseId);
            backurl = backurl + '/' + scope.houseId;
          }
          $log.debug("goback url = " + backurl);
          REDIRECT_URI = $window.encodeURIComponent(API_ENDPOINT + "/api/useroauth");
          url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APP_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=snsapi_userinfo&state=" + backurl + "#wechat_redirect";
          $log.debug("redirect user to auth page with srv api-endpoint as callback");
          return $window.location.href = url;
        }
      }
    };
  });

}).call(this);
