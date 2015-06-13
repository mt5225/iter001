(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name iter001App.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the iter001App
   */
  angular.module('iter001App').controller('MainCtrl', function($scope, $location, $log, flash, houseservice, paramService) {
    var promise;
    promise = houseservice.getHouseList();
    promise.then((function(payload) {
      $log.debug(payload);
      return $scope.houses = payload.data;
    }), function(errorPayload) {
      $log.error('failure loading house list', errorPayload);
    });
    $scope.detail = function(house) {
      paramService.set(house);
      return $location.path('/housedetail');
    };

    /*
    for the slide show
    #todo store in bankend database, also need more org on folders and filenames
     */
    $scope.slides = houseservice.getSlideShow();
    $scope.direction = 'left';
    $scope.prevSlide = function(house) {
      $log.debug("previous slide with house id " + house.id);
      $scope.direction = 'right';
      if ($scope.slides[house.id].currentIndex > 0) {
        --$scope.slides[house.id].currentIndex;
      } else {
        $scope.slides[house.id].currentIndex = 3;
      }
      return $log.debug($scope.slides[house.id].currentIndex);
    };
    $scope.nextSlide = function(house) {
      $log.debug("next slide with house id " + house.id);
      $scope.direction = 'left';
      if ($scope.slides[house.id].currentIndex < 3) {
        ++$scope.slides[house.id].currentIndex;
      } else {
        $scope.slides[house.id].currentIndex = 0;
      }
      return $log.debug($scope.slides[house.id].currentIndex);
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
          TweenMax.to(element, 0.2, {
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
          TweenMax.to(element, 0.2, {
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
