(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:HousedetailCtrl
    * @description
    * # HousedetailCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('HousedetailCtrl', function($scope, paramService, $routeParams, houseservice, wechat, $location, $log) {
    var promise;
    if (paramService.get().name) {
      $log.debug("fetch house in paramService");
      $scope.house = paramService.get();
    } else if ($routeParams.id) {
      $log.debug("fetch house by id " + $routeParams.id);
      $scope.houseId = $routeParams.id;
      promise = houseservice.getHouseById($routeParams.id);
      promise.then((function(payload) {
        $log.debug(payload.data);
        $scope.house = payload.data[0];
        return paramService.set(payload.data[0]);
      }), function(errorPayload) {
        $log.error('failure loading house detail', errorPayload);
      });
    } else {
      $log.debug("could not locate an specify house, goto house list");
      $location.path("/houses");
    }
    $scope.order = function() {
      $log.debug("goto order page");
      return $location.path("/order");
    };
    return $scope.close = function() {
      return $location.path("/houses");
    };
  });

}).call(this);
