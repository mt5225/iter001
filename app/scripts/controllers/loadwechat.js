(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:LoadwechatCtrl
    * @description
    * # LoadwechatCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('LoadwechatCtrl', function($scope, $location, $log) {
    return $scope.$watch('userInfo', function() {
      $log.debug("userInfo value changed!");
      if ($scope.userInfo != null) {
        $log.debug("userInfo value changed!");
        return $location.path("/frontpage");
      }
    });
  });

}).call(this);
