(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:HousedetailCtrl
    * @description
    * # HousedetailCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('HousedetailCtrl', function($scope, paramService, $routeParams, houseservice, wechat, $location, $log, surveycheck, $interval) {
    var goNext, promiseInterval;
    promiseInterval = {};
    $scope.$watch('userInfo', function() {
      var house, promise;
      $log.debug("userInfo value changed!");
      if ($scope.userInfo) {
        $log.debug("check if house is stored in paramService");
        house = paramService.get();
        $scope.imageArray = {};
        $scope.imageArray['house_pic'] = {
          _Index: 0,
          img: house.house_pic_list
        };
        $scope.imageArray['owner_pic'] = {
          _Index: 0,
          img: house.owner_pic_list
        };
        $scope.imageArray['facility_pic'] = {
          _Index: 0,
          img: house.facility_pic_list
        };
        $log.debug($routeParams.id);
        if (house.id) {
          return $scope.house = house;
        } else if ($routeParams.id == null) {
          return $location.path("/houses");
        } else {
          promise = houseservice.getHouseById($routeParams.id);
          return promise.then((function(payload) {
            $log.debug(payload.data);
            $scope.house = payload.data[0];
            return paramService.set(payload.data[0]);
          }), function(errorPayload) {
            $log.error('failure loading house detail', errorPayload);
          });
        }
      }
    });
    $scope.next = function() {
      return $location.path('/order');
    };
    $scope.close = function() {
      return $location.path("/");
    };
    $scope.getHouse = function() {
      return $scope.house;
    };
    $scope.isActive = function(kind, index) {
      return $scope.imageArray[kind]._Index === index;
    };
    $scope.showPrev = function(kind) {
      $scope.imageArray[kind]._Index = $scope.imageArray[kind]._Index - 1;
      if ($scope.imageArray[kind]._Index < 0) {
        $scope.imageArray[kind]._Index = $scope.imageArray[kind].img.length - 1;
      }
      $log.debug("prev " + $scope.imageArray[kind]._Index);
    };
    $scope.showNext = function(kind) {
      var index;
      $scope.imageArray[kind]._Index = $scope.imageArray[kind]._Index + 1;
      index = "#" + kind + "_" + $scope.imageArray[kind]._Index;
      $log.debug(index);
      Materialize.fadeInImage("" + index);
      if ($scope.imageArray[kind]._Index > ($scope.imageArray[kind].img.length - 1)) {
        $scope.imageArray[kind]._Index = 0;
      }
      return $log.debug("tranistion to " + kind + "_" + $scope.imageArray[kind]._Index);
    };
    goNext = function() {
      var i, item, len, rand, ref, results;
      ref = ['house_pic', 'owner_pic', 'facility_pic'];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (($scope.imageArray[item] != null) && $scope.imageArray[item].img) {
          rand = Math.round(Math.random() * (3000 - 500)) + 500;
          if (rand % 3 === 0) {
            results.push($scope.showNext(item));
          } else {
            results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    $scope.$watch('imageArray', function() {
      if ($scope.imageArray != null) {
        return promiseInterval = $interval(goNext, 2000);
      }
    });
    return $scope.map = function() {
      return $location.path('map');
    };
  });

}).call(this);
