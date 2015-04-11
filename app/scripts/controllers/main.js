(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name iter001App.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the iter001App
   */
  angular.module('iter001App').controller('MainCtrl', function($scope, $location, flash, houseService, paramService) {
    $scope.houses = houseService.getHouseList();
    $scope.toOrderPage = function(house) {
      paramService.set(house);
      return $location.path('/order');
    };
  });

}).call(this);
