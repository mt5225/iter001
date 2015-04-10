(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderCtrl
    * @description
    * # OrderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderCtrl', function($scope, $location, flash) {
    console.log("in order controller " + ($location.path()));
    $scope.flash = flash;
    $scope.houses = [
      {
        id: 'H001',
        name: '喜乐屋',
        likes: '16',
        price: '1050',
        image: 'images/xile.jpg',
        avator: 'images/yuna.jpg'
      }, {
        id: 'H002',
        name: '向日葵',
        likes: '22',
        price: '850',
        image: 'images/xrk.jpg',
        avator: 'images/avator.jpg'
      }
    ];
    $scope.newOrder = {};
    $scope.orderConfirm = function(newOrder) {
      console.log(newOrder);
      flash.setMessage("Order place success!");
      return $location.path('/');
    };
  });

}).call(this);
