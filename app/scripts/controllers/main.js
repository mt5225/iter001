(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name iter001App.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the iter001App
   */
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module('iter001App').controller('MainCtrl', function($scope, $location) {
    $scope.houses = [
      {
        name: '喜乐屋',
        likes: '16',
        price: '1050',
        image: 'images/xile.jpg'
      }, {
        name: '向日葵',
        likes: '22',
        price: '850',
        image: 'images/xrk.jpg'
      }
    ];
    $scope.isActive = function(viewLocation) {
      var ref;
      console.log("in isActive");
      return ref = $location.path(), indexOf.call(viewLocation, ref) >= 0;
    };
  });

}).call(this);
