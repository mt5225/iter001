(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:HousedetailCtrl
    * @description
    * # HousedetailCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('HousedetailCtrl', function($scope, paramService, $routeParams, houseservice, wechat, $location, $log, surveycheck) {
    $scope.$watch('userInfo', function() {
      var house, promise;
      $log.debug("userInfo value changed!");
      if ($scope.userInfo) {
        $log.debug("check if house is stored in paramService");
        house = paramService.get();
        $log.debug(house);
        $log.debug($routeParams.id);
        if (house.id) {
          return $scope.house = house;
        } else if ($routeParams.id === void 0) {
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
      var promise, userInfo;
      userInfo = wechat.getUserInfo();
      promise = surveycheck.check(userInfo.openid);
      return promise.then((function(payload) {
        var i, len, ref, survey;
        $log.debug(payload.data);
        ref = payload.data;
        for (i = 0, len = ref.length; i < len; i++) {
          survey = ref[i];
          $log.debug(survey.type);
          if (survey.type === '入住') {
            $location.path('/order');
            return;
          }
        }
        return $location.path("/survey");
      }), function(errorPayload) {
        return $log.error('failure loading surveycheck detail', errorPayload);
      });
    };
    return $scope.close = function() {
      return $location.path("/houses");
    };
  });

}).call(this);
