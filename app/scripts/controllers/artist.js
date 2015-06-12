(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:ArtistCtrl
    * @description
    * # ArtistCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('ArtistCtrl', function($scope) {
    return $scope.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  });

}).call(this);
