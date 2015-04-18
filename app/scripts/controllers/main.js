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
    $scope.slides = {
      'H001': {
        currentIndex: 0,
        images: [
          {
            image: 'images/xile.jpg',
            description: 'Image 00'
          }, {
            image: 'images/xile02.jpg',
            description: 'Image 01'
          }, {
            image: 'images/xile03.jpg',
            description: 'Image 02'
          }, {
            image: 'images/xile04.jpg',
            description: 'Image 03'
          }
        ]
      },
      'H002': {
        currentIndex: 0,
        images: [
          {
            image: 'images/xrk.jpg',
            description: 'Image 00'
          }, {
            image: 'images/xrk02.jpg',
            description: 'Image 01'
          }, {
            image: 'images/xrk03.jpg',
            description: 'Image 02'
          }, {
            image: 'images/xrk04.jpg',
            description: 'Image 03'
          }
        ]
      },
      'H003': {
        currentIndex: 0,
        images: [
          {
            image: 'images/greentea.jpg',
            description: 'Image 00'
          }, {
            image: 'images/greentea02.jpg',
            description: 'Image 01'
          }, {
            image: 'images/greentea03.jpg',
            description: 'Image 02'
          }, {
            image: 'images/greentea04.jpg',
            description: 'Image 03'
          }
        ]
      }
    };
    $scope.direction = 'left';
    $scope.prevSlide = function(house) {
      console.log("previous slide with house id " + house.id);
      $scope.direction = 'right';
      if ($scope.slides[house.id].currentIndex > 0) {
        --$scope.slides[house.id].currentIndex;
      } else {
        $scope.slides[house.id].currentIndex = 3;
      }
      return console.log($scope.slides[house.id].currentIndex);
    };
    $scope.nextSlide = function(house) {
      console.log("next slide with house id " + house.id);
      $scope.direction = 'left';
      if ($scope.slides[house.id].currentIndex < 3) {
        ++$scope.slides[house.id].currentIndex;
      } else {
        $scope.slides[house.id].currentIndex = 0;
      }
      return console.log($scope.slides[house.id].currentIndex);
    };
    return $scope.isCurrentSlideIndex = function(house, index) {
      return $scope.slides[house.id].currentIndex === index;
    };
  }).animation('.slide-animation', function() {
    return {
      addClass: function(element, className, done) {
        var finishPoint, scope;
        scope = element.scope();
        if (className === 'ng-hide') {
          finishPoint = element.parent().width();
          if (scope.direction !== 'right') {
            finishPoint = -finishPoint;
          }
          TweenMax.to(element, 0.5, {
            left: finishPoint,
            onComplete: done
          });
        } else {
          done();
        }
      },
      removeClass: function(element, className, done) {
        var scope, startPoint;
        scope = element.scope();
        if (className === 'ng-hide') {
          element.removeClass('ng-hide');
          startPoint = element.parent().width();
          if (scope.direction === 'right') {
            startPoint = -startPoint;
          }
          TweenMax.set(element, {
            left: startPoint
          });
          TweenMax.to(element, 0.5, {
            left: 0,
            onComplete: done
          });
        } else {
          done();
        }
      }
    };
  });

}).call(this);
