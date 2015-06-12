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
    return $scope.toHouseList = function() {
      $log.debug("to /houses");
      return $location.path("/houses");
    };
  });

}).call(this);
