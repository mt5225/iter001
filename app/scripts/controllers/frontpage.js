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
  angular.module('iter001App').controller('FrontpageCtrl', function($scope, $location, $window, wechat) {
    var userOpenId;
    $scope.tribes = [
      {
        image: 'images/lz_opt.jpg'
      }, {
        image: 'images/lztw_opt.jpg'
      }, {
        image: 'images/ss_opt.jpg'
      }, {
        image: 'images/ssxz_opt.jpg'
      }
    ];
    userOpenId = $location.search().user_openid;
    wechat.loadUserInfo(userOpenId);
    return $scope.ToSurvey = function() {
      return $location.path("/survey");
    };
  });

}).call(this);
