(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:ShareCtrl
    * @description
    * # ShareCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('ShareCtrl', function($scope, paramService, $log) {
    $scope.house = paramService.get();
    return $log.debug("[ShareCtrol] " + $scope.house);
  });

}).call(this);
