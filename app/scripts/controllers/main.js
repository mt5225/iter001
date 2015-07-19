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
      var i, item, len, param, records, ref;
      param = paramService.get();
      $log.debug(payload);
      records = [];
      ref = payload.data;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (param.tribe != null) {
          if (param.tribe === item.tribe) {
            records.push(item);
          }
        } else if (param.name != null) {
          if (param.name === item.tribe) {
            records.push(item);
          }
        } else {
          $location.path("/");
        }
      }
      $log.debug(records);
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
