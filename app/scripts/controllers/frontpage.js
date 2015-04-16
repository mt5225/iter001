(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:FrontpageCtrl
    * @description
    * # FrontpageCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('FrontpageCtrl', function($scope, $location) {
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
    return $scope.ToSurvey = function() {
      return $location.path("/survey");
    };
  });

}).call(this);
