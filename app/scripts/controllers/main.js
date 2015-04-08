'use strict';

/**
 * @ngdoc function
 * @name iter001App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iter001App
 */
angular.module('iter001App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
