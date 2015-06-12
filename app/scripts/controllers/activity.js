(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:ActivityCtrl
    * @description
    * # ActivityCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('ActivityCtrl', function($scope) {
    return $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  });

}).call(this);
