(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:FrontpageCtrl
    * @description
    * # FrontpageCtrl
    * Controller of the iter001App
    * @note APP_ID =
   */
  angular.module('iter001App').controller('FrontpageCtrl', function($scope, $location, $window, wechat, $log) {
    $scope.tribes = [
      {
        image: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/lz_opt.jpg'
      }, {
        image: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/lztw_opt.jpg'
      }, {
        image: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/ss_opt.jpg'
      }, {
        image: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/ssxz_opt.jpg'
      }
    ];
    return $scope.ToSurvey = function() {
      var REDIRECT_URI, url, userOpenId;
      if (wechat.getUserInfo().openid) {
        $log.debug("user info " + (wechat.getUserInfo().openid) + " cached");
        $location.path("/survey");
        return;
      }
      userOpenId = $location.search().user_openid;
      if (userOpenId) {
        $log.debug("userOpenId = " + userOpenId);
        wechat.loadUserInfo(userOpenId);
        return $scope.$watch((function() {
          return wechat.getUserInfo().openid;
        }), function(newVal, oldVal) {
          if (typeof newVal !== 'undefined') {
            return $location.path("/survey");
          }
        });
      } else {
        $log.debug("redirect user to wechat oauth2");
        REDIRECT_URI = $window.encodeURIComponent('http://qa.aghchina.com.cn:3000/api/useroauth');
        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe2bdce057501817d&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=snsapi_userinfo&state=aghchina#wechat_redirect";
        return $window.location.href = url;
      }
    };
  });

}).call(this);
