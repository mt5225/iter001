(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:StudyCtrl
    * @description
    * # StudyCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('StudyCtrl', function($scope) {
    return $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  });

}).call(this);
