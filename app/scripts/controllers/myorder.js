(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:MyorderCtrl
    * @description get user order list
    * # MyorderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('MyorderCtrl', function($scope, myorderService) {
    return $scope.orders = myorderService.getOrder();
  });

}).call(this);
