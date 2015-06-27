(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name iter001App.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the iter001App
   */
  angular.module('iter001App').controller('MainCtrl', function($scope, $location, $log, flash, houseservice, paramService) {
    $scope.$watch('userInfo', function() {
      var promise;
      if ($scope.userInfo) {
        promise = houseservice.getHouseList();
        return promise.then((function(payload) {
          $log.debug(payload);
          return $scope.houses = payload.data;
        }), function(errorPayload) {
          $log.error('failure loading house list', errorPayload);
        });
      }
    });
    return $scope.detail = function(house) {
      paramService.set(house);
      return $location.path('/housedetail');
    };
  });

}).call(this);
