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
      var i, item, len, records, ref, tribe;
      tribe = paramService.get();
      $log.debug(payload);
      records = [];
      ref = payload.data;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (tribe.name != null) {
          if (tribe.name === item.tribe) {
            records.push(item);
          }
        } else {
          records.push(item);
        }
      }
      return $scope.houses = records;
    }), function(errorPayload) {
      $log.error('failure loading house list', errorPayload);
    });
    return $scope.detail = function(house) {
      paramService.set(house);
      return $location.path('/housedetail');
    };
  });

}).call(this);
